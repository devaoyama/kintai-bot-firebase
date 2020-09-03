import {inject, injectable} from "inversify";
import {TYPES} from "./DI/types";
import WorkedHoursCalculator from "./time-calculator/workedHoursCalculator";
import OvertimeHoursCalculator from "./time-calculator/overtimeHoursCalculator";
import MidnightHoursCalculator from "./time-calculator/midnightHoursCalculator";
import {Work} from "./interfaces";
import * as dayjs from "dayjs";

@injectable()
export default class Calculator {
    constructor(
        @inject(TYPES.workedHoursCalculator) private workedHourCalculator: WorkedHoursCalculator,
        @inject(TYPES.overtimeHoursCalculator) private overtimeHoursCalculator: OvertimeHoursCalculator,
        @inject(TYPES.midnightHoursCalculator) private midnightHoursCalculator: MidnightHoursCalculator,
    ) {}

    calculate(work: Work): Work {
        if (work.sign_in && work.sign_out) {
            const signIn = dayjs(work.sign_in.toDate());
            const signOut = dayjs(work.sign_out.toDate());
            const restTime = work.rest_time || 0;

            work.work_hours = this.workedHourCalculator.calculate(signIn, signOut, restTime);
            work.overwork_hours = this.overtimeHoursCalculator.calculate(signIn, signOut, restTime);
            work.midnight_work_hours = this.midnightHoursCalculator.calculate(signIn, signOut, restTime);
        }
        return work;
    }
}
