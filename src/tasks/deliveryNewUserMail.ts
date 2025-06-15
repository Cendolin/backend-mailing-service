import consola from "consola";
import { NewUserArk } from "../arks/users";
import { configEnv } from "../config/config";
import { RoutingKeys } from "../rabbitmq/exchange-queues";
import { s3Client } from "../s3/s3";
import { formatMessageByKeys } from "../utils/formats";
import { Task } from "./base";

export class DeliveryNewUserMail extends Task<typeof NewUserArk.infer> {
    public name: string = RoutingKeys.WelcomeAccount;
    public async handler(data: typeof NewUserArk.infer) {
        const welcomeAccountMessageTemplate = await s3Client.file(`mail-templates/${RoutingKeys.WelcomeAccount}.json`).json();
        if (!welcomeAccountMessageTemplate) {
            throw new Error(`Welcome account message template not found for ${RoutingKeys.WelcomeAccount}`);
        }

        const result = await this.nodemailer.sendMail({
            from: configEnv.SMTP_USERNAME,
            to: data.email,
            subject: formatMessageByKeys(welcomeAccountMessageTemplate.message, {
                name: data.name,
                email: data.email,
            }),
        });

        if (result.accepted.length === 0 || result.rejected.length > 0) {
            consola.error(`Failed to send welcome email to ${data.email}`);
        }
    }

    public ark = NewUserArk;
}