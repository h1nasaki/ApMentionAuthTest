import { generateKey, saveLocalStorage, loadLocalStorage } from './utils.js'
import { getMentions } from './mkApi.js'

export function registRequest(username) {
    console.group(`auth.js/registRequest`)
    console.log(`called for: ${username}`)

    const key = generateKey()

    console.log(`generated: ${key}`)

    const obj = {
        username,
        key
    }

    saveLocalStorage(username, obj)

    console.groupEnd()

    return key;
}

export async function checkAuthState(username) {
    console.group(`auth.js/checkAuthState`)
    console.log(`called for: ${username}`)

    const obj = loadLocalStorage(username)
    // ローカルストレージに登録されていないユーザーの場合はこの時点で認証失敗
    if (obj === null) {
        // ログ
        console.warn('該当ユーザーはLocalStorageに登録されていません')
        console.warn('認証失敗: 未登録')
        console.groupEnd()

        return '認証失敗: 未登録'
    }

    console.info(`Found: ${obj.username}/${obj.key}`)

    // フラグ初期化
    let flg = false

    // アカウントに到達したメンションを取得→合致するものがあるか確認
    console.log('Fetching mentions...')
    await getMentions().then((notes) => {
        console.log(`Fetched ${notes.length} notes`)
        console.dir(notes)
        console.group('checkMentions')
        for (const note of notes) {
            console.group('checkNote')
            console.log(`username: @${note.user.username}@${note.user.host} / text: ${note.text}`)
            if (`@${note.user.username}@${note.user.host}` === username) { // ターゲットユーザーが作成した投稿か?
                console.log('ターゲットユーザーか? => Yes')
                if (note.text.includes(obj.key)) { // メンションにキーが含まれているか?
                    // どちらも合致した場合、認証成功
                    // ログ
                    console.log('キーが含まれているか? => Yes => 認証成功')
                    flg = true
                } else console.log('キーが含まれているか? => No => Skip')
            } else console.log('ターゲットユーザーか? => No => Skip')
            console.groupEnd()
        }
        console.groupEnd()
    })

    console.log(`flg: ${flg}`)
    console.groupEnd()

    // 表示する文字列を返却
    if (flg) {
        return '認証成功: メンション検知'
    } else {
        return '認証失敗: メンション未達'
    }

}
