import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-notification");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, budget, message }: ContactNotificationRequest = await req.json();
    console.log("Processing contact notification for:", name, email);

    // Send notification email to CryptoBridge team
    const teamNotification = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CryptoBridge <onboarding@resend.dev>",
        to: ["info@cryptobridgekorea.com"],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
            <hr style="border: 1px solid #e5e7eb;" />
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Company:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${company}</td>
              </tr>
              ` : ''}
              ${budget ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Budget:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${budget}</td>
              </tr>
              ` : ''}
            </table>
            
            ${message ? `
            <div style="margin-top: 20px;">
              <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
            </div>
            ` : ''}
            
            <hr style="border: 1px solid #e5e7eb; margin-top: 30px;" />
            <p style="color: #6b7280; font-size: 12px;">
              This email was sent from the CryptoBridge Korea contact form.
            </p>
          </div>
        `,
      }),
    });

    // Send confirmation email to the submitter
    const userConfirmation = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CryptoBridge Korea <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting CryptoBridge Korea",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a1a1a; font-size: 28px; margin: 0;">CryptoBridge Korea</h1>
              <p style="color: #3b82f6; margin: 5px 0;">Your Web 3.0 Marketing Agency</p>
            </div>
            
            <hr style="border: 1px solid #e5e7eb;" />
            
            <div style="margin: 30px 0;">
              <h2 style="color: #1a1a1a; font-size: 22px;">Hi ${name},</h2>
              <p style="color: #4b5563; line-height: 1.6;">
                Thank you for reaching out to CryptoBridge Korea! We've received your message and our team will review it shortly.
              </p>
              <p style="color: #4b5563; line-height: 1.6;">
                We typically respond within <strong>24 hours</strong>. In the meantime, feel free to explore our services or connect with us on Telegram.
              </p>
            </div>
            
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 30px 0;">
              <h3 style="color: #374151; margin-top: 0;">Your submission details:</h3>
              ${company ? `<p style="color: #6b7280; margin: 5px 0;"><strong>Company:</strong> ${company}</p>` : ''}
              ${budget ? `<p style="color: #6b7280; margin: 5px 0;"><strong>Budget:</strong> ${budget}</p>` : ''}
              ${message ? `<p style="color: #6b7280; margin: 5px 0;"><strong>Message:</strong> ${message}</p>` : ''}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://calendly.com/cryptobridgekorea/30min" 
                 style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: bold;">
                Book a Meeting Now
              </a>
            </div>
            
            <hr style="border: 1px solid #e5e7eb;" />
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #9ca3af; font-size: 14px; margin: 5px 0;">
                CryptoBridge Korea<br>
                OFFICE 11B, Gangnam-daero 373, Gangnam, Seoul, South Korea
              </p>
              <p style="color: #9ca3af; font-size: 12px;">
                <a href="mailto:info@cryptobridgekorea.com" style="color: #3b82f6;">info@cryptobridgekorea.com</a> | 
                <a href="https://t.me/cryptobridgekorea" style="color: #3b82f6;">Telegram</a>
              </p>
            </div>
          </div>
        `,
      }),
    });

    // Wait for both emails to be sent
    const [teamRes, userRes] = await Promise.all([teamNotification, userConfirmation]);
    
    const teamData = await teamRes.json();
    const userData = await userRes.json();
    
    console.log("Team notification response:", teamData);
    console.log("User confirmation response:", userData);

    if (!teamRes.ok || !userRes.ok) {
      console.error("Email sending failed:", { teamData, userData });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
