import avvio from "avvio";
import { BrokerApp } from "./apps/broker";
import consola from "consola";
import { S3App } from "./apps/s3";
import { TaskApp } from "./apps/task";

const app = avvio();

app.use(TaskApp);
app.use(S3App);
app.use(BrokerApp);

app.ready((err) => {
    if (err) {
        throw err;
    }

    consola.info('Mailing service is ready');
});
