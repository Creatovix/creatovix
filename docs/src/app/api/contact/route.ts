import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, budget, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Send email via Resend
    const data = await resend.emails.send({
      from: "Your Portfolio <hello@creatovix.com>", // Replace with your verified domain later
      to: ["contact@creatovix.com"], // YOUR EMAIL HERE
      subject: `New Inquiry: ${service} - ${name}`,
      html: `
  <div style="margin:0;padding:0;background:#050310;font-family:'DM Mono', monospace;">
    
    <!-- Wrapper -->
    <div style="max-width:600px;margin:40px auto;background:linear-gradient(165deg,#050310,#0a0818);border:1px solid rgba(255,255,255,0.08);border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.6);">
      
      <!-- Header -->
      <div style="padding:30px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
        <p style="margin:0;color:#ff4d00;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
          New Inquiry
        </p>
        <h2 style="margin:10px 0 0;color:#ffffff;font-size:28px;letter-spacing:1px;">
          Let's Build Something Great 🚀
        </h2>
      </div>

      <!-- Content -->
      <div style="padding:28px;">
        
        <!-- Info Grid -->
        <div style="margin-bottom:20px;">
          
          <div style="margin-bottom:14px;">
            <span style="color:rgba(255,255,255,0.4);font-size:10px;letter-spacing:2px;">NAME</span>
            <p style="margin:4px 0 0;color:#ffffff;font-size:14px;">${name}</p>
          </div>

          <div style="margin-bottom:14px;">
            <span style="color:rgba(255,255,255,0.4);font-size:10px;letter-spacing:2px;">EMAIL</span>
            <p style="margin:4px 0 0;">
              <a href="mailto:${email}" style="color:#00c8ff;text-decoration:none;">${email}</a>
            </p>
          </div>

          <div style="margin-bottom:14px;">
            <span style="color:rgba(255,255,255,0.4);font-size:10px;letter-spacing:2px;">SERVICE</span>
            <p style="margin:4px 0 0;color:#ffffff;">${service || "Not specified"}</p>
          </div>

          <div style="margin-bottom:14px;">
            <span style="color:rgba(255,255,255,0.4);font-size:10px;letter-spacing:2px;">BUDGET</span>
            <p style="margin:4px 0 0;color:#ffffff;">${budget || "Not specified"}</p>
          </div>

        </div>

        <!-- Message Box -->
        <div style="margin-top:24px;padding:18px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;">
          <span style="color:#ff4d00;font-size:10px;letter-spacing:2px;">PROJECT DETAILS</span>
          <p style="margin-top:10px;color:#ffffff;font-size:13px;line-height:1.7;">
            ${message.replace(/\n/g, "<br>")}
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="padding:18px 28px;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;">
        
        <span style="color:rgba(255,255,255,0.35);font-size:10px;">
          Creatovix • New Client Inquiry
        </span>

        <span style="color:#10d4a0;font-size:10px;">
          ● Live Lead
        </span>

      </div>

    </div>

  </div>
`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
