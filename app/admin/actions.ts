'use server';

import { cookies } from 'next/headers';
import { createHmac } from 'crypto';

const AUTH_COOKIE_NAME = 'tf_admin_auth';

export async function loginAdmin(password: string) {
    const secret = process.env.ADMIN_SECRET;
    
    if (!secret) {
        return { success: false, error: "Server configuration error. Admin secret not set." };
    }

    if (password !== secret) {
        return { success: false, error: "Invalid admin password." };
    }

    const authHash = createHmac('sha256', secret).update('admin_authenticated').digest('hex');
    
    // Set cookie that expires in 24 hours
    (await cookies()).set({
        name: AUTH_COOKIE_NAME,
        value: authHash,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        sameSite: 'lax',
    });

    return { success: true };
}

export async function logoutAdmin() {
    (await cookies()).delete(AUTH_COOKIE_NAME);
    return { success: true };
}

export async function verifyAdmin() {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get(AUTH_COOKIE_NAME);
    
    if (!adminCookie?.value) return false;
    
    const secret = process.env.ADMIN_SECRET;
    if (!secret) return false;
    
    const expectedHash = createHmac('sha256', secret).update('admin_authenticated').digest('hex');
    return adminCookie.value === expectedHash;
}
