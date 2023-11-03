export class ReceivedWebhookEvent {
  constructor(
    public readonly destination: string,
    public readonly lineSignature: string,
    public readonly rawWebhookEvent: string,
  ) {}
}
