import Users from "./firestore/users";

export default class User {
    constructor(readonly users: Users) {}

    getLocale(): string {
        const user = this.users.getUser();
        if (user) {
            return user.locale;
        }
        return 'ja';
    }

    async setLocale(locale: string) {
        const user = this.users.getUser();
        if (user) {
            user.locale = locale;
            await this.users.setData(user);
        }
    }
}
