function EmailOptions(optionsObj: any) {
  const { emailFrom, emailTo, emailHtml, subject } = optionsObj;

  return {
    from: emailFrom,
    to: emailTo,
    subject: subject,
    html: emailHtml,
  };
}

export default EmailOptions;