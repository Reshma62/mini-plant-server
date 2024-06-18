import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: config.node_env === "production", // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.emailSend,
    pass: config.password,
  },
});

const sendEmail = async (to: string, html: string) => {
  const mailOptions = {
    from: `Reshme nila <${config.emailSend}>"`,
    to,
    subject: "Change Password",
    html,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};
export default sendEmail;
