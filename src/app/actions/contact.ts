'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface SendResult {
  success: boolean
  error?: string
}

export async function sendContactEmail(data: ContactFormData): Promise<SendResult> {
  // Basic server-side validation
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return { success: false, error: 'Email service is not configured yet.' }
  }

  try {
    await resend.emails.send({
      // Use Resend's free shared domain for testing.
      // Once you verify prazwalbhusal.com.np in Resend dashboard,
      // change this to: 'contact@prazwalbhusal.com.np'
      from: 'Portfolio Contact <onboarding@resend.dev>',

      // Your inbox — all messages land here
      to: 'prazwal.bhusal357@gmail.com',

      // Reply-To so you can reply directly to the sender
      replyTo: data.email,

      subject: `[Portfolio] ${data.subject || 'New message'} — from ${data.name}`,

      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a">
          <h2 style="margin:0 0 4px;font-size:20px">New message from your portfolio</h2>
          <p style="margin:0 0 24px;color:#666;font-size:13px">prazwalbhusal.com.np/contact</p>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;width:90px">From</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">${data.name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee">
                <a href="mailto:${data.email}" style="color:#6366f1">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px">Subject</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee">${data.subject || '(no subject)'}</td>
            </tr>
          </table>

          <h3 style="margin:0 0 8px;font-size:15px;color:#444">Message</h3>
          <div style="background:#f9f9f9;border:1px solid #eee;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap">${data.message}</div>

          <p style="margin:24px 0 0;font-size:12px;color:#aaa">
            Hit Reply to respond directly to ${data.name} at ${data.email}
          </p>
        </div>
      `,

      // Plain-text fallback
      text: `New portfolio message\n\nFrom: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
    })

    return { success: true }
  } catch (err) {
    console.error('Resend error:', err)
    return { success: false, error: 'Failed to send message. Please try again or email me directly.' }
  }
}
