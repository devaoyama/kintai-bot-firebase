import User from "./user";

export default class UserResolver {
    resolve(userID: string) {
        const username = '';
        const email = '';
        return new User(userID, username, email);
    }
}
