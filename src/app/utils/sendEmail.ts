 

import nodemailer from "nodemailer";
import { envVars } from "../../config/env";

const transporter = nodemailer.createTransport({
    // port: envVars.EMAIL_SENDER.SMTP_PORT,
    secure: true,
    auth: {
        user: envVars.EMAIL_SENDER.SMTP_USER,
        pass: envVars.EMAIL_SENDER.SMTP_PASS
    },
    port: Number(envVars.EMAIL_SENDER.SMTP_PORT),
    host: envVars.EMAIL_SENDER.SMTP_HOST
})