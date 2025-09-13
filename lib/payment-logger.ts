import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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
  paymentGatewayResponse?: any;
  customerInfo?: {
    email?: string;
    phone?: string;
    name?: string;
  };
  metadata?: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
  };
}

const DATA_FILE = path.join(process.cwd(), 'data', 'payments.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read payments from file
export const readPayments = (): PaymentRecord[] => {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading payments:', error);
    return [];
  }
};

// Write payments to file
export const writePayments = (payments: PaymentRecord[]): void => {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(payments, null, 2));
  } catch (error) {
    console.error('Error writing payments:', error);
  }
};

// Create a new payment record
export const createPaymentRecord = (data: Partial<PaymentRecord>): PaymentRecord => {
  const now = new Date().toISOString();
  const payment: PaymentRecord = {
    id: `PAY-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    orderId: data.orderId || '',
    amount: data.amount || 0,
    currency: data.currency || 'TRY',
    status: data.status || 'pending',
    paymentMethod: data.paymentMethod || 'card',
    createdAt: now,
    updatedAt: now,
    ...data
  };

  const payments = readPayments();
  payments.push(payment);
  writePayments(payments);
  
  return payment;
};

// Update payment record
export const updatePaymentRecord = (id: string, updates: Partial<PaymentRecord>): PaymentRecord | null => {
  const payments = readPayments();
  const index = payments.findIndex(p => p.id === id);
  
  if (index === -1) {
    return null;
  }

  const updatedPayment = {
    ...payments[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  payments[index] = updatedPayment;
  writePayments(payments);
  
  return updatedPayment;
};

// Find payment by order ID
export const findPaymentByOrderId = (orderId: string): PaymentRecord | null => {
  const payments = readPayments();
  return payments.find(p => p.orderId === orderId) || null;
};

// Get payments with pagination and filtering
export const getPayments = (options: {
  page?: number;
  limit?: number;
  status?: PaymentRecord['status'];
  paymentMethod?: PaymentRecord['paymentMethod'];
  startDate?: string;
  endDate?: string;
} = {}): { payments: PaymentRecord[]; total: number; page: number; totalPages: number } => {
  let payments = readPayments();

  // Apply filters
  if (options.status) {
    payments = payments.filter(p => p.status === options.status);
  }
  
  if (options.paymentMethod) {
    payments = payments.filter(p => p.paymentMethod === options.paymentMethod);
  }
  
  if (options.startDate) {
    payments = payments.filter(p => p.createdAt >= options.startDate);
  }
  
  if (options.endDate) {
    payments = payments.filter(p => p.createdAt <= options.endDate);
  }

  // Sort by creation date (newest first)
  payments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Apply pagination
  const page = options.page || 1;
  const limit = options.limit || 20;
  const total = payments.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedPayments = payments.slice(startIndex, endIndex);

  return {
    payments: paginatedPayments,
    total,
    page,
    totalPages
  };
};

// Get payment statistics
export const getPaymentStats = (): {
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  totalAmount: number;
  successfulAmount: number;
  averageAmount: number;
} => {
  const payments = readPayments();
  
  const totalPayments = payments.length;
  const successfulPayments = payments.filter(p => p.status === 'success').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const successfulAmount = payments
    .filter(p => p.status === 'success')
    .reduce((sum, p) => sum + p.amount, 0);
  
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
};
