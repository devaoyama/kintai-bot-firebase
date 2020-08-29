import {inject, injectable, interfaces} from "inversify";
import {TYPES} from "../DI/types";
import Request from "../request";
import I18n from "../i18n/i18n";
import Container = interfaces.Container;
import I18nFactory from "../i18n/i18nFactory";

@injectable()
export default class CommandResolver {
    constructor(
        @inject(TYPES.AcceptableLocale) readonly acceptableLocale: string[],
        @inject(TYPES.Container) readonly container: Container,
        @inject(TYPES.I18nFactory) readonly i18nFactory: I18nFactory
    ) {}

    resolve(request: Request) {
        // セットされているロケール
        const defaultLocale = request.user.getLocale();
        let i18n = this.i18nFactory.factory(defaultLocale);
        let command = this.getCommand(i18n, request);
        if (command) {
            return command;
        }

        // セットされているロケール以外
        const locales = this.acceptableLocale.filter((locale) => {
            return locale !== defaultLocale;
        });
        for (const locale of locales) {
            i18n = this.i18nFactory.factory(locale);
            command = this.getCommand(i18n, request);
            if (command) {
                request.user.setLocale(locale);
                return command;
            }
        }

        return null;
    }

    private getCommand(i18n: I18n, request: Request) {
        const commands = i18n.getCommands();
        for (const key of Object.keys(commands)) {
            const matcher = new RegExp(commands[key]);

            if (matcher.test(request.body)) {
                return this.registry(key);
            }
        }

        return null;
    }

    private registry(key: string) {
        // @ts-ignore
        return this.container.get(TYPES[`Command${key.charAt(0).toUpperCase() + key.slice(1)}`]);
    }
}
