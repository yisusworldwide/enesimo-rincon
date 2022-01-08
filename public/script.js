displayPerceptions();

function _(id) {
    return document.getElementById(id);
}

function sendData(variable){
    var s = document.getElementById(variable);
    getRs(s.value)
}   

function getRs(text) {
    // Insert
    addPerception(text);
    setTimeout(displayPerceptions, 1000);
}

function displayPerceptions() {
    axios.get('http://localhost:3000/perceptions').then((res) => {
        var rows = res.data
        console.log(rows)
        _('rs').innerHTML = '';
        for (var i = 0; i < rows.length; i++) {
            let txt = rows[i].text;
            const d = new Date(rows[i].created_at);
            _('rs').innerHTML += `<div class="card">${txt}</p>
            <small>${d.toLocaleTimeString()}, ${d.toLocaleDateString()}</small><div>`;
        }
    })
}

function addPerception(text) {
    let payload = { text: text };
    console.log('script ' + payload.text)
    let res = axios.post('http://localhost:3000/perceptions', payload);

    let data = res.data;
    console.log(data);
}

