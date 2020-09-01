import Container from "./DI/container";
import {TYPES} from "./DI/types";
import {App, ExpressReceiver} from "@slack/bolt";
import RequestFactory from "./factory/requestFactory";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import CommandResolver from "./commands/commandResolver";
import I18nFactory from "./i18n/i18nFactory";

// firebase-adminの初期化
admin.initializeApp(functions.config().firebase);

// DIコンテナ起動
const container = new Container();
container.boot();

export const expressReceiver = container.get<ExpressReceiver>(TYPES.ExpressReceiver);

const app = container.get<App>(TYPES.App);

app.event('message', async ({event, say}) => {
    const request = await container.get<RequestFactory>(TYPES.RequestFactory).factory(event);

    if (request) {
        const command = container.get<CommandResolver>(TYPES.CommandResolver).resolve(request);

        if (command) {
            const i18n = container.get<I18nFactory>(TYPES.I18nFactory).factory(request.user.getLocale());
            const response = await command.execute(request, i18n);
            await say(response);
        } else {
            await say('コマンドが見つかりません');
        }
    }
});
