-- AlterTable
ALTER TABLE "WebhookEvent" ADD COLUMN "lineWebhookCreatedAt" DATETIME;
ALTER TABLE "WebhookEvent" ADD COLUMN "lineWebhookXLineSignature" TEXT;

-- CreateTable
CREATE TABLE "lineWebhookDelivery" (
    "isRedelivery" BOOLEAN DEFAULT false,
    "webhookEventId" TEXT NOT NULL,
    "lineWebhookXLineSignature" TEXT NOT NULL,
    "lineWebhookCreatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("webhookEventId", "lineWebhookXLineSignature", "lineWebhookCreatedAt"),
    CONSTRAINT "lineWebhookDelivery_webhookEventId_fkey" FOREIGN KEY ("webhookEventId") REFERENCES "WebhookEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "lineWebhookDelivery_lineWebhookXLineSignature_lineWebhookCreatedAt_fkey" FOREIGN KEY ("lineWebhookXLineSignature", "lineWebhookCreatedAt") REFERENCES "LineWebhook" ("xLineSignature", "createdAt") ON DELETE RESTRICT ON UPDATE CASCADE
);
