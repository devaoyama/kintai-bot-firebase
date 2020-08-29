import I18n from "./i18n";

export default class I18nFactory {
    factory(locale: string) {
        const messages = require(`./messages/${locale}`)["default"];
        return new I18n(locale, messages);
    }
}
