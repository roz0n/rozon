import { sendMail as Mailer, Email } from "../../../lib/mailer";

const sendMail = async (req, res) => {
  try {
    // TODO: Try catch and errors
    const email: Email = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
    };
    const request = await Mailer(email);
    return res.status(200).json(request.info);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ success: false });
  }
};

export default sendMail;
