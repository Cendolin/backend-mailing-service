import { S3Client } from "bun";
import { configEnv } from "../config/config";

export const s3Client = new S3Client({
    bucket: configEnv.S3_BUCKET_NAME,
    accessKeyId: configEnv.S3_ACCESS_KEY,
    secretAccessKey: configEnv.S3_SECRET_ACCESS_KEY,
    endpoint: configEnv.S3_URL,
});
