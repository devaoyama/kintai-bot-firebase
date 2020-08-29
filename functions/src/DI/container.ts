import "reflect-metadata";
import {Container as PContainer} from "inversify";
import {TYPES} from "./types";
import {App, ExpressReceiver} from "@slack/bolt";
import RequestFactory from "../factory/requestFactory";
import UserFactory from "../factory/userFactory";
import WorkedHoursCalculator from "../time-calculator/workedHoursCalculator";
import OvertimeHoursCalculator from "../time-calculator/overtimeHoursCalculator";
import MidnightHoursCalculator from "../time-calculator/midnightHoursCalculator";
import Calculator from "../calculator";

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

        this.bind<RequestFactory>(TYPES.RequestFactory).to(RequestFactory);
        this.bind<UserFactory>(TYPES.UserFactory).to(UserFactory);

        this.bind<WorkedHoursCalculator>(TYPES.workedHoursCalculator).to(WorkedHoursCalculator);
        this.bind<OvertimeHoursCalculator>(TYPES.overtimeHoursCalculator).to(OvertimeHoursCalculator);
        this.bind<MidnightHoursCalculator>(TYPES.midnightHoursCalculator).to(MidnightHoursCalculator);
        this.bind<Calculator>(TYPES.Calculator).to(Calculator);
    }
}
