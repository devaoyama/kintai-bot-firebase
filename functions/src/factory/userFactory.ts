import User from "../user";
import {inject, injectable} from "inversify";
import {TYPES} from "../DI/types";
import {App} from "@slack/bolt";

@injectable()
export default class UserFactory {
    constructor(@inject(TYPES.App) readonly app: App, @inject(TYPES.SlackToken) readonly slackToken: string) {}

    async resolve(userID: string) {
        const result = await this.app.client.users.info({
            token: this.slackToken,
            user: userID
        });
        // @ts-ignore
        return new User(userID, result.user.name, result.user.profile.email);
    }
}
