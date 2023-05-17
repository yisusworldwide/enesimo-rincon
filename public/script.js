displayPerceptions() 

function _(id) {
    return document.getElementById(id);
}

function displayPerceptions() {

    axios.get('http://localhost:3000/perceptions').then((res) => {

        var rows = res.data
        console.log(rows)
        _('rs').innerHTML = '';
        for (var i = 0; i < rows.length; i++) {
            let txt = rows[i].text;
            let id = rows[i].id;
            const d = new Date(rows[i].created_at);
            d.addHours(1)
            _('rs').innerHTML += `
            <article class="message">
            
            <div class="message-header">
                <p style='color:orange;'>Percepción #${id}</p>
                <button id="delete" class="delete" aria-label="delete" onclick="removeData(${id})"></button>
            </div>
            
            <div class="message-body">
                <textarea>${txt}</textarea>
                <button id="update" class="update" aria-label="update" onclick="updateData(${txt})">Edit</button>
                <div><small>${d.toLocaleString()}</small></div>
            </div>
            `;
            
        }

        
    })
}



/* <form id="for" action="/perceptions/:id" method="post">
<div class="message-body">
<textarea onchange="changeTextArea(this)" id="txt">${txt}</textarea>
<button id="txt" class="update" aria-label="update" onclick="updateData(${txt})">Editar Percepción</button>
<div><small>${d.toLocaleString()}</small></div>
</div>
</form> */

//"alert('Acabas de cambiar tus percepciones.')" 

/* <form action="/perceptions" method="post">
<label for="updatedText">${txt}</label>
<input type="text" name="updatedText" id="updatedText" value=""
</article>
<button>Submit</button>
</form> */

function addPerception(text) {
    let payload = { text: text };
    console.log('script ' + payload.text)
    let res = axios.post('http://localhost:3000/perceptions', payload);
    let data = res.data;
    console.log(data);
}

function updatePerception(text) {
    let payload = { text: text }; //HTTP request body
    console.log('script ' + payload.text)
    let res = axios.put('http://localhost:3000/perceptions/' + id , { "text": payload }); //using string concatenation
    let data = res.data.json;
    console.log(data);
}  
    
function removePerception(id) {
    let res = axios.delete('http://localhost:3000/perceptions/' + id);
    let data = res.data;
    console.log(data);
}

//IMPLEMENT ABOVE CREATED FUNCTIONS 'ADD', 'REMOVE', 'UPDATE'

function postData(id){
    let s = document.getElementById(id);
    addPerception(s.value);
    console.log(s.value);
    setTimeout(displayPerceptions, 1000);
    s.value = ''
}

function updateData(id){
    let s = document.getElementById(id);
    console.log(id); //added to check if gets the "id"
    updatePerception(s.value);
    console.log(s.value);
    setTimeout(displayPerceptions, 1000);
    s.value = ''
}
    
function removeData(id){
    removePerception(id);
    setTimeout(displayPerceptions, 1000);
}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

// const button  = document.getElementById(update);
// button.addEventListener('click', function(e){
// console.log("Data updated!!");
// updateData(id);
// })