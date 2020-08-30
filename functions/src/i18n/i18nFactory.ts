import I18n from "./i18n";
import {inject, injectable} from "inversify";
import {TYPES} from "../DI/types";

@injectable()
export default class I18nFactory {
    constructor(@inject(TYPES.AcceptableLocale) readonly acceptableLocale: string[]) {}

    factory(locale: string) {
        const messages = require(`./messages/${locale}`)["default"];
        return new I18n(locale, messages, this.acceptableLocale);
    }
}
