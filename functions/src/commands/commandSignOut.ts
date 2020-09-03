import {Command} from "../interfaces";
import Request from "../request";
import I18n from "../i18n/i18n";
import * as dayjs from "dayjs";
import {inject, injectable} from "inversify";
import {TYPES} from "../DI/types";
import Calculator from "../calculator";
import * as admin from "firebase-admin";

@injectable()
export default class CommandSignOut implements Command {
    constructor(@inject(TYPES.Calculator) readonly calculator: Calculator) {}

    async execute(request: Request, i18n: I18n): Promise<string> {
        const user = request.user;

        const now = dayjs();

        const parsedDate = i18n.parseDate(request.body);
        const parsedTime = i18n.parseTime(request.body);

        const date = parsedDate || now;
        const time = parsedTime || now;
        const datetime = date.clone().set('hour', time.hour()).set('minute', time.minute());

        const works = await user.users.getWorks(datetime);

        if (!works) {
            // レコードがない
            return i18n.template('signInFirst', {
                username: user.getUsername(),
                date: date.format('YYYY/MM/DD')
            });
        }

        let work = works.getWork();

        let message = '';
        if (work) {
            if (!work.sign_in) {
                return i18n.template('signInFirst', {
                    username: user.getUsername(),
                    date: date.format('YYYY/MM/DD')
                });
            }

            if (work.sign_out && !parsedDate) {
                return i18n.template('alreadySignedOut', {
                    username: user.getUsername(),
                    date: date.format('YYYY/MM/DD')
                })
            }

            const signOut = work.sign_out;
            work.sign_out = admin.firestore.Timestamp.fromDate(datetime.toDate());
            work = this.calculator.calculate(work);
            await works.set(work);

            if (signOut) {
                message = i18n.template('signOutUpdate', {
                    username: user.getUsername(),
                    date: datetime.format('YYYY/MM/DD'),
                    time: datetime.format('HH:mm'),
                    signIn: dayjs(work.sign_in?.toDate()).format('HH:mm'),
                    signOut: dayjs(work.sign_out?.toDate()).format('HH:mm'),
                    workedHours: work.work_hours,
                });
            } else {
                message = message = i18n.template('signOut', {
                    username: user.getUsername(),
                    datetime: datetime.format('YYYY/MM/DD HH:mm'),
                    signIn: dayjs(work.sign_in?.toDate()).format('HH:mm'),
                    signOut: dayjs(work.sign_out?.toDate()).format('HH:mm'),
                    workedHours: work.work_hours,
                });
            }
        }

        return message;
    }
}
