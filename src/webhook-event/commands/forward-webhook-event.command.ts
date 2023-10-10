export class ForwardWebhookEventCommand {
    constructor(public readonly lineSignature: string, public readonly rawWebhookEvent: string) { }
}