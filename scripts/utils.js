/**
 * Generate random 4-byte key
 */
export function generateKey() {
    console.group(`utils.js/generateKey`)
    console.log(`called`)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log(`generated: ${result}`)
    console.groupEnd()
    return result;
}

/**
 * Save an object to local storage
 */
export function saveLocalStorage(key, object) {
    console.group(`utils.js/saveLocalStorage`)
    console.log(`called for: ${key}`)
    console.dir(object)
    const jsonString = JSON.stringify(object);
    localStorage.setItem(key, jsonString);

    console.groupEnd()
}

/**
 * Read an object from local storage
 */
export function loadLocalStorage(key) {
    console.group(`utils.js/loadLocalStorage`)
    console.log(`called for: ${key}`)

    const obj = localStorage.getItem(key);
    console.dir(obj)

    console.groupEnd()
    if (obj) {
        return JSON.parse(obj);
    } else {
        return null;
    }
}
