import { addServices } from '@/utils/getServices';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const credentials = await request.json();
    console.log(credentials);

    // return NextResponse.json(credentials, { status: 200 });

    try {
        const service = await addServices(credentials);
        if (!service) {
            return NextResponse.json({ error: 'Error adding service' }, { status: 404 });
        }
        return NextResponse.json(service, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }


}