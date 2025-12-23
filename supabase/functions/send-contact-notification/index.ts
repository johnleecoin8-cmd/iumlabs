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

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, budget, message }: ContactNotificationRequest = await req.json();
    console.log("Processing contact notification for:", name, email);

    // Send notification email to Ium Labs team
    const teamNotification = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ium Labs <onboarding@resend.dev>",
        to: ["info@iumlabs.io"],
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
              ` : ""}
              ${budget ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Budget:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${budget}</td>
              </tr>
              ` : ""}
            </table>
            
            ${message ? `
            <div style="margin-top: 20px;">
              <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
            </div>
            ` : ""}
            
            <hr style="border: 1px solid #e5e7eb; margin-top: 30px;" />
            <p style="color: #6b7280; font-size: 12px;">
              This email was sent from the Ium Labs contact form.
            </p>
          </div>
        `,
      }),
    });

    // Premium confirmation email to the submitter
    const userConfirmation = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ium Labs <onboarding@resend.dev>",
        to: [email],
        subject: "We received your inquiry - Ium Labs",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0b; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
                    
                    <!-- Header with gradient accent -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #0a0a0b 0%, #1a1a2e 100%); border-radius: 24px 24px 0 0; padding: 50px 40px 30px;">
                        <div style="text-align: center;">
                          <div style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #06b6d4); -webkit-background-clip: text; background-clip: text;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: 300; letter-spacing: -0.5px; color: #ffffff;">
                              Ium<span style="font-weight: 600;">Labs</span>
                            </h1>
                          </div>
                          <p style="margin: 8px 0 0; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #3b82f6;">
                            Web3 Marketing Agency
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Main content -->
                    <tr>
                      <td style="background: linear-gradient(180deg, #1a1a2e 0%, #0f0f14 100%); padding: 40px;">
                        
                        <!-- Greeting -->
                        <h2 style="margin: 0 0 24px; font-size: 28px; font-weight: 300; color: #ffffff; line-height: 1.3;">
                          Thank you, <span style="font-weight: 500;">${name}</span>
                        </h2>
                        
                        <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.7; color: #a1a1aa;">
                          We have received your message and our team is already reviewing it. You can expect to hear from us within <span style="color: #ffffff; font-weight: 500;">24 hours</span>.
                        </p>
                        
                        <!-- Submission details card -->
                        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                          <h3 style="margin: 0 0 16px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #71717a;">
                            Your Inquiry Details
                          </h3>
                          
                          <table width="100%" cellpadding="0" cellspacing="0">
                            ${company ? `
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
                                <span style="font-size: 12px; color: #71717a;">Company</span>
                                <p style="margin: 4px 0 0; font-size: 15px; color: #ffffff;">${company}</p>
                              </td>
                            </tr>
                            ` : ""}
                            ${budget ? `
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
                                <span style="font-size: 12px; color: #71717a;">Budget Range</span>
                                <p style="margin: 4px 0 0; font-size: 15px; color: #ffffff;">${budget}</p>
                              </td>
                            </tr>
                            ` : ""}
                            ${message ? `
                            <tr>
                              <td style="padding: 12px 0;">
                                <span style="font-size: 12px; color: #71717a;">Message</span>
                                <p style="margin: 4px 0 0; font-size: 15px; color: #d4d4d8; line-height: 1.6;">${message}</p>
                              </td>
                            </tr>
                            ` : ""}
                          </table>
                        </div>
                        
                        <!-- CTA -->
                        <div style="text-align: center; margin: 40px 0;">
                          <p style="margin: 0 0 20px; font-size: 15px; color: #a1a1aa;">
                            Want to skip the wait? Schedule a meeting directly.
                          </p>
                          <a href="https://calendly.com/iumlabs/30min" 
                             style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-size: 15px; font-weight: 600; letter-spacing: 0.3px; box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);">
                            Book a Meeting
                          </a>
                        </div>
                        
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background: #0a0a0b; border-radius: 0 0 24px 24px; padding: 32px 40px; border-top: 1px solid rgba(255,255,255,0.05);">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <p style="margin: 0 0 8px; font-size: 13px; color: #52525b;">
                                Ium Labs
                              </p>
                              <p style="margin: 0; font-size: 12px; color: #3f3f46; line-height: 1.6;">
                                OFFICE 11B, Gangnam-daero 373<br>
                                Gangnam, Seoul, South Korea
                              </p>
                            </td>
                            <td align="right" valign="top">
                              <a href="mailto:info@iumlabs.com" style="display: inline-block; margin-left: 12px; font-size: 12px; color: #3b82f6; text-decoration: none;">Email</a>
                              <span style="color: #27272a; margin: 0 8px;">|</span>
                              <a href="https://t.me/iumlabs" style="display: inline-block; font-size: 12px; color: #3b82f6; text-decoration: none;">Telegram</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    });

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