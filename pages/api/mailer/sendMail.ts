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
    return res.status(200).json(request.info);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export default sendMail;
