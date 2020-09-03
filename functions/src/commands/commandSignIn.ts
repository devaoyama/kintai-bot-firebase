import {Command} from "../interfaces";
import Request from "../request";
import I18n from "../i18n/i18n";
import * as dayjs from "dayjs";
import {injectable} from "inversify";

@injectable()
export default class CommandSignIn implements Command {
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
            return 'エラー';
        }

        let work = works.getWork();

        if (!work) {
            work = {
                date: datetime.startOf('day').toDate(),
                sign_in: null,
                sign_out: null,
                rest_time: null,
                work_hours: null,
                overwork_hours: null,
                midnight_work_hours: null,
            };
            await works.add(work);
        }

        if (work.sign_in) {
            if (!parsedDate) {
                return i18n.template('alreadySignedIn', {
                    username: user.getUsername(),
                    date: date.format('YYYY/MM/DD')
                });
            } else {
                work.sign_in = datetime.toDate();
                await works.set(work);
                return i18n.template('signInUpdate', {
                    username: user.getUsername(),
                    date: datetime.format('YYYY/MM/DD'),
                    time: datetime.format('HH:mm')
                });
            }
        } else {
            work.sign_in = datetime.toDate();
            work.rest_time = 1;
            await works.set(work);
            return i18n.template('signIn', {
                username: user.getUsername(),
                datetime: datetime.format('YYYY/MM/DD HH:mm')
            });
        }
    }
}
