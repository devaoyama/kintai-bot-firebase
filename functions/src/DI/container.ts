import {Container as PContainer} from "inversify";
import {TYPES} from "./types";
import {App, ExpressReceiver} from "@slack/bolt";

require("dotenv").config();

export default class Container extends PContainer{
    boot() {
        this.bind(TYPES.SlackSecret).toConstantValue(process.env.SLACK_SECRET || '');
        this.bind(TYPES.SlackToken).toConstantValue(process.env.SLACK_TOKEN || '');
        this.bind(TYPES.SlackChannelId).toConstantValue(process.env.SLACK_CHANNEL_ID || '');

        this.bind<ExpressReceiver>(TYPES.ExpressReceiver).toDynamicValue((context => {
            return new ExpressReceiver({
                signingSecret: context.container.get(TYPES.SlackSecret),
                endpoints: "/events",
                processBeforeResponse: true,
            });
        })).inSingletonScope();

        this.bind<App>(TYPES.App).toDynamicValue((context => {
            return new App({
                token: context.container.get(TYPES.SlackToken),
                receiver: context.container.get(TYPES.ExpressReceiver),
            });
        })).inSingletonScope();
    }
}
