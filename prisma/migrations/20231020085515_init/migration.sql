-- CreateTable
CREATE TABLE "WebhookEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "replyToken" TEXT,
    "isRedelivery" BOOLEAN DEFAULT false,
    "lineWebhookEvent" TEXT NOT NULL,
    "xLineSignature" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WebhookEvent_type_key" ON "WebhookEvent"("type");
