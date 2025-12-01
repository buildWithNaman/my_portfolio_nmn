import { Resend } from 'resend';

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "your-email@gmail.com",     // <---- YOUR EMAIL HERE
      subject: "New Portfolio Contact Message",
      html: `
        <h2>New Contact Form Submission:</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `
    });

    console.log("Email sent:", data);

    return res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}