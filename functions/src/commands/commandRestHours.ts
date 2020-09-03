import {Command} from "../interfaces";
import Request from "../request";
import I18n from "../i18n/i18n";
import * as dayjs from "dayjs";
import {inject, injectable} from "inversify";
import {TYPES} from "../DI/types";
import Calculator from "../calculator";

@injectable()
export default class CommandRestHours implements Command {

    constructor(@inject(TYPES.Calculator) readonly calculator: Calculator) {}
    async execute(request: Request, i18n: I18n): Promise<string> {
        const user = request.user;

        const now = dayjs();

        const restHours = i18n.parseHours(request.body);
        if (!restHours) {
            return '時間が指定されていません';
        }

        const parsedDate = i18n.parseDate(request.body);

        const date = parsedDate || now;

        const works = await user.users.getWorks(date);
        if (!works) {
            return '';
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
                work.rest_time = restHours;
                work = this.calculator.calculate(work);
                await works.set(work);
                return '休憩時間を変更';
            }
        }
        return '';
    }
}
