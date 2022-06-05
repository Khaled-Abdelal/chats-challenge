import ampq, {Connection, Channel} from 'amqplib';

class RabbitMQ {
  private AMPQConnectionString: string;
  public channel: Channel;
  constructor() {
    this.AMPQConnectionString = process.env.RABBIT_MQ_CONNECTION_STRING || 'amqp://guest:guest@localhost:5672/';
  }

  connect = async () => {
    if (this.channel) return this.channel
    const connection: Connection = await ampq.connect(this.AMPQConnectionString);
    const channel: Channel = await connection.createChannel();
    return channel;
  };
}

export default new RabbitMQ();
