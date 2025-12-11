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

    // Send notification email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
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

    const data = await response.json();
    console.log("Resend API response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email");
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
