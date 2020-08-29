import {Dayjs} from "dayjs";
import {injectable} from "inversify";

@injectable()
export default class MidnightHoursCalculator {
    calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number {
        const workedMin = signOut
            .clone()
            .startOf('minute')
            .diff(signIn.clone().set('hour', 22).startOf('hour'), 'minute', true)
        ;

        const workedHours = (workedMin - (workedMin % 15)) / 60;

        return Math.max(0, workedHours);
    }
}
