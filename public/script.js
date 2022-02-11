document.addEventListener('DOMContentLoaded', () => {
    
        displayPerceptions();
    });  

        function _(id) {
            return document.getElementById(id);
        }
        
        function postData(variable){
            var s = document.getElementById(variable);
            addPerception(s.value);
            setTimeout(displayPerceptions, 1000);
            s.value = ''
        }
        
        function removeData(id){
            removePerception(id);
            setTimeout(displayPerceptions, 1000);
        }
        
        function updateData(variable){
            var s = document.getElementById(variable);
            updatePerception(s.value);
            setTimeout(displayPerceptions, 1000);
            s.value = ''
        }
        
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
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
                        <p style='color:white;'>Percepción #${id}</p>
                        <button class="delete" aria-label="delete" onclick="removeData(${id})"></button>
                        <button class="update" aria-label="update" onclick="updateData(${id})"></button>
                    </div>
                    <div class="message-body">
                    <div>${txt}</div>
                    <div><small>${d.toLocaleString()}</small></div>
                    </div>
                    </article>
                    `;
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
        
        function removePerception(id) {
            let res = axios.delete('http://localhost:3000/perceptions/' + id);
            let data = res.data;
            console.log(data);
        }
        
        
        function updatePerception(text) {
            let payload = { text: text };
            console.log('script ' + payload.text)
            let res = axios.put('http://localhost:3000/perceptions/', payload);
            let data = res.data;
            console.log(data);
        }
        
     
    // }, false);


// function initPage() {}
// window.addEventListener("load", initPage, false);