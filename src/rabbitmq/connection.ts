import amqplib from 'amqplib';
import genericPool from 'generic-pool';

let connection: amqplib.ChannelModel;
export let rabbitPool: genericPool.Pool<amqplib.ConfirmChannel>;

const getConnection = async (rabbitMqUrl: string) => {
    if (!connection) {
        connection = await amqplib.connect(rabbitMqUrl);
    }

    return connection;
}

export const initPool = async (rabbitMqUrl: string) => {
    const factory: genericPool.Factory<amqplib.ConfirmChannel> = {
        async create() {
            const conn = await getConnection(rabbitMqUrl);
            return conn.createConfirmChannel();
        },
        async destroy(c) {
            return c.close();
        },
    }

    if (!rabbitPool) {
        rabbitPool = genericPool.createPool(factory, {
            min: 2,
            max: 5,
        });
    }

    return rabbitPool;
}