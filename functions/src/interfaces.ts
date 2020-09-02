import I18n from "./i18n/i18n";
import Request from "./request";
import * as admin from "firebase-admin";

export interface Command {
    execute(request: Request, i18n: I18n): Promise<string>;
}

export interface User {
    uid: string,
    email: string,
    slack_uid: string,
    slack_username: string,
    locale: string,
}

export interface Work {
    date: Date | admin.firestore.Timestamp,
    sign_in: Date | admin.firestore.Timestamp | null,
    sign_out: Date | admin.firestore.Timestamp | null,
    rest_time: number | null,
    work_hours: number | null,
    overwork_hours: number | null,
    midnight_work_hours: number | null,
}
