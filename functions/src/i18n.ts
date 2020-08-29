import * as Polyglot from 'node-polyglot';
import * as dayjs from "dayjs";
import Dayjs = dayjs.Dayjs;

export default class I18n extends Polyglot {
    readonly acceptableLocale: string[] = ['ja'];

    constructor(locale: string, private messages: {[key: string]: {}}) {
        super({phrases: messages, locale: locale});
    }

    getCommands(): {[key:string]:string} {
        return this.messages.commands;
    }

    template(key: string, option?: {}) {
        return  this.t('template.' + key, option);
    }

    parseTime(str: string): Dayjs | null {

        const reg = new RegExp('('
            + this.t("dateTimeSettings.am")
            + '|'
            + this.t("dateTimeSettings.pm")
            + ')(\\d{1,2})[:'
            + this.t("dateTimeSettings.oclock")
            + '](\\d{0,2})|(\\d{1,2})[:'
            + this.t("dateTimeSettings.oclock")
            + '](\\d{0,2})[\\s'
            + this.t("dateTimeSettings.min")
            + ']?('
            + this.t("dateTimeSettings.am")
            + '|'
            + this.t("dateTimeSettings.pm")
            + '|'
            +')', 'i')

        const matches = str.match(reg);

        if (matches) {
            console.log(matches);
            let hour = Number(matches[2]) || Number(matches[4]);
            let min = Number(matches[3]) || Number(matches[5]) || 0;

            //  pmの指定があったら12時間足して午後にする
            if (matches[1] === this.t("dateTimeSettings.pm") || matches[6] === this.t("dateTimeSettings.pm")) {
                hour += 12;
            }

            return dayjs().set('hour', hour).set('minute', min);
        }
        return null;
    };

    parseDate(str: string): Dayjs | null {

        const regTomorrow = new RegExp(this.t('dateTimeSettings.tomorrow'), 'i');
        if (str.match(regTomorrow)) {
            return dayjs().add(1, 'day').startOf('day');
        }

        const regToday = new RegExp(this.t('dateTimeSettings.today'), 'i');
        if (str.match(regToday)) {
            return dayjs().startOf('day');
        }

        const regYesterday = new RegExp(this.t('dateTimeSettings.yesterday'), 'i');
        if (str.match(regYesterday)) {
            return dayjs().add(-1, 'day').startOf('day');
        }

        const regex = new RegExp('(\\d{4}|\\d{0})[-/'
            + this.t("dateTimeSettings.year")
            + ']?(\\d{1,2})[-/'
            + this.t("dateTimeSettings.month")
            + '](\\d{1,2})', 'i')
        const matches = str.match(regex);
        if (matches) {
            let year = Number(matches[1]);
            let month = Number(matches[2]);
            let day = Number(matches[3]);
            const now = dayjs();
            if (!year || year < 1970) {
                if ((now.month() + 1) >= 11 && month <= 2) {
                    year = now.year() + 1;
                }
                else if ((now.month() + 1) <= 2 && month >= 11) {
                    year = now.year() - 1;
                }
                else {
                    year = now.year();
                }
            }
            return dayjs(`${year}-${month}-${day}`);
        }

        return null;
    };

    parseHours(str: string): number | null {
        const regex = new RegExp('(\\d*\\.?\\d*)\\s*' + this.t('dateTimeSettings.hours'), 'i');
        const matches = str.match(regex);
        if (matches) {
            return Number(matches[1]);
        }
        return null;
    }

    parseLocale(str: string): string | null {
        let locales = '(';
        this.acceptableLocale.forEach((locale) => {
            locales += locale + '|';
        });
        locales = locales.slice(0, -1);
        locales += ')';
        const regex = new RegExp(locales, 'i');
        const matches = str.match(regex);
        if (matches) {
            return matches[0];
        }

        return null;
    }
}
