import { registRequest, checkAuthState } from './scripts/auth.js'

const submitButton = document.getElementById('submitButton')
const checkButton = document.getElementById('checkButton')
const codeText = document.getElementById('code')
const stateText = document.getElementById('state')
const unameInput = document.getElementById('usernameInput')

function getUnameInputValue() {
    if (unameInput.value === "") {
        alert('required!')
    }

    return unameInput.value
}

submitButton.addEventListener('click', () => {

    const uname = getUnameInputValue()

    const key = registRequest(uname)

    codeText.innerText = `Your Key: ${key}`
})

checkButton.addEventListener('click', () => {
    const uname = getUnameInputValue()

    checkAuthState(uname).then((res) => stateText.innerText = res)
})
