import { bool, cleanEnv, host, port, str, url } from "envalid";

export const configEnv = cleanEnv(process.env, {
    SMTP_HOST: host(),
    SMTP_PORT: port({
        default: 4545,
    }),
    SMTP_SECURE: bool(),
    SMTP_USERNAME: str(),
    SMTP_PASSWORD: str(),
    SMTP_SENDER: str(),
    SMTP_SERVICE: str({
        default: undefined, // Optional, can be undefined if not using a service
        desc: "Email service provider, if using a custom SMTP server, set to 'custom'.",
    }),

    S3_URL: url(),
    S3_ACCESS_KEY: str(),
    S3_SECRET_ACCESS_KEY: str(),
    S3_BUCKET_NAME: str(),

    RABBITMQ_URL: url(),
});
