function postData(urlTasks = '', data){
    return fetch(urlTasks, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    .then(response=>response.json());
}

function putData(url = '', id, data){
    return fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .catch(error => console.error(error));
}

function deleteData(url, id){
    return fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(response=>{
        response.json();
    });
}