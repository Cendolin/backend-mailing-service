import consola from "consola";
import { VerifyUserArk } from "../arks/users";
import { configEnv } from "../config/config";
import { s3Client } from "../s3/s3";
import { formatMessageByKeys } from "../utils/formats";
import { Task } from "./base";

export class DeliveryVerifyAccountMail extends Task<typeof VerifyUserArk.infer> {
    public name: string = 'user.verify';

    public async handler(data: typeof VerifyUserArk.infer) {
        const verifyAccountMessageTemplate = await s3Client.file(`mail-templates/${this.name}.json`).json();
        if (!verifyAccountMessageTemplate) {
            throw new Error(`Verify account message template not found for ${this.name}`);
        }

        const result = await this.nodemailer.sendMail({
            from: configEnv.SMTP_USERNAME,
            to: data.email,
            subject: verifyAccountMessageTemplate.subject,
            text: formatMessageByKeys(verifyAccountMessageTemplate.message, {
                email: data.email,
                url: data.url,
                token: data.token,
            }),
        });

        if (result.accepted.length === 0 || result.rejected.length > 0) {
            consola.error(`Failed to send verification email to ${data.email}`);
        }
    }

    public ark = VerifyUserArk;
}