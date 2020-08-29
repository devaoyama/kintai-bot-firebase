export default {
    template: {
        signIn: '<@%{username}> おはようございます (%{datetime})',
        alreadySignedIn: '<@%{username}> %{date}はもう出勤してますよ',
        signInUpdate: '<@%{username}> %{date}の出勤時間を%{time}へ変更しました',
        signOut: '<@%{username}> お疲れ様でした（%{signIn}〜%{signOut} 就業%{workedHours}時間）',
        alreadySignedOut: '<@%{username}> %{date}はもう退勤してますよ',
        signOutUpdate: '<@%{username}> %{date}の退勤を%{time}に変更しました（%{signIn}〜%{signOut} 就業%{workedHours}時間）',
        signInFirst:
            '<@%{username}> %{date}はまだ出勤していません。このコマンドは出勤してから実行してください',
        signOutFirst:
            '<@%{username}> %{date}はまだ退勤していません。このコマンドを退勤してから実行してください',
        noRest: '<@%{username}> %{date}を休憩なしに変更しました（%{signIn}〜%{signOut} 就業%{workedHours}時間）',
        restHours: '<@%{username}> %{date}の休憩(中抜け)を%{hours}時間に変更しました（%{signIn}〜%{signOut} 就業%{workedHours}時間）',
        dayTotal:
            '<@%{username}> さんの%{date}の勤務は%{signIn}～%{signOut}、就業時間%{workedHours}時間、休憩%{restTime}時間、時間外労働%{overtime}時間、深夜労働%{latetime}時間です',
        monthTotal:
            '%{username}さんの%{month}の集計:\n就業 - #3時間時\n間外労働 - #4時間\n深夜労働 - #5時間',
        didNotWorkThatMonth: '%{username}さんは%{month}に出勤しませんでした',
        didNotSignOutOn: '%{username}さんは%{date}に退勤していませんでした',
        help:
            'Timesheetsの使い方 ( | は同じことする別のコマンドの意味です):\n(全てのコマンドは大文字小文字を区別しません。半角、全角OK)\n\nChange locale to ja ~ （英語のみ) ロケールを変更する。\n\nおはよう | モーニン | ハロ | 出勤 ~ 今の日付時刻をSignIn(出勤)に登録して、RestTime(休憩時間)に自動で1時間登録する\n\nおはよう 10:00 | モーニン 13時 | ハロ 2:30午後 | 2017/6/1は１3時に出勤しました。| etc. ~ 日付時刻をSignInに登録する(日付がなかったら、今日の日付になります), RestTimeはそのまま\n\nバーイ | おやすみ | お疲れ様でした ~ 今の日付時刻をSignOut(退勤)に登録して、１日トータルを表示する\n\nバーイ 18:30 | 今日は6:30午後に退勤しました ~ 日付時刻をSignOutに登録して、１日トータルを表示する\n\n今日は2.5時間中抜けしました | 2017/6/1は2時間休憩とりました ~ 中抜け時間をRestTimeに登録して、１日トータルを表示する\n\n今日は休憩なしでした ~ 休憩時間を0に変更して、１日トータルを表示する\n\n今日は何時間働きましたか? | 2017/6/1の勤務時間どうですか？ ~ 日付の勤務時間を表示する\n\n今日はシフトをキャンセルです | 2017/6/1は休暇でした ~ SignInとSignOutを-に変更して、他のフィールドは0にして、１日トータルを表示する\n\n集計 :username 2017/6 ~ usernameの６月に働いた時間を表示する(: が必要です)',
        changeLocale: '<@%{username}> ロケールを%{locale}に変更しました',
        changeLocaleFailed:
            '<@%{username}> ロケールが見つかりません。ロケールを変更できませんでした'
    },
    dateTimeSettings: {
        am: '午前',
        pm: '午後',
        oclock: '時',
        min: '分',
        hours: '時間',
        yesterday: '昨日',
        today: '今日',
        tomorrow: '明日',
        year: '年',
        month: '月',
        day: '日'
    },
    commands: {
        dayTotal: '何時間働|勤務時間',
        help: '使い方|help',
        monthTotal: '集計|total',
        noRest: '休憩なし',
        restHours: 'なかぬけ|中抜|休憩(?!なし)',
        signIn: '(モ[ー〜]+ニン|も[ー〜]+にん|おっは|おは|へろ|はろ|ヘロ|ハロ|出勤)',
        signOut:
            '(バ[ー〜ァ]*イ|ば[ー〜ぁ]*い|おやすみ|お[つっ]ー|おつ|さらば|お先|お疲|帰|乙|退勤|ごきげんよ|グ[ッ]?バイ)',
        cancelShift: '休暇|キャンセル',
        changeLocale: 'ロケール|locale'
    }
};
