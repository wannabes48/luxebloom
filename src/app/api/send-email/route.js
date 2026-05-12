import { Resend } from 'resend';
import OrderReceipt from '@/emails/OrderReceipt';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, customerName, orderId, total, type, message } = await request.json();

    // Check if this is an order confirmation or an inquiry
    if (type === 'order') {
      const { data, error } = await resend.emails.send({
        from: 'BloomStacks Gifts Co. <onboarding@resend.dev>', 
        to: [email],
        subject: `Order Confirmation #LB-${orderId.slice(-6).toUpperCase()} - BloomStacks Gifts Co.`,
        react: OrderReceipt({ customerName, orderId: orderId.slice(-6).toUpperCase(), total }),
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error }, { status: 400 });
      }

      return NextResponse.json(data);
    }

    // Handle Contact Form Inquiries
    if (type === 'inquiry') {
      const { data, error } = await resend.emails.send({
        from: 'BloomStacks Gifts Co. <onboarding@resend.dev>',
        to: ['support@bloomstacksgifts.com'], // This goes to YOUR inbox
        subject: `New Inquiry from ${customerName}`,
        text: `You have a new message from ${customerName || 'Chat User'} (${email}):\n\n${message}`,
      });

      if (error) return NextResponse.json({ error }, { status: 400 });

      return NextResponse.json(data);
    }

    return NextResponse.json({ message: "Invalid type" }, { status: 400 });

  } catch (error) {
    console.error("API Route Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
