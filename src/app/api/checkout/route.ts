import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define TypeScript interface for cart items
interface CartItem {
  title: string;
  quantity: number;
  price: number;
}

// Define request body type
interface CheckoutData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  orderNotes?: string;
  cart: CartItem[];
  totalPrice: number;
}

export async function POST(req: Request) {
  try {
    // Parse request body
    const body: CheckoutData = await req.json();
    const { name, email, phone, company, address, city, state, zip, country, orderNotes, cart, totalPrice } = body;

    // Log the received body
    console.log('Received Checkout Data:', body);

    // Validate required fields
    if (!name || !email || !phone || !address || !city || !state || !zip || !country || !cart.length) {
      console.error('Missing required fields:', { name, email, phone, address, city, state, zip, country, cart });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      console.error('Email configuration missing in environment variables');
      return NextResponse.json({ error: 'Email configuration missing in environment variables' }, { status: 500 });
    }

    // Setup email transporter
    console.log('Setting up email transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format order details
    const orderDetails = cart
      .map((item) => `• ${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    // Log the formatted order details
    console.log('Formatted Order Details:', orderDetails);

    // Email message options
    const mailOptions = {
      from: `"Comforty Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER, // Your email
      subject: '🛒 New Order Received!',
      text: `
        📌 New Order Details:

        🏷 Name: ${name}
        ${company ? `🏢 Company: ${company}` : ''}
        ✉️ Email: ${email}
        📞 Phone: ${phone}
        🏠 Address: ${address}, ${city}, ${state}, ${zip}, ${country}

        --- 📦 Ordered Items ---
        ${orderDetails}

        💰 Total Price: $${totalPrice.toFixed(2)}

        ${orderNotes ? `📝 Order Notes: ${orderNotes}` : ''}

        ✅ Please process the order as soon as possible.
      `,
    };

    // Log the mail options before sending
    console.log('Sending email with options:', mailOptions);

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
    return NextResponse.json({ message: '✅ Order placed successfully!' }, { status: 200 });
  } catch (error) {
    console.error('🚨 Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
