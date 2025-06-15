import { configEnv } from "../config/config";
import { handlerManager } from "../managers/handlerManager";
import { initPool } from "../rabbitmq/connection"
import { Exchanges, Queues, RoutingKeys } from "../rabbitmq/exchange-queues";

export const BrokerApp = async () => {
    const rabbitPool = await initPool(configEnv.RABBITMQ_URL);
    const rabbitCh = await rabbitPool.acquire();
    if (!rabbitCh) {
        throw new Error("Failed to acquire RabbitMQ channel from pool");
    }
    
    await rabbitCh.assertExchange(Exchanges.MailEvents, 'topic');
    await rabbitCh.assertQueue(Queues.UserNotificationQueue, {
        autoDelete: true,
        durable: true,
    });
    await rabbitCh.assertQueue(Queues.OtpNotificationQueue, {
        autoDelete: true,
        durable: true,
    });

    // Binding wildcard
    await rabbitCh.bindQueue(Queues.UserNotificationQueue, Exchanges.MailEvents, RoutingKeys.UserWilcard);

    // Notification Queue
    await rabbitCh.consume(Queues.UserNotificationQueue, async msg => {
        if (msg) {
            await handlerManager.load(msg.fields.routingKey, msg.content.toString('utf8')).catch(() => {
                rabbitCh.reject(msg);
            });
        }
    });
}