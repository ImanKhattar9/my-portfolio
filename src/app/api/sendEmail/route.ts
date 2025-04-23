import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    await resend.emails.send({
      from: 'Iman <email@imankhattar.com>',
      to: [email],
      subject: 'Thank You for Your Message!',
      html: `<p>Hello ${firstName},</p>
<p>Thank you for reaching out. I’ve received your message and will get back to you as soon as possible.</p>
<p>Best regards,<br/>Iman Khattar</p>`

    });

    await resend.emails.send({
      from: 'Iman <email@imankhattar.com>',
      to: ['email@imankhattar.com'],
      subject: 'New contact form submission',
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Emails sent successfully.' });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
