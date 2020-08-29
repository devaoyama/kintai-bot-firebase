import {inject, injectable} from "inversify";
import {TYPES} from "./DI/types";
import WorkedHoursCalculator from "./time-calculator/workedHoursCalculator";
import OvertimeHoursCalculator from "./time-calculator/overtimeHoursCalculator";
import MidnightHoursCalculator from "./time-calculator/midnightHoursCalculator";

@injectable()
export default class Calculator {
    constructor(
        @inject(TYPES.workedHoursCalculator) private workedHourCalculator: WorkedHoursCalculator,
        @inject(TYPES.overtimeHoursCalculator) private overtimeHoursCalculator: OvertimeHoursCalculator,
        @inject(TYPES.midnightHoursCalculator) private midnightHoursCalculator: MidnightHoursCalculator,
    ) {}

    calculate(row: any): void {
        const signIn = row.getSignIn();
        const signOut = row.getSignOut();
        const restTime = row.getRestTimeHours() || 0;

        row.setWorkedHours(this.workedHourCalculator.calculate(signIn, signOut, restTime));
        row.setOvertimeHours(this.overtimeHoursCalculator.calculate(signIn, signOut, restTime));
        row.setMidnightHours(this.midnightHoursCalculator.calculate(signIn, signOut, restTime));
    }
}
