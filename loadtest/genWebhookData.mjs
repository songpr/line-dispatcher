
import { monotonicFactory } from "ulidx";
const ulid = monotonicFactory();
import { faker, fakerEN_US } from '@faker-js/faker';
//webhookEventId->ulid, message.replyToken->"nHuyWiB7yP5Zw52FIkcQobQuGDXCTA", userId->U[0-9a-f]{32}, message.id->number
const LineWebHookFields = ["webhookEventId", "userId", "timestamp", "replyToken", "message.id", "message.text", "webhookEventId2", "userId2", "timestamp2", "replyToken2", "message2.id", "message2.text"];
function generateLineField(field) {
    switch (field) {
        case "webhookEventId":
            return `"${ulid(12345678910)}"`;
        case "userId":
            return `"U${faker.string.fromCharacters('0123456789abcdef', 32)}"`;
        case "timestamp":
            return `${faker.date.soon({ days: 1 }).getTime()}`;
        case "replyToken":
            return `"${faker.string.alphanumeric(30)}"`;
        case "message.id":
            return `"${generateMessageId()}"`;
        case "message.text":
            return `"${fakerEN_US.lorem.sentence({ min: 2, max: 6 })}"`;
        case "webhookEventId":
            return `"${ulid(12345678910)}"`;
        case "replyToken2":
            return `"${faker.string.alphanumeric(30)}"`;
        case "userId2":
            return `"U${faker.string.fromCharacters('0123456789abcdef', 32)}"`;
        case "timestamp2":
            return `${faker.date.soon({ days: 1 }).getTime()}`;
        case "message2.id":
            return `"${generateMessageId()}"`;
        case "message2.text":
            return `"${fakerEN_US.lorem.sentence({ min: 2, max: 6 })}"`;
    }
}
function generateMessageId() {
    let id = faker.number.int({ min: 10000 });
    while (messageIds.has(id)) {
        id = faker.number.int({ min: 10000 });
    }
    messageIds.set(id, true);
    return id;
}

const numrows = process.argv[2] || 1000;
console.log(LineWebHookFields.join(","));
const messageIds = new Map();
for (let i = 0; i < numrows; i++) {
    let line = "";
    LineWebHookFields.forEach((field) => {
        if (line.length > 0) line += ",";
        line += generateLineField(field);
    });
    console.log(line);
}
