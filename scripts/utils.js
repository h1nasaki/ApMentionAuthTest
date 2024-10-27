/**
 * Generate random 4-byte key
 */
export function generateKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Save an object to local storage
 */
export function saveLocalStorage(key, object) {
    const jsonString = JSON.stringify(object);
    localStorage.setItem(key, jsonString); // Replace 'myData' with your desired key name
}

/**
 * Read an object from local storage
 */
export function loadLocalStorage(key) {
    const jsonString = localStorage.getItem(key);

    if (jsonString) {
        return JSON.parse(jsonString);
    } else {
        return null; // Return null if there's no data
    }
}
