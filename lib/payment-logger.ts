import crypto from 'crypto';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export interface PaymentRecord {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  paymentMethod: 'card' | 'bank';
  createdAt: string;
  updatedAt: string;
  successAt?: string;
  failAt?: string;
  paymentGatewayResponse?: Record<string, unknown>;
  customerInfo?: {
    email?: string;
    phone?: string;
    name?: string;
  };
}

// Initialize database table if it doesn't exist
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(255) PRIMARY KEY,
        order_id VARCHAR(255) UNIQUE NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'TRY',
        status VARCHAR(20) NOT NULL,
        payment_method VARCHAR(20) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        success_at TIMESTAMP WITH TIME ZONE,
        fail_at TIMESTAMP WITH TIME ZONE,
        payment_gateway_response JSONB,
        customer_info JSONB,
      )
    `);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Read payments from database
export const readPayments = async (): Promise<PaymentRecord[]> => {
  try {
    await initializeDatabase();
    const result = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
    return result.rows.map(row => ({
      id: row.id,
      orderId: row.order_id,
      amount: parseFloat(row.amount),
      currency: row.currency,
      status: row.status,
      paymentMethod: row.payment_method,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
      successAt: row.success_at?.toISOString(),
      failAt: row.fail_at?.toISOString(),
      paymentGatewayResponse: row.payment_gateway_response,
      customerInfo: row.customer_info,
    }));
  } catch (error) {
    console.error('Error reading payments:', error);
    return [];
  }
};

// Create a new payment record
export const createPaymentRecord = async (data: Partial<PaymentRecord>): Promise<PaymentRecord> => {
  try {
    await initializeDatabase();
    
    const now = new Date();
    const payment: PaymentRecord = {
      id: `PAY-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      orderId: data.orderId || '',
      amount: data.amount || 0,
      currency: data.currency || 'TRY',
      status: data.status || 'pending',
      paymentMethod: data.paymentMethod || 'card',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      ...data
    };

    await pool.query(`
      INSERT INTO payments (
        id, order_id, amount, currency, status, payment_method,
        created_at, updated_at, success_at, fail_at,
        payment_gateway_response, customer_info
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `, [
      payment.id,
      payment.orderId,
      payment.amount,
      payment.currency,
      payment.status,
      payment.paymentMethod,
      now,
      now,
      payment.successAt ? new Date(payment.successAt) : null,
      payment.failAt ? new Date(payment.failAt) : null,
      payment.paymentGatewayResponse ? JSON.stringify(payment.paymentGatewayResponse) : null,
      payment.customerInfo ? JSON.stringify(payment.customerInfo) : null,
    ]);

    return payment;
  } catch (error) {
    console.error('Error creating payment record:', error);
    throw error;
  }
};

// Update payment record
export const updatePaymentRecord = async (id: string, updates: Partial<PaymentRecord>): Promise<PaymentRecord | null> => {
  try {
    await initializeDatabase();
    
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (updates.status) {
      updateFields.push(`status = $${paramCount++}`);
      values.push(updates.status);
    }
    if (updates.successAt) {
      updateFields.push(`success_at = $${paramCount++}`);
      values.push(new Date(updates.successAt));
    }
    if (updates.failAt) {
      updateFields.push(`fail_at = $${paramCount++}`);
      values.push(new Date(updates.failAt));
    }
    if (updates.paymentGatewayResponse) {
      updateFields.push(`payment_gateway_response = $${paramCount++}`);
      values.push(JSON.stringify(updates.paymentGatewayResponse));
    }

    updateFields.push(`updated_at = $${paramCount++}`);
    values.push(new Date());
    
    values.push(id); // WHERE clause parameter

    const result = await pool.query(`
      UPDATE payments 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      orderId: row.order_id,
      amount: parseFloat(row.amount),
      currency: row.currency,
      status: row.status,
      paymentMethod: row.payment_method,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
      successAt: row.success_at?.toISOString(),
      failAt: row.fail_at?.toISOString(),
      paymentGatewayResponse: row.payment_gateway_response,
      customerInfo: row.customer_info,
    };
  } catch (error) {
    console.error('Error updating payment record:', error);
    return null;
  }
};

// Find payment by order ID
export const findPaymentByOrderId = async (orderId: string): Promise<PaymentRecord | null> => {
  try {
    await initializeDatabase();
    const result = await pool.query('SELECT * FROM payments WHERE order_id = $1', [orderId]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      orderId: row.order_id,
      amount: parseFloat(row.amount),
      currency: row.currency,
      status: row.status,
      paymentMethod: row.payment_method,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
      successAt: row.success_at?.toISOString(),
      failAt: row.fail_at?.toISOString(),
      paymentGatewayResponse: row.payment_gateway_response,
      customerInfo: row.customer_info,
    };
  } catch (error) {
    console.error('Error finding payment by order ID:', error);
    return null;
  }
};

// Get payments with pagination and filtering
export const getPayments = async (options: {
  page?: number;
  limit?: number;
  status?: PaymentRecord['status'];
  paymentMethod?: PaymentRecord['paymentMethod'];
  startDate?: string;
  endDate?: string;
} = {}): Promise<{ payments: PaymentRecord[]; total: number; page: number; totalPages: number }> => {
  try {
    await initializeDatabase();
    
    const page = options.page || 1;
    const limit = options.limit || 20;
    const offset = (page - 1) * limit;

    // Build WHERE clause
    const whereConditions = [];
    const queryParams = [];
    let paramCount = 1;

    if (options.status) {
      whereConditions.push(`status = $${paramCount++}`);
      queryParams.push(options.status);
    }
    
    if (options.paymentMethod) {
      whereConditions.push(`payment_method = $${paramCount++}`);
      queryParams.push(options.paymentMethod);
    }
    
    if (options.startDate) {
      whereConditions.push(`created_at >= $${paramCount++}`);
      queryParams.push(new Date(options.startDate));
    }
    
    if (options.endDate) {
      whereConditions.push(`created_at <= $${paramCount++}`);
      queryParams.push(new Date(options.endDate));
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countResult = await pool.query(`SELECT COUNT(*) FROM payments ${whereClause}`, queryParams);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated results
    const result = await pool.query(`
      SELECT * FROM payments 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...queryParams, limit, offset]);

    const payments = result.rows.map(row => ({
      id: row.id,
      orderId: row.order_id,
      amount: parseFloat(row.amount),
      currency: row.currency,
      status: row.status,
      paymentMethod: row.payment_method,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
      successAt: row.success_at?.toISOString(),
      failAt: row.fail_at?.toISOString(),
      paymentGatewayResponse: row.payment_gateway_response,
      customerInfo: row.customer_info,
    }));

    return {
      payments,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('Error getting payments:', error);
    return {
      payments: [],
      total: 0,
      page: 1,
      totalPages: 0
    };
  }
};

