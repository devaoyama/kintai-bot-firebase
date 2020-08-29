import {Dayjs} from "dayjs";
import {inject, injectable} from "inversify";
import {TYPES} from "../DI/types";
import WorkedHoursCalculator from "./workedHoursCalculator";

@injectable()
export default class OvertimeHoursCalculator {
    constructor(@inject(TYPES.workedHoursCalculator) private workedHourCalculator: WorkedHoursCalculator) {}

    calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number {
        return Math.max(0, this.workedHourCalculator.calculate(signIn, signOut, restTime) - 8);
    }
}
