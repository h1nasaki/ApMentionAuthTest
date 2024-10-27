import { generateKey, saveLocalStorage, loadLocalStorage } from './utils.js'
import { getMentions } from './mkApi.js'


export function registRequest(username) {

    console.log(`registRequest Called: ${username}`)

    const key = generateKey()

    const obj = {
        username,
        key
    }

    console.log(`Registed: ${obj.username}/${obj.key}`)

    saveLocalStorage(username, obj)

    return key;
}

export async function checkAuthState(username) {
    const obj = loadLocalStorage(username)
    if (obj === null) {
        return '認証失敗: 未登録'
    }

    let flg = false

    await getMentions().then((notes) => {
        console.log(`Fetched ${notes.length} notes`)
        console.log(`Finding: ${obj.key}`)
        for (const note of notes) {
            console.log(`username: @${note.user.username}@${note.user.host} / text: ${note.text}`)
            if (`@${note.user.username}@${note.user.host}` === username) {
                if (note.text.includes(obj.key)) {
                    flg = true
                }
            }
        }
    })

    if (flg) {
        console.log('OK')
        return '認証成功: メンション検知'
    } else {
        console.log('NG')
        return '認証失敗: メンション未達'
    }

}
