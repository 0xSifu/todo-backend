import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection | undefined;
  private channel: amqp.Channel | undefined;

  async onModuleInit() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('todo_queue');
  }

  async onModuleDestroy() {
    if (this.channel) {
      await this.channel.close().catch(console.error);
    }
    if (this.connection) {
      await this.connection.close().catch(console.error);
    }
  }

  async sendMessage(message: string) {
    this.channel.sendToQueue('todo_queue', Buffer.from(message));
  }
}