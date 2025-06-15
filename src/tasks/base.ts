import { type, type BaseType } from "arktype";
import { createTransport } from "nodemailer";
import { configEnv } from "../config/config";

export abstract class Task<T> {
    abstract name: string;
    abstract handler(data: T): Promise<void> | void;
    abstract ark: BaseType;

    protected nodemailer = createTransport({
        host: configEnv.SMTP_HOST,
        port: configEnv.SMTP_PORT,
        pool: true,
        secure: configEnv.SMTP_SECURE,
        auth: {
            pass: configEnv.SMTP_PASSWORD,
            user: configEnv.SMTP_USERNAME,
        },
        service: configEnv.SMTP_SERVICE,
    })

    public validate<A>(content: A) {
        const output = this.ark(content);
        if (output instanceof type.errors) {
            throw new Error(output.summary);
        }

        return output;
    }
}
