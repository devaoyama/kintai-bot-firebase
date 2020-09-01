import Users from "../users";
import * as admin from "firebase-admin";
import {User} from "../../interfaces";
import {injectable} from "inversify";

@injectable()
export default class UsersFactory {
    readonly auth = admin.auth();

    async factory(email: string, userID: string, username: string) {
        let userRecord = await this.auth.getUserByEmail(email).catch(() => {
            console.log('user not found');
        });
        if (!userRecord) {
            userRecord = await this.createUser(email);
        }
        const user: User = {
            uid: userRecord.uid,
            email: email,
            slack_uid: userID,
            slack_username: username,
            locale: 'ja',
        };
        const users = new Users();
        await users.init(user);
        return users;
    }

    private async createUser(email: string) {
        return await this.auth.createUser({
            email: email,
            emailVerified: false,
            password: 'password',
            disabled: false,
        });
    }
}
