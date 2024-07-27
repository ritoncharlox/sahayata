import { NextResponse } from 'next/server';
import { getAllServices } from '@/utils/getServices';

export async function GET() {
//   const { searchParams } = new URL(request.url);
//   const title = searchParams.get('title');

//   if (!title) {
//     return NextResponse.json({ error: 'Title is required' }, { status: 400 });
//   }

  try {
    const services = await getAllServices();
    if (!services) {
      return NextResponse.json({ error: 'Services not found' }, { status: 404 });
    }
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}