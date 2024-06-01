import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || ''; // Moved token declaration up
    const isPublicPath = path === '/login' || path === '/signup';
 
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }
    

    const response = NextResponse.json({
        message: "Unauthorized",
        success: false,
    });
}

export const config = {
    matcher: [
        '/',
        "/profile",
        '/login',
        '/signup',
    ]
};
