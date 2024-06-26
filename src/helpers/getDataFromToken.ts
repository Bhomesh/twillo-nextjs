import {NextRequest} from 'next/server';
import jwt from 'jsonwebtoken';

export async function getDataFromToken(request: NextRequest) {
    const token = request.cookies.get('token')?.value || '';
    try {
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}