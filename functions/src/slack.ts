import {App, ExpressReceiver} from "@slack/bolt";
import * as config from "./config";

export const expressReceiver = new ExpressReceiver({
    signingSecret: config.SLACK_SECRET,
    endpoints: '/events',
    processBeforeResponse: true,
});

const app = new App({
    receiver: expressReceiver,
    token: config.SLACK_TOKEN,
});

app.event('message', async ({say}) => {
    // コマンドがあるか
    // ユーザーを探す
    // コマンド実行
    // メッセージ送信
    await say('hello world');
});
