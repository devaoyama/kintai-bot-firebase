export default class User {
    constructor(
        readonly userID: string,
        readonly username: string,
        readonly email: string,
    ) {}

    getLocale() {
        return 'ja';
    }

    setLocale(locale: string) {
        return 'ja';
    }
}
