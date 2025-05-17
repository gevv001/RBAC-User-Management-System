import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export async function sendInviteEmail(to, link) {
    await transport.sendMail({
        from: `UMS <${process.env.EMAIL_USER}>`,
        to,
        subject: `You've been invited to UMS!`,
        html: `
            <p>You’ve been invited to join our app.</p>
            <p>Click the link below to complete your registration:</p>
            <a href="${link}">${link}</a>
            <p>This link will expire in 1 day.</p>
        `
    })
}

export async function sendResetPassEmail(to, link) {
    await transport.sendMail({
        from: `UMS <${process.env.EMAIL_USER}>`,
        to,
        subject: `Password reset link`,
        html: `
            <p>Your reset password link.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${link}">${link}</a>
            <p>If you do not want to change your password, just ignore this email.</p>
            <p>This link will expire in 15 minutes.</p>
        `
    })
}