import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the route is an admin dashboard route
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        const authCookie = request.cookies.get('tf_admin_auth');
        
        if (!authCookie?.value) {
            // Redirect to login if cookie is missing
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        
        // We do a simple check that the cookie exists. 
        // Real cryptographic verification happens in Server Actions or API routes when interacting with the DB.
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/dashboard/:path*'],
};
