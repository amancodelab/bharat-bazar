const generateOtp = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

const getOtpHtml = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <table width="420" cellpadding="0" cellspacing="0"
            style="background:#ffffff;border-radius:16px;padding:40px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            
            <tr>
              <td align="center">
                <h1 style="margin:0;color:#111827;font-size:28px;">
                  Verify Your Email
                </h1>

                <p style="margin:16px 0 30px;color:#6b7280;font-size:15px;line-height:24px;">
                  Use the OTP below to complete your verification process.
                </p>

                <div style="
                  background:#2563eb;
                  color:#ffffff;
                  display:inline-block;
                  padding:16px 32px;
                  border-radius:12px;
                  font-size:32px;
                  font-weight:bold;
                  letter-spacing:8px;
                ">
                  ${otp}
                </div>

                <p style="margin:30px 0 10px;color:#6b7280;font-size:14px;line-height:22px;">
                  This OTP is valid for 10 minutes.
                </p>

                <p style="margin:0;color:#9ca3af;font-size:13px;">
                  If you did not request this, please ignore this email.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

module.exports = { generateOtp, getOtpHtml };
