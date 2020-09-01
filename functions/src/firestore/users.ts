import * as admin from "firebase-admin";
import {User} from "../interfaces";
import Works from "./works";

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

    getWorks(): Works | null {
        if (this.user) {
            return new Works(this.db.collection('user').doc(this.user.uid));
        }
        return null;
    }
}
