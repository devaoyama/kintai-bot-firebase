import {Dayjs} from "dayjs";
import {injectable} from "inversify";

@injectable()
export default class WorkedHoursCalculator {
    calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number {
        const workedMin = signOut
            .clone()
            .startOf('minute')
            .diff(signIn.clone().startOf('minute'), 'minute', true) - (restTime * 60)
        ;

        const workedHours = (workedMin - (workedMin % 15)) / 60;

        return Math.max(0, workedHours);
    }
}
