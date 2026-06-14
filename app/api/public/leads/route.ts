import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Lead from '@/models/Lead';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.phone || !body.type) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    const lead = await Lead.create(body);

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
