import nodemailer from 'nodemailer';
import config from "@/config";

const { EMAIL_SMTP, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = config.smtp;

function emailTransporter() {
  const emailPort: any = EMAIL_PORT;

  const transporter = nodemailer.createTransport({
    host: EMAIL_SMTP,
    port: emailPort,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  return transporter;
}

export default emailTransporter;