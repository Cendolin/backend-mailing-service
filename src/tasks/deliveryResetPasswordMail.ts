import consola from "consola";
import { ResetPasswordArk } from "../arks/users";
import { configEnv } from "../config/config";
import { s3Client } from "../s3/s3";
import { formatMessageByKeys } from "../utils/formats";
import { Task } from "./base";

export class DeliveryResetPasswordMail extends Task<typeof ResetPasswordArk.infer> {
    public name: string = 'user.reset_password';

    public async handler(data: typeof ResetPasswordArk.infer) {
        const resetPasswordMessageTemplate = await s3Client.file(`mail-templates/${this.name}.json`).json();
        if (!resetPasswordMessageTemplate) {
            throw new Error(`Reset password message template not found for ${this.name}`);
        }

        const result = await this.nodemailer.sendMail({
            from: configEnv.SMTP_USERNAME,
            to: data.email,
            subject: resetPasswordMessageTemplate.subject,
            text: formatMessageByKeys(resetPasswordMessageTemplate.message, {
                email: data.email,
                url: data.url,
                token: data.token,
            }),
        });

        if (result.accepted.length === 0 || result.rejected.length > 0) {
            consola.error(`Failed to send reset password email to ${data.email}`);
        }
    }

    public ark = ResetPasswordArk;
}