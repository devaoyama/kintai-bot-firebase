import User from "./user";

export default class Request {
    constructor(readonly body: string, readonly user: User) {}
}
