import nodemailer from 'nodemailer';
import { AssetEmailTemplate } from './templates/AssetEmailTemplate';

import config from "@/config";

import emailTransporter from './conig/EmailTransporter';

const { EMAIL_SMTP, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER, EMAIL_PASSWORD } = config.smtp;

function AssetsEmail() {

  function emailOptions(optionsObj: any) {
    const { emailFrom, emailTo, emailHtml, subject } = optionsObj;

    return {
      // from: 'you@example.com',
      // from: EMAIL_USER,
      // to: 'malvitima@hotmail.com',
      from: emailFrom,
      to: emailTo,
      subject: subject,
      html: emailHtml,
    };
  }

  async function send(emailObjectOptions: any, emailTemplateVariables: any) {

    const transporter = emailTransporter();

    const emailHtml = await AssetEmailTemplate(emailTemplateVariables);

    const { emailTo, subject = 'My Invest - alerta de ativo' } = emailObjectOptions;

    const emailOptionsObj = {
      emailFrom: EMAIL_USER,
      emailHtml: emailHtml,
      emailTo,
      subject
    };

    const emailSendOptions: any = emailOptions(emailOptionsObj);

    try {
      // console.log(emailhtml: ,emailHtml);

      // const emailSend = await transporter.sendMail(emailSendOptions);

      // console.log('Email send: ', emailSend);

      return true;

    } catch (error) {
      // console.error('smtp: ', config.smtp);
      console.error('email error: ', error);

      return false;
    }

  }

  return { send }

}

export default { AssetsEmail }