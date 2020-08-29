import I18n from "./i18n/i18n";

export interface Command {
    execute(request: Request, i18n: I18n): Response;
}
