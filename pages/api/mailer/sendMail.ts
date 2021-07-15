import { sendMail as Mailer, Email } from "../../../lib/mailer";

const sendMail = async (req, res) => {
  try {
    const email: Email = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
    };
    const request = await Mailer(email);

    if (!request.accepted) {
      throw new Error("Failed to send email");
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export default sendMail;
