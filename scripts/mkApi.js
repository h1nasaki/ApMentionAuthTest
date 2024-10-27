import { INSTANCE_URL, API_TOKEN } from './store.js';

// 内部ヘルパーメソッド
async function callApi(endpoint, body) {
    const url = `${INSTANCE_URL}/api/${endpoint}`;

    console.log(`callApi: url: ${url}`)
    // Add api key
    body.i = API_TOKEN

    console.log(body)

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}

export async function getMentions({ following = false, limit = 10, sinceId = null, untilId = null, visibility = null } = {}) {
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
            return data;
        })
        .catch(error => {
            console.error('Error fetching mentions:', error);
        });
}
