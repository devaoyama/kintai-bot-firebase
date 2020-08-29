const TYPES = {
    SlackSecret: Symbol.for("SlackSecret"),
    SlackToken: Symbol.for("SlackToken"),
    SlackChannelId: Symbol.for("SlackChannelId"),
    Container: Symbol.for("Container"),
    AcceptableLocale: Symbol.for("AcceptableLocale"),
    ExpressReceiver: Symbol.for("ExpressReceiver"),
    App: Symbol.for("App"),
    I18nFactory: Symbol.for("I18nFactory"),
    RequestFactory: Symbol.for("RequestFactory"),
    UserFactory: Symbol.for("UserFactory"),
    workedHoursCalculator: Symbol.for("workedHoursCalculator"),
    overtimeHoursCalculator: Symbol.for("overtimeHoursCalculator"),
    midnightHoursCalculator: Symbol.for("midnightHoursCalculator"),
    Calculator: Symbol.for("Calculator"),
}

export {TYPES};
