import I18n from "./i18n/i18n";
import Request from "./request";
import {Dayjs} from "dayjs";

export interface Command {
    execute(request: Request, i18n: I18n): string;
}

export interface User {
    uid: string,
    email: string,
    slack_uid: string,
    slack_username: string,
    locale: string,
}

export interface Work {
    date: Dayjs,
    sign_in: Dayjs,
    sign_out: Dayjs | null,
    rest_time: number | null,
    work_hours: number | null,
    overwork_hours: number | null,
    midnight_work_hours: number | null,
}
