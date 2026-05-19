import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/schemas/contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactFormSchema.parse(body);

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM ?? "noreply@sarthak.dev",
        to: "hello@sarthak.dev",
        replyTo: data.email,
        subject: `[Contact] ${data.subject}`,
        text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2>New message from ${data.name}</h2>
            <p><strong>From:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <hr />
            <p>${data.message.replace(/\n/g, "<br />")}</p>
          </div>
        `,
      });
    } else {
      console.log("[Contact Form]", data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
