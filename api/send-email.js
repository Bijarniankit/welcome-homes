import { Resend } from 'resend';

const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const hour = 60 * 60 * 1000;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requests = rateLimitStore.get(ip);
  const recentRequests = requests.filter(time => now - time < hour);
  rateLimitStore.set(ip, recentRequests);

  if (recentRequests.length >= 10) {
    return { limited: true };
  }

  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);

  return { limited: false };
}

export default async function handler(req, res) {
  // Handle CORS for preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
  const rateLimitCheck = checkRateLimit(ip);

  if (rateLimitCheck.limited) {
    return res.status(429).json({
      success: false,
      message: 'Too many enquiries submitted. Please wait an hour before trying again.'
    });
  }

  await handleEmailRequest(req, res);
}

async function handleEmailRequest(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    const { name, email, phone, budget, landStatus, timeline, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      res.status(400).json({ error: 'Please fill in all required fields (name, email, phone)' });
      return;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      res.status(400).json({ error: 'Please provide a valid email address' });
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const responseEmail = process.env.RESPONSE_MAIL || 'noreply@resend.dev';
    const toEmail = process.env.TO_EMAIL;

    if (!toEmail) {
      console.error('TO_EMAIL is not configured');
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    // Send email to business
    const businessEmailResponse = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Home Enquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
            .value { font-size: 16px; color: #1a1a1a; margin-top: 4px; }
            .message-box { background: white; padding: 15px; border-left: 3px solid #1a1a1a; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Home Enquiry</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.8;">Welcome Homes WA</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ${budget ? `
              <div class="field">
                <div class="label">Budget Range</div>
                <div class="value">${budget}</div>
              </div>
              ` : ''}
              ${landStatus ? `
              <div class="field">
                <div class="label">Land Status</div>
                <div class="value">${landStatus}</div>
              </div>
              ` : ''}
              ${timeline ? `
              <div class="field">
                <div class="label">Timeline</div>
                <div class="value">${timeline}</div>
              </div>
              ` : ''}
              ${message ? `
              <div class="message-box">
                <div class="label">Message</div>
                <div class="value" style="margin-top: 8px; white-space: pre-wrap;">${message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              Received via Welcome Homes WA website contact form
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (businessEmailResponse.error) {
      console.error('Error sending email:', businessEmailResponse.error);
      res.status(500).json({ error: 'Failed to send enquiry. Please try again.' });
      return;
    }

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: responseEmail,
        to: email,
        subject: 'Thank You for Your Enquiry - Welcome Homes WA',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1a1a1a; color: white; padding: 30px; text-align: center; }
              .content { padding: 30px; background: #ffffff; }
              .highlight { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; border-top: 1px solid #eee; }
              .steps { margin: 20px 0; }
              .step { display: flex; margin-bottom: 15px; }
              .step-number { background: #1a1a1a; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; margin-right: 12px; flex-shrink: 0; }
              .step-text { color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">Welcome Homes WA</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.8;">Building homes that welcome you</p>
              </div>
              <div class="content">
                <h2 style="color: #1a1a1a; margin-top: 0;">Thank You, ${name}!</h2>
                <p>We've received your enquiry and we're excited to learn more about your dream home project.</p>

                <div class="highlight">
                  <strong>What happens next?</strong>
                  <div class="steps">
                    <div class="step">
                      <span class="step-number">1</span>
                      <span class="step-text">We'll review your requirements and get in touch within 24 hours.</span>
                    </div>
                    <div class="step">
                      <span class="step-number">2</span>
                      <span class="step-text">We'll arrange a meeting to discuss your vision and requirements.</span>
                    </div>
                    <div class="step">
                      <span class="step-number">3</span>
                      <span class="step-text">We'll provide an initial concept and indicative pricing.</span>
                    </div>
                  </div>
                </div>

                <p>If you have any immediate questions, feel free to call us at <strong>+61 8 9000 0000</strong> or reply to this email.</p>

                <p style="margin-bottom: 0;">Looking forward to building your dream home,</p>
                <p style="margin-top: 5px;"><strong>The Welcome Homes WA Team</strong></p>
              </div>
              <div class="footer">
                Welcome Homes WA | Perth, Western Australia<br>
                <a href="mailto:info@welcomehomeswa.com.au" style="color: #666;">info@welcomehomeswa.com.au</a>
              </div>
            </div>
          </body>
          </html>
        `
      });
    } catch (customerEmailError) {
      // Log but don't fail - business email was sent successfully
      console.warn('Could not send customer confirmation:', customerEmailError.message);
    }

    res.status(200).json({
      success: true,
      message: 'Thank you! We\'ve received your enquiry and will be in touch within 24 hours.'
    });
  } catch (error) {
    console.error('Error in send-email handler:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
