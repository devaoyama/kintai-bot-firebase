import Container from "./DI/container";
import {TYPES} from "./DI/types";
import {App, ExpressReceiver} from "@slack/bolt";

// DIコンテナ起動
const container = new Container();
container.boot();

export const expressReceiver = container.get<ExpressReceiver>(TYPES.ExpressReceiver);

const app = container.get<App>(TYPES.App);

app.event('message', async ({event, say}) => {
    // コマンドがあるか
    // コマンド実行
    // メッセージ送信
    await say('hello world');
});
