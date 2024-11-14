import nodemailer from 'nodemailer';

export const sendConfirmationEmail = async (email, confirmationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const confirmationUrl = `${process.env.NEXTAUTH_URL}/auth/confirm?token=${confirmationToken}`;

  await transporter.sendMail({
    from: `"SoulsIdle" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Confirmation de votre compte',
    html: `<p>Merci de vous être inscrit sur SoulsIdle !</p>
           <p>Veuillez cliquer sur le lien ci-dessous pour confirmer votre inscription :</p>
           <a href="${confirmationUrl}">Confirmer mon compte</a>`,
  });
};