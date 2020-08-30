import I18n from "./i18n/i18n";
import Request from "./request";

export interface Command {
    execute(request: Request, i18n: I18n): string;
}
