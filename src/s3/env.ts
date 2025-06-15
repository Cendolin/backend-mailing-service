import consola from "consola";
import { RoutingKeys } from "../rabbitmq/exchange-queues"
import { s3Client } from "./s3"

export const initMailEnv = async () => {
    const keys = [
        RoutingKeys.WelcomeAccount,
        RoutingKeys.VerifyAccount,
        RoutingKeys.ResetPasswordAccount,
        RoutingKeys.Otp,
    ];

    consola.info('Checking mail templates in S3...');
    for (const key of keys) {
        const isTemplateExists = await s3Client.exists(`mail-templates/${key}.json`);
        if (!isTemplateExists) {
            consola.error(`Mail template ${key} does not exist in S3 bucket.`);
            await s3Client.write(`mail-templates/${key}.json`, JSON.stringify({ message: '' }));
            consola.info(`Created default mail template for ${key} in S3 bucket.`);
            continue;
        }

        consola.success(`Mail template ${key} exists in S3 bucket.`);
    }
}