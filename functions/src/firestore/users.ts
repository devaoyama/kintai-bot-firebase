import * as admin from "firebase-admin";
import {User} from "../interfaces";
import Works from "./works";
import {Dayjs} from "dayjs";

export default class Users {
    readonly db = admin.firestore();

    private user: User | undefined;

    async init(user: User) {
        const userData = await this.getData(user.uid);
        if (!userData) {
            await this.setData(user);
        }
    }

    async getData(uid: string) {
        const doc = await this.db.collection('users').doc(uid).get();
        if (!doc.exists) {
            return null;
        }
        // @ts-ignore
        this.setUser(doc.data());
        return this.user;
    }

    async setData(user: User) {
        await this.db.collection('users').doc(user.uid).set(user);
        this.setUser(user);
    }

    getUser() {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }

    async getWorks(date: Dayjs) {
        if (this.user) {
            const works = new Works(this.db.collection('users').doc(this.user.uid));
            await works.init(date);
            return works;
        }
        return null;
    }
}
