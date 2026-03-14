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

    const submissionDate = new Date().toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Australia/Perth'
    });

    // Send email to business
    const businessEmailResponse = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Home Enquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">

                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 40px 35px; border-radius: 16px 16px 0 0;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <p style="margin: 0 0 8px 0; font-size: 12px; letter-spacing: 2px; color: #b8956c; text-transform: uppercase; font-weight: 600;">New Enquiry Received</p>
                            <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #ffffff; letter-spacing: -0.5px;">Home Build Enquiry</h1>
                          </td>
                          <td align="right" valign="top">
                            <div style="background: #b8956c; color: #1a1a1a; padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">New Lead</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Contact Card -->
                  <tr>
                    <td style="background: #ffffff; padding: 0 40px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #faf9f7 0%, #f5f3f0 100%); border-radius: 12px; margin-top: -20px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                        <tr>
                          <td style="padding: 25px 30px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td>
                                  <h2 style="margin: 0 0 4px 0; font-size: 22px; font-weight: 600; color: #1a1a1a;">${name}</h2>
                                  <p style="margin: 0; font-size: 13px; color: #888;">Submitted ${submissionDate}</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-top: 20px;">
                                  <table role="presentation" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td style="padding-right: 10px;">
                                        <a href="mailto:${email}" style="display: inline-block; background: #1a1a1a; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;">
                                          ✉ Email
                                        </a>
                                      </td>
                                      <td>
                                        <a href="tel:${phone}" style="display: inline-block; background: #b8956c; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;">
                                          ✆ Call Now
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Contact Details -->
                  <tr>
                    <td style="background: #ffffff; padding: 30px 40px 10px;">
                      <h3 style="margin: 0 0 20px 0; font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 1.5px;">Contact Information</h3>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="50%" style="padding-bottom: 20px; vertical-align: top;">
                            <p style="margin: 0 0 4px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</p>
                            <p style="margin: 0; font-size: 15px; color: #1a1a1a;"><a href="mailto:${email}" style="color: #1a1a1a; text-decoration: none;">${email}</a></p>
                          </td>
                          <td width="50%" style="padding-bottom: 20px; vertical-align: top;">
                            <p style="margin: 0 0 4px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</p>
                            <p style="margin: 0; font-size: 15px; color: #1a1a1a;"><a href="tel:${phone}" style="color: #1a1a1a; text-decoration: none;">${phone}</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Project Details -->
                  <tr>
                    <td style="background: #ffffff; padding: 10px 40px 30px;">
                      <h3 style="margin: 0 0 20px 0; font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 1.5px;">Project Details</h3>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #faf9f7; border-radius: 12px;">
                        <tr>
                          <td style="padding: 20px 25px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                <td width="33%" style="padding: 10px 0; border-bottom: 1px solid #eee;">
                                  <p style="margin: 0 0 4px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px;">Budget Range</p>
                                  <p style="margin: 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${budget || 'Not specified'}</p>
                                </td>
                                <td width="33%" style="padding: 10px 15px; border-bottom: 1px solid #eee;">
                                  <p style="margin: 0 0 4px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px;">Land Status</p>
                                  <p style="margin: 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${landStatus || 'Not specified'}</p>
                                </td>
                                <td width="33%" style="padding: 10px 0; border-bottom: 1px solid #eee;">
                                  <p style="margin: 0 0 4px 0; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px;">Timeline</p>
                                  <p style="margin: 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${timeline || 'Not specified'}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Message -->
                  ${message ? `
                  <tr>
                    <td style="background: #ffffff; padding: 0 40px 35px;">
                      <h3 style="margin: 0 0 15px 0; font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 1.5px;">Message from Customer</h3>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="background: #1a1a1a; padding: 25px 30px; border-radius: 12px;">
                            <p style="margin: 0; font-size: 15px; color: #ffffff; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  ` : ''}

                  <!-- Footer -->
                  <tr>
                    <td style="background: #faf9f7; padding: 25px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #eee;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <p style="margin: 0; font-size: 12px; color: #999;">Received via website contact form</p>
                          </td>
                          <td align="right">
                            <p style="margin: 0; font-size: 12px; color: #b8956c; font-weight: 600;">Welcome Homes WA</p>
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
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">

                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 50px 40px; border-radius: 16px 16px 0 0; text-align: center;">
                        <p style="margin: 0 0 10px 0; font-size: 12px; letter-spacing: 3px; color: #b8956c; text-transform: uppercase; font-weight: 600;">Welcome Homes WA</p>
                        <h1 style="margin: 0; font-size: 32px; font-weight: 300; color: #ffffff; letter-spacing: -0.5px;">Thank You, ${name}!</h1>
                        <p style="margin: 15px 0 0 0; font-size: 16px; color: rgba(255,255,255,0.7); font-weight: 300;">We've received your enquiry</p>
                      </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                      <td style="background: #ffffff; padding: 40px;">
                        <p style="margin: 0 0 25px 0; font-size: 16px; color: #444; line-height: 1.7;">
                          We're excited to learn more about your dream home project. Our team will review your requirements and reach out to you shortly.
                        </p>

                        <!-- Enquiry Summary -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #faf9f7 0%, #f5f3f0 100%); border-radius: 12px; margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 25px 30px;">
                              <h3 style="margin: 0 0 20px 0; font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 1.5px;">Your Enquiry Summary</h3>
                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                ${budget ? `
                                <tr>
                                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.06);">
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td width="40%" style="font-size: 13px; color: #888;">Budget Range</td>
                                        <td style="font-size: 14px; color: #1a1a1a; font-weight: 500;">${budget}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                ` : ''}
                                ${landStatus ? `
                                <tr>
                                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.06);">
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td width="40%" style="font-size: 13px; color: #888;">Land Status</td>
                                        <td style="font-size: 14px; color: #1a1a1a; font-weight: 500;">${landStatus}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                ` : ''}
                                ${timeline ? `
                                <tr>
                                  <td style="padding: 12px 0;">
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td width="40%" style="font-size: 13px; color: #888;">Timeline</td>
                                        <td style="font-size: 14px; color: #1a1a1a; font-weight: 500;">${timeline}</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                ` : ''}
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- What's Next -->
                        <h3 style="margin: 0 0 20px 0; font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 1.5px;">What Happens Next</h3>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding-bottom: 20px;">
                              <table role="presentation" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="vertical-align: top; padding-right: 15px;">
                                    <div style="width: 36px; height: 36px; background: #1a1a1a; border-radius: 50%; text-align: center; line-height: 36px; color: #fff; font-size: 14px; font-weight: 600;">1</div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0 0 3px 0; font-size: 15px; color: #1a1a1a; font-weight: 600;">We'll Call You</p>
                                    <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">Within 24 hours, one of our team members will reach out to discuss your project.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom: 20px;">
                              <table role="presentation" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="vertical-align: top; padding-right: 15px;">
                                    <div style="width: 36px; height: 36px; background: #b8956c; border-radius: 50%; text-align: center; line-height: 36px; color: #fff; font-size: 14px; font-weight: 600;">2</div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0 0 3px 0; font-size: 15px; color: #1a1a1a; font-weight: 600;">Discovery Meeting</p>
                                    <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">We'll arrange a meeting to understand your vision, lifestyle, and requirements.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table role="presentation" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="vertical-align: top; padding-right: 15px;">
                                    <div style="width: 36px; height: 36px; background: #1a1a1a; border-radius: 50%; text-align: center; line-height: 36px; color: #fff; font-size: 14px; font-weight: 600;">3</div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0 0 3px 0; font-size: 15px; color: #1a1a1a; font-weight: 600;">Initial Concept</p>
                                    <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">We'll provide design concepts and indicative pricing tailored to your needs.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Contact Card -->
                    <tr>
                      <td style="background: #1a1a1a; padding: 35px 40px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td>
                              <p style="margin: 0 0 5px 0; font-size: 11px; color: #b8956c; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Need to reach us sooner?</p>
                              <p style="margin: 0; font-size: 15px; color: rgba(255,255,255,0.8);">Give us a call or send an email</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top: 20px;">
                              <table role="presentation" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="padding-right: 25px;">
                                    <p style="margin: 0 0 3px 0; font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.5px;">Phone</p>
                                    <a href="tel:+61890000000" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500;">+61 8 9000 0000</a>
                                  </td>
                                  <td>
                                    <p style="margin: 0 0 3px 0; font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                                    <a href="mailto:info@welcomehomeswa.com.au" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500;">info@welcomehomeswa.com.au</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background: #faf9f7; padding: 30px 40px; border-radius: 0 0 16px 16px; text-align: center;">
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #1a1a1a; font-weight: 600;">Welcome Homes WA</p>
                        <p style="margin: 0 0 15px 0; font-size: 12px; color: #888;">Perth, Western Australia</p>
                        <p style="margin: 0; font-size: 11px; color: #aaa;">Building homes that welcome you, every time.</p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
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
