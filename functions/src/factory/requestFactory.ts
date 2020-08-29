import {MessageEvent} from "@slack/bolt";
import UserFactory from "./userFactory";
import Request from "../request";
import {inject, injectable} from "inversify";
import {TYPES} from "../DI/types";

@injectable()
export default class RequestFactory {
    constructor(
        @inject(TYPES.UserFactory) readonly userResolver: UserFactory,
        @inject(TYPES.SlackChannelId) readonly slackChannelId: string
    ) {}

    async factory(event: MessageEvent): Promise<Request | null> {
        if (event.channel !== this.slackChannelId) {
            return null;
        }

        if (!event.text) {
            return null;
        }

        const user = await this.userResolver.resolve(event.user);

        return new Request(event.text, user);
    }
}
