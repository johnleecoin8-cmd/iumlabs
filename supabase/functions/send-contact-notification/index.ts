import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFICATION_RECIPIENT = "info@iumlabs.io";

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

const parseResponseBody = async (response: Response) => {
  const raw = await response.text();

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return { raw };
  }
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-notification");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY secret");

      return new Response(
        JSON.stringify({ success: false, error: "Email service is not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const body: ContactNotificationRequest = await req.json();
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const company = (body.company ?? "").trim();
    const budget = (body.budget ?? "").trim();
    const message = (body.message ?? "").trim();

    // Server-side input validation (defense in depth)
    const emailRe = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (
      !name || name.length > 100 ||
      !email || email.length > 255 || !emailRe.test(email) ||
      company.length > 200 ||
      budget.length > 100 ||
      message.length > 5000
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    console.log("Processing contact notification for:", name, email);

    // Send notification email to Ium Labs team
    const teamNotification = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ium Labs <noreply@updates.iumlabs.io>",
        to: [NOTIFICATION_RECIPIENT],
        reply_to: email,
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
        from: "Ium Labs <noreply@updates.iumlabs.io>",
        to: [email],
        subject: "We received your inquiry - Ium Labs",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#0a0a0a;">
              <tr>
                <td align="center" style="padding:56px 20px;">
                  <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;width:100%;background-color:#0d0d0d;border:1px solid rgba(255,255,255,0.06);">

                    <!-- Header: minimal monogram -->
                    <tr>
                      <td style="padding:48px 48px 0;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#71717a;">
                              Ium&nbsp;Labs
                            </td>
                            <td align="right" style="font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#3f3f46;">
                              Seoul · Est. 2021
                            </td>
                          </tr>
                        </table>
                        <div style="height:1px;background:rgba(255,255,255,0.08);margin:24px 0 0;"></div>
                      </td>
                    </tr>

                    <!-- Editorial headline -->
                    <tr>
                      <td style="padding:56px 48px 8px;">
                        <p style="margin:0 0 28px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#52525b;">
                          № 001 &nbsp;·&nbsp; Acknowledgement
                        </p>
                        <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:42px;line-height:1.15;font-weight:400;color:#fafafa;letter-spacing:-0.5px;">
                          Thank you,<br/>
                          <em style="font-style:italic;color:#a1a1aa;">${name}.</em>
                        </h1>
                      </td>
                    </tr>

                    <!-- Body copy -->
                    <tr>
                      <td style="padding:32px 48px 0;">
                        <p style="margin:0;font-size:15px;line-height:1.75;color:#a1a1aa;">
                          Your message has reached our desk. A member of our team is reviewing it now and will be in touch within
                          <span style="color:#fafafa;border-bottom:1px solid rgba(255,255,255,0.25);padding-bottom:1px;">twenty-four hours</span>.
                        </p>
                      </td>
                    </tr>

                    <!-- Inquiry record -->
                    <tr>
                      <td style="padding:48px 48px 8px;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#52525b;padding-bottom:20px;">
                              On Record
                            </td>
                          </tr>
                        </table>
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top:1px solid rgba(255,255,255,0.06);">
                          ${company ? `
                          <tr>
                            <td width="120" style="padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#52525b;vertical-align:top;">
                              Company
                            </td>
                            <td style="padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:15px;color:#fafafa;">
                              ${company}
                            </td>
                          </tr>
                          ` : ""}
                          ${budget ? `
                          <tr>
                            <td width="120" style="padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#52525b;vertical-align:top;">
                              Engagement
                            </td>
                            <td style="padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:15px;color:#fafafa;">
                              ${budget}
                            </td>
                          </tr>
                          ` : ""}
                          ${message ? `
                          <tr>
                            <td width="120" style="padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#52525b;vertical-align:top;">
                              Brief
                            </td>
                            <td style="padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:15px;color:#d4d4d8;line-height:1.7;white-space:pre-wrap;">
                              ${message}
                            </td>
                          </tr>
                          ` : ""}
                        </table>
                      </td>
                    </tr>

                    <!-- CTA: refined link, not gradient button -->
                    <tr>
                      <td style="padding:56px 48px 8px;">
                        <p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:18px;line-height:1.5;color:#d4d4d8;">
                          Or move directly to a conversation.
                        </p>
                        <a href="https://iumlabs.io/contact"
                           style="display:inline-block;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#fafafa;text-decoration:none;border:1px solid rgba(255,255,255,0.4);padding:16px 28px;">
                          Schedule a Meeting&nbsp;&nbsp;→
                        </a>
                      </td>
                    </tr>

                    <!-- Signature -->
                    <tr>
                      <td style="padding:64px 48px 48px;">
                        <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:32px;"></div>
                        <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:16px;color:#fafafa;">
                          The Ium Labs team
                        </p>
                        <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#52525b;">
                          Bridging Web3 to Korea
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background:#0a0a0a;padding:32px 48px;border-top:1px solid rgba(255,255,255,0.06);">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="font-size:11px;color:#52525b;line-height:1.7;">
                              Office 11B, Gangnam-daero 373<br/>
                              Gangnam-gu, Seoul, Republic of Korea
                            </td>
                            <td align="right" style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
                              <a href="mailto:admin@iumlabs.io" style="color:#a1a1aa;text-decoration:none;">Email</a>
                              <span style="color:#27272a;margin:0 10px;">·</span>
                              <a href="https://t.me/hnes2" style="color:#a1a1aa;text-decoration:none;">Telegram</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                  </table>
                  <p style="margin:24px 0 0;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#3f3f46;">
                    © Ium Labs · iumlabs.io
                  </p>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    });

    const [teamRes, userRes] = await Promise.all([teamNotification, userConfirmation]);
    const [teamData, userData] = await Promise.all([
      parseResponseBody(teamRes),
      parseResponseBody(userRes),
    ]);

    console.log("Team notification response:", teamData);
    console.log("User confirmation response:", userData);

    if (!teamRes.ok) {
      console.error("Team notification email failed:", { teamData, userData });

      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to send internal notification email",
          teamEmail: teamData,
          confirmationEmail: userData,
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!userRes.ok) {
      console.error("User confirmation email failed:", userData);
    }

    return new Response(JSON.stringify({
      success: true,
      notificationSent: true,
      confirmationSent: userRes.ok,
    }), {
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