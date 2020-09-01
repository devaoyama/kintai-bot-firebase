import * as admin from "firebase-admin";
import {Dayjs} from "dayjs";
import {Work} from "../interfaces";

export default class Works {
    private work: Work | undefined;

    constructor(readonly documentCollection: admin.firestore.DocumentReference) {}

    async get(date: Dayjs) {
        const worksData = await this.documentCollection
            .collection('works')
            .where('date', '==', date.toDate())
            .get();
        if (worksData.empty) {
            return null;
        }
        // @ts-ignore
        this.setWork(worksData.docs[0].data());
        return this.work;
    }

    async set(work: Work) {
        await this.documentCollection.collection('works').add(work);
        this.setWork(work);
    }

    getWork() {
        return this.work;
    }

    setWork(work: Work) {
        this.work = work;
    }
}
