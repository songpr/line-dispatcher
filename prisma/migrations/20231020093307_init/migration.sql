-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebhookEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "replyToken" TEXT,
    "isRedelivery" BOOLEAN DEFAULT false,
    "lineWebhookEvent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_WebhookEvent" ("id", "isRedelivery", "lineWebhookEvent", "mode", "replyToken", "timestamp", "type") SELECT "id", "isRedelivery", "lineWebhookEvent", "mode", "replyToken", "timestamp", "type" FROM "WebhookEvent";
DROP TABLE "WebhookEvent";
ALTER TABLE "new_WebhookEvent" RENAME TO "WebhookEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
