import {Command} from "../interfaces";
import Request from "../request";
import I18n from "../i18n/i18n";
import * as dayjs from "dayjs";
import {inject, injectable} from "inversify";
import {TYPES} from "../DI/types";
import Calculator from "../calculator";

@injectable()
export default class CommandNoRest implements Command {

    constructor(@inject(TYPES.Calculator) readonly calculator: Calculator) {}
    async execute(request: Request, i18n: I18n): Promise<string> {
        const user = request.user;

        const now = dayjs();

        const parsedDate = i18n.parseDate(request.body);

        const date = parsedDate || now;

        const works = await user.users.getWorks(date);

        if (!works) {
            // レコードがない
            return i18n.template('signInFirst', {
                username: user.getUsername(),
                date: date.format('YYYY/MM/DD')
            });
        }

        let work = works.getWork();
        if (work) {
            if (!work.sign_in) {
                // 出勤していない
                return i18n.template('signInFirst', {
                    username: user.getUsername(),
                    date: date.format('YYYY/MM/DD')
                });
            } else {
                work.rest_time = 0;
                work = this.calculator.calculate(work);
                await works.set(work);
                return i18n.template('restHours', {
                    username: user.getUsername(),
                    date: date.format('YYYY/MM/DD'),
                    hours: work.rest_time,
                    signIn: dayjs(work.sign_in?.toDate()).format('HH:mm'),
                    signOut: dayjs(work.sign_out?.toDate()).format('HH:mm'),
                    workedHours: work.work_hours,
                });
            }
        }

        return 'invalid date';
    }
}
