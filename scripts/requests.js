
function postData(url, data){
    return sendData('POST', url, data);
}

function putData(url, id, data){
    return sendData('PUT',`${url}/${id}`, data);
}

function sendData(method, url, data){
    return fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(response => response.json());
}

function deleteData(url, id){
    return fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json());
}