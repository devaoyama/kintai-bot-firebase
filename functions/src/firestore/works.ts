import * as admin from "firebase-admin";
import {Dayjs} from "dayjs";
import {Work} from "../interfaces";

export default class Works {
    private work: Work | undefined;

    private workRef: admin.firestore.DocumentReference | undefined;

    constructor(readonly documentReference: admin.firestore.DocumentReference) {}

    async init(date: Dayjs) {
        await this.get(date);
    }

    async get(date: Dayjs) {
        const worksData = await this.documentReference
            .collection('works')
            .where('date', '==', date.startOf('day').toDate())
            .get();
        if (worksData.empty) {
            return null;
        }
        // @ts-ignore
        this.setWork(worksData.docs[0].data());
        this.workRef = worksData.docs[0].ref;
        return this.work;
    }

    async add(work: Work) {
        this.workRef = await this.documentReference.collection('works').add(work);
        this.setWork(work);
    }

    async set(work: Work) {
        if (this.workRef) {
            await this.workRef.set(work);
            this.setWork(work);
        }
    }

    getWork() {
        return this.work;
    }

    setWork(work: Work) {
        this.work = work;
    }
}
