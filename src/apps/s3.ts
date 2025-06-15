import { initMailEnv } from "../s3/env";

export const S3App = async () => {
    // Initialize S3 client and check for mail templates
    await initMailEnv();
}