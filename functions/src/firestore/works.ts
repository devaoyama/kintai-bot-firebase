import * as admin from "firebase-admin";
import {Dayjs} from "dayjs";
import {Work} from "../interfaces";

export default class Works {
    private work: Work | undefined;

    private workRef: admin.firestore.DocumentReference | undefined;

    constructor(readonly documentReference: admin.firestore.DocumentReference) {}

    async init(date: Dayjs) {
        const works = await this.get(date);
        if (!works) {
            const work: Work = {
                date: date.startOf('day').toDate(),
                sign_in: null,
                sign_out: null,
                rest_time: null,
                work_hours: null,
                overwork_hours: null,
                midnight_work_hours: null,
            }
            this.setWork(work)
            this.workRef = await this.documentReference.collection('works').add(work);
        }
    }

    async get(date: Dayjs) {
        const worksData = await this.documentReference
            .collection('works')
            .where('date', '==', date.startOf('day').toDate())
            .get();
        console.log(worksData.empty);
        if (worksData.empty) {
            return null;
        }
        console.log(worksData.docs[0].data());
        // @ts-ignore
        this.setWork(worksData.docs[0].data());
        this.workRef = worksData.docs[0].ref;
        return this.work;
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
