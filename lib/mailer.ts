import nodemailer from "nodemailer";

const {
  MAILER_USER,
  MAILER_PASSWORD,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_ACCESS_TOKEN,
  GOOGLE_REFRESH_TOKEN,
} = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: MAILER_USER,
    pass: MAILER_PASSWORD,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    refreshToken: GOOGLE_REFRESH_TOKEN,
    accessToken: GOOGLE_ACCESS_TOKEN,
  },
});

export type Email = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

const sendMail = async (email: Email) => {
  return transporter.sendMail(email);
};

export { sendMail };
