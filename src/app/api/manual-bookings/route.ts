import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/manual-bookings`, {
      headers: {
        // Add any necessary authentication headers
      }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch manual bookings' }, { status: 500 });
  }
} 