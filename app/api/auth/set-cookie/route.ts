// app/api/auth/set-cookie/route.ts
import { encryptKey } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

// Utility function to encrypt the passkey


export async function POST(req: NextRequest) {
    try {
        const { passkey } = await req.json();

        if (!passkey) {
            return NextResponse.json(
                { error: 'Passkey is required.' },
                { status: 400 }
            );
        }

        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            // Encrypt the passkey
            const encryptedKey = encryptKey(passkey);

            // Set the encrypted passkey in a cookie
            const response = NextResponse.json(
                { message: 'Passkey validated.' },
                { status: 200 }
            );

            response.cookies.set('accessKey', encryptedKey, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60, // 30 days
            });

            return response;
        } else {
            return NextResponse.json(
                { error: 'Invalid passkey.' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Error in set-cookie route:', error);
        return NextResponse.json(
            { error: 'Something went wrong.' },
            { status: 500 }
        );
    }
}