// Get payment statistics
export const getPaymentStats = async (): Promise<{
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  totalAmount: number;
  successfulAmount: number;
  averageAmount: number;
}> => {
  try {
    await initializeDatabase();
    
    // Get basic counts
    const [totalResult, successResult, failedResult, pendingResult] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM payments'),
      pool.query("SELECT COUNT(*) FROM payments WHERE status = 'success'"),
      pool.query("SELECT COUNT(*) FROM payments WHERE status = 'failed'"),
      pool.query("SELECT COUNT(*) FROM payments WHERE status = 'pending'")
    ]);

    // Get amounts
    const [totalAmountResult, successAmountResult] = await Promise.all([
      pool.query('SELECT COALESCE(SUM(amount), 0) as total FROM payments'),
      pool.query("SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = 'success'")
    ]);

    const totalPayments = parseInt(totalResult.rows[0].count);
    const successfulPayments = parseInt(successResult.rows[0].count);
    const failedPayments = parseInt(failedResult.rows[0].count);
    const pendingPayments = parseInt(pendingResult.rows[0].count);
    
    const totalAmount = parseFloat(totalAmountResult.rows[0].total);
    const successfulAmount = parseFloat(successAmountResult.rows[0].total);
    const averageAmount = totalPayments > 0 ? totalAmount / totalPayments : 0;

    return {
      totalPayments,
      successfulPayments,
      failedPayments,
      pendingPayments,
      totalAmount,
      successfulAmount,
      averageAmount
    };
  } catch (error) {
    console.error('Error getting payment stats:', error);
    return {
      totalPayments: 0,
      successfulPayments: 0,
      failedPayments: 0,
      pendingPayments: 0,
      totalAmount: 0,
      successfulAmount: 0,
      averageAmount: 0
    };
  }
}

/**
 * Cancel pending payments older than specified minutes
 * @param olderThanMinutes - Cancel payments older than this many minutes
 * @returns Promise<number> - Number of payments cancelled
 */
export async function cancelPendingPayments(olderThanMinutes: number = 5): Promise<number> {
  try {
    const cutoffTime = new Date(Date.now() - olderThanMinutes * 60 * 1000);

    const result = await pool.query(
      `UPDATE payments
       SET status = 'cancelled',
           updated_at = NOW(),
           fail_at = NOW()
       WHERE status = 'pending'
         AND created_at < $1::timestamptz`,
      [cutoffTime]
    );

    const cancelledCount = result.rowCount || 0;

    console.log(
      `Cancelled ${cancelledCount} pending payments older than ${olderThanMinutes} minutes (cutoff: ${cutoffTime.toISOString()})`
    );

    return cancelledCount;
  } catch (error) {
    console.error("Error cancelling pending payments:", error);
    throw error;
  }
}
