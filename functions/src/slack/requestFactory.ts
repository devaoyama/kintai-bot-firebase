import {MessageEvent} from "@slack/bolt";
import UserResolver from "../userResolver";
import Request from "../request";

export default class RequestFactory {
    constructor(readonly userResolver: UserResolver) {}

    factory(event: MessageEvent): Request | null {
        if (event.channel !== 'channel_id') {
            return null;
        }

        if (!event.text) {
            return null;
        }

        const user = this.userResolver.resolve(event.user);

        return new Request(event.text, user);
    }
}
