import {Command} from "../interfaces";
import Request from "../request";
import I18n from "../i18n/i18n";
import * as dayjs from "dayjs";
import {inject, injectable} from "inversify";
import {TYPES} from "../DI/types";
import Calculator from "../calculator";

@injectable()
export default class CommandDayTotal implements Command {
    constructor(@inject(TYPES.Calculator) readonly calculator: Calculator) {}

    async execute(request: Request, i18n: I18n): Promise<string> {
        const user = request.user;

        const now = dayjs();

        const parsedDate = i18n.parseDate(request.body);

        const date = parsedDate || now;

        const works = await user.users.getWorks(date);
        if (!works) {
            return '';
        }

        let work = works.getWork();
        if (work) {
            if (!work.sign_in || !work.sign_out) {
                // 出勤または退勤していない
                return '';
            }
            work = await this.calculator.calculate(work);
            await works.set(work);
        }
        return '変更完了';
    }
}
