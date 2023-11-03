export class ReceiveWebhookEventCommand {
  constructor(
    public readonly createWebhookEventDto,
    public readonly xLineSignature: string,
    public readonly rawWebhookEvent: string,
  ) {}
}
