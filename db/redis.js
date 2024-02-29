import { createClient } from 'redis';

const redisClient = createClient({
    password: 'wNSoraWSyZhWs3EfeKzYc4Gd9QLlRXWu',
    socket: {
        host: 'redis-12647.c300.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 12647
    }
});

redisClient.on('connect', () => {
    console.log('Redis DB connected...');
});

redisClient.on('error', (err) => {
    console.error('Redis DB connection error:', err);
});

if(!redisClient.isOpen) {
    redisClient.connect()
}

export default redisClient;
