import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    await User.findByIdAndUpdate(
      userId,
      {
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 60 * 60 * 1000,
      },
      { new: true, runValidators: true }
    );
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate({
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 60 * 60 * 1000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpire: Date.now() + 60 * 60 * 1000,
      });
    }
    var transporter = nodemailer.createTransport({
      host: "SMTP_HOST",
      port: "SMTP_PORT",
      auth: {
        user: "SMTP_USER",
        pass: "SMTP_PASS",
      },
    });

    const mailOptions = {
      from: "bhomeshrazdan.work@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } </p>`,
    };

    const mailresponse = await transporter.sendMail(mailOptions);

    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
