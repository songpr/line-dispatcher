-- CreateTable
CREATE TABLE "WebhookEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "replyToken" TEXT,
    "isRedelivery" BOOLEAN DEFAULT false,
    "lineWebhookEvent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineWebhook" (
    "destination" TEXT NOT NULL,
    "lineWebhook" TEXT NOT NULL,
    "xLineSignature" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LineWebhook_pkey" PRIMARY KEY ("xLineSignature","createdAt")
);

-- CreateTable
CREATE TABLE "lineWebhookDelivery" (
    "isRedelivery" BOOLEAN DEFAULT false,
    "webhookEventId" TEXT NOT NULL,
    "lineWebhookXLineSignature" TEXT NOT NULL,
    "lineWebhookCreatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lineWebhookDelivery_pkey" PRIMARY KEY ("webhookEventId","lineWebhookXLineSignature","lineWebhookCreatedAt")
);

-- AddForeignKey
ALTER TABLE "lineWebhookDelivery" ADD CONSTRAINT "lineWebhookDelivery_webhookEventId_fkey" FOREIGN KEY ("webhookEventId") REFERENCES "WebhookEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lineWebhookDelivery" ADD CONSTRAINT "lineWebhookDelivery_lineWebhookXLineSignature_lineWebhookC_fkey" FOREIGN KEY ("lineWebhookXLineSignature", "lineWebhookCreatedAt") REFERENCES "LineWebhook"("xLineSignature", "createdAt") ON DELETE RESTRICT ON UPDATE CASCADE;
