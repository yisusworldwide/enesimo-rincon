displayPerceptions(); 

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
                    <p style="color:white">Percepción #${id}</p>
                    <button id="delete" class="delete" aria-label="delete" onclick="removeData(${id})"></button>
                </div>
                <div class="message-body">
                    <textarea class="form-control" type="text" id="txt" rows="3" name="update">${txt}</textarea>
                    <button class="btn btn-info" aria-label="update" onclick="updateData('txt')">Editar</button>
                    <div><small>${d.toLocaleString()}</small></div>
                </div>
            </article>
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


function addPerception(text) {
    let payload = { text: text };
    console.log('script ' + payload.text);
    let res = axios.post('http://localhost:3000/perceptions', payload);
    let data = res.data;
    console.log(data);
}

    function updatePerception(text, id) {
    let payload = { text: text }; //HTTP request body
    console.log('script ' + payload.text);
    let res = axios.put('http://localhost:3000/perceptions/' + id , payload); //using string concatenation
    let data = res.data;
    console.log(data);
}  
    
function removePerception(id) {
    let res = axios.delete('http://localhost:3000/perceptions/' + id);
    let data = res.data;
    console.log(data);
}

//IMPLEMENT ABOVE CREATED FUNCTIONS 'ADD', 'UPDATE', 'REMOVE'

function postData(id){
    let s = document.getElementById(id);
    addPerception(s.value);
    console.log(s.value);
    setTimeout(displayPerceptions, 1000);
    //we need "s.value = ''" to clear the previous text in the texarea
    console.log(s.value);
    s.value = ''
}

function updateData(id){
    let s = document.getElementById(id);
    console.log(s.value); //added to check if gets the "id"
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

$( ".inner-switch" ).on("click", function() {
    if( $( "body" ).hasClass( "dark" )) {
      $( "body" ).removeClass( "dark" );
      $( ".inner-switch" ).text( "🌙" );
    } else {
      $( "body" ).addClass( "dark" );
      $( ".inner-switch" ).text( "🔆" );
    }
});

//get to understand why does this work
document.getElementById('scrollToBottom').addEventListener('click', function() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
});  

// const button  = document.getElementById(update);
// button.addEventListener('click', function(e){
// console.log("Data updated!!");
// updateData(id);
// })