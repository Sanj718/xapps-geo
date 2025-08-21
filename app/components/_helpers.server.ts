import nodemailer from "nodemailer";

export async function sendExportToEmail(subject: string, data: any) {
    try {
      // Validate required environment variable
      if (!process.env.EMAIL_CONFIG) {
        throw new Error("Email configuration missing: EMAIL_CONFIG must be set in format 'email:password'");
      }

      // Parse email config (format: "email:password")
      const [emailUser, emailPass] = process.env.EMAIL_CONFIG.split(':');
      
      if (!emailUser || !emailPass) {
        throw new Error("Invalid EMAIL_CONFIG format. Expected 'email:password'");
      }

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });
  
      var mailOptions = {
        from: emailUser,
        to: emailUser,
        subject: subject,
        html: `<p><code>${JSON.stringify(data)}</code></p>`,
      };
      let info = await transporter.sendMail(mailOptions);
      // console.log("Message sent: %s", info.messageId);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (e) {
      console.error("Email sending failed:", e);
      throw e; // Re-throw to allow proper error handling upstream
    }
  }