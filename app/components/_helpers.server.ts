import nodemailer from "nodemailer";
export async function sendExportToEmail(subject: string, data: any) {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "ssobirjonov@gmail.com", // generated ethereal user
          pass: "txsl adkt aqov gdjg", // generated ethereal password
        },
      });
  
      var mailOptions = {
        from: "ssobirjonov@gmail.com",
        to: "ssobirjonov@gmail.com",
        subject: subject,
        html: `<p><code>${JSON.stringify(data)}</code></p>`,
      };
      let info = await transporter.sendMail(mailOptions);
      // console.log("Message sent: %s", info.messageId);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (e) {
      console.log(e);
    }
  }