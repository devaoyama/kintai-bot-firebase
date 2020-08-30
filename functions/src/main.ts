import Container from "./DI/container";
import {TYPES} from "./DI/types";
import {App, ExpressReceiver} from "@slack/bolt";
import RequestFactory from "./factory/requestFactory";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// firebase-adminの初期化
admin.initializeApp(functions.config().firebase);

// DIコンテナ起動
const container = new Container();
container.boot();

export const expressReceiver = container.get<ExpressReceiver>(TYPES.ExpressReceiver);

const app = container.get<App>(TYPES.App);

app.event('message', async ({event, say}) => {
    const request = await container.get<RequestFactory>(TYPES.RequestFactory).factory(event);
    // コマンドがあるか
    // コマンド実行
    // メッセージ送信
    if (request) {
        await say(request.body);
    }
});
