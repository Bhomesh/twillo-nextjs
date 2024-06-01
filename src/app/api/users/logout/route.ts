import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
try {
    if (request.method !== 'GET') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
    const response = NextResponse.json({
        message: "Logout Successful",
        success: true,
    });
    response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    return response;
}catch (error) {
return NextResponse.json({ error: error.message }, { status: 500 });


}
}

