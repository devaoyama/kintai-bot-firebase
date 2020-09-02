import {Command} from "../interfaces";
import Request from "../request";
import I18n from "../i18n/i18n";
import * as dayjs from "dayjs";
import {inject, injectable} from "inversify";
import {TYPES} from "../DI/types";

@injectable()
export default class CommandSignOut implements Command {
    constructor(@inject(TYPES.CommandDayTotal) readonly commandDayTotal: Command) {}

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
            return '';
        }

        const work = works.getWork();

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

            if (work.sign_out) {
                work.sign_out = datetime.toDate();
                await works.set(work);
                await this.commandDayTotal.execute(request, i18n);
                message = '退勤日時を更新しました';
            } else {
                work.sign_out = datetime.toDate();
                await works.set(work);
                await this.commandDayTotal.execute(request, i18n);
                message = '退勤しました';
            }
        }

        return message;
    }
}
