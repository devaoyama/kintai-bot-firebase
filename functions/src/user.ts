import Users from "./firestore/users";

export default class User {
    constructor(readonly users: Users) {}

    getLocale() {
        return 'ja';
    }

    setLocale(locale: string) {
        return 'ja';
    }
}
