# Admin Dashboard Features Status

## Current Status

### ✅ Available Features

1. **Theme Toggle (Dark/Light Mode)**
   - Package: `next-themes` (installed)
   - Component: `components/theme-provider.tsx`
   - Configuration: `tailwind.config.ts` has dark mode enabled
   - Usage: Can use `useTheme()` hook from `next-themes`
   - **Status**: Ready to use in admin dashboard

### ❌ Missing Features

1. **Set Status** - Not implemented
2. **Mute Notifications** - Not implemented
3. **Profile** - Not implemented
4. **Settings** - Not implemented
5. **Notification Settings** - Not implemented
6. **Log Out** - Not implemented (no authentication system found)

---

## Implementation Guide

### 1. Theme Toggle (Already Available)

The theme toggle is already set up. You can use it in your Metronic admin dashboard:

```tsx
"use client"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

**Important**: Make sure `ThemeProvider` wraps your admin dashboard layout:

```tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

---

### 2. Authentication & Logout (Needs Implementation)

Currently, there's **no authentication system** in place. You'll need to:

#### Option A: Use Supabase Auth (Recommended)

Since you're already using Supabase, you can use Supabase Auth:

1. **Install Supabase Auth helpers**:
```bash
pnpm add @supabase/auth-helpers-nextjs @supabase/auth-helpers-react
```

2. **Create auth API routes**:
   - `POST /api/auth/login`
   - `POST /api/auth/logout`
   - `GET /api/auth/session`

3. **Create logout component**:
```tsx
"use client"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <Button onClick={handleLogout}>
      Log Out
    </Button>
  )
}
```

#### Option B: Use Metronic's Built-in Auth

If Metronic template has authentication, use that instead.

---

### 3. User Profile (Needs Implementation)

Create a profile page at `app/admin/profile/page.tsx`:

```tsx
"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function ProfilePage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user.user_metadata?.name || "N/A"}</p>
        </div>
      )}
    </div>
  )
}
```

---

### 4. Settings Page (Needs Implementation)

Create settings page at `app/admin/settings/page.tsx`:

```tsx
"use client"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <div>
        <h2>Theme</h2>
        <ThemeToggle />
      </div>
      <div>
        <h2>Language</h2>
        {/* Language toggle if needed */}
      </div>
    </div>
  )
}
```

---

### 5. Notification Settings (Needs Implementation)

If you need notifications, you can:

1. **Use browser notifications**:
```tsx
"use client"
import { useState } from "react"

export function NotificationSettings() {
  const [enabled, setEnabled] = useState(false)

  const requestPermission = async () => {
    const permission = await Notification.requestPermission()
    setEnabled(permission === "granted")
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={requestPermission}
        />
        Enable Notifications
      </label>
    </div>
  )
}
```

2. **Store preferences in database** (create a `user_preferences` table in Supabase)

---

### 6. Set Status (Needs Implementation)

If you need user status (Online, Away, Busy, etc.):

1. **Create status component**:
```tsx
"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function StatusSelector() {
  const [status, setStatus] = useState("online")

  const updateStatus = async (newStatus: string) => {
    setStatus(newStatus)
    // Update in database
    await supabase
      .from("user_status")
      .upsert({ user_id: userId, status: newStatus })
  }

  return (
    <select value={status} onChange={(e) => updateStatus(e.target.value)}>
      <option value="online">Online</option>
      <option value="away">Away</option>
      <option value="busy">Busy</option>
      <option value="offline">Offline</option>
    </select>
  )
}
```

---

## Quick Implementation Checklist

For Metronic Admin Dashboard:

- [ ] **Theme Toggle**: Use existing `ThemeProvider` and `useTheme()` hook
- [ ] **Authentication**: Set up Supabase Auth or use Metronic's auth
- [ ] **Logout**: Create logout function that clears session
- [ ] **Profile**: Create profile page with user info
- [ ] **Settings**: Create settings page with theme/language toggles
- [ ] **Notifications**: Implement notification preferences (optional)
- [ ] **Status**: Implement user status selector (optional)

---

## Metronic Template Integration

Since you're using Metronic template:

1. **Find existing components** in Metronic:
   - Look for user menu/dropdown
   - Look for settings pages
   - Look for profile pages
   - Look for auth components

2. **Adapt them**:
   - Connect to your Supabase auth
   - Use your existing `ThemeProvider`
   - Keep Metronic's UI styling

3. **Add missing features**:
   - If Metronic doesn't have something, create it using Metronic's component library
   - Use Metronic's form components, buttons, modals, etc.

---

## Recommended Approach

1. **Start with Theme Toggle** - It's already ready
2. **Set up Authentication** - Use Supabase Auth (most compatible with your stack)
3. **Add Logout** - Simple function to sign out
4. **Create Profile Page** - Display user info
5. **Create Settings Page** - Theme, language, preferences
6. **Add Status/Notifications** - Only if needed for your use case

All these can use Metronic's existing UI components - just connect them to your backend/state management.
