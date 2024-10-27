import { INSTANCE_URL, API_TOKEN } from './store.js';

// 内部ヘルパーメソッド
async function callApi(endpoint, body) {
    console.group(`mkApi.js/callApi`)
    console.log(`called for: ${endpoint}`)

    const url = `${INSTANCE_URL}/api/${endpoint}`;
    body.i = API_TOKEN

    console.log(`url: ${url}`)
    console.dir(body)

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                console.endGroup()
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(`HTTP status: ${response.status}`)
            console.groupEnd()
            return response.json();
        })
        .catch(error => {
            console.error(error);
            console.groupEnd()
            throw error;
        });
}

export async function getMentions({ following = false, limit = 10, sinceId = null, untilId = null, visibility = null } = {}) {
    console.group(`mkApi.js/getMentions`)
    console.log(`called for: ${following}/${limit}/${sinceId}/${untilId}/${visibility}`)
    const endpoint = 'notes/mentions';
    const body = {
        following,
        limit,
        ...(sinceId && { sinceId }),
        ...(untilId && { untilId }),
        ...(visibility && { visibility })
    };

    return await callApi(endpoint, body)
        .then(data => {
            // console.log('Mentions:', data);
            console.groupEnd()
            return data;
        })
        .catch(error => {
            console.error('Error fetching mentions:', error);
            console.groupEnd()
        });
}
