
var input = document.getElementById('navn');
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("knapp").click();
    }
});

function generer() {
    document.getElementById('sitat').innerText='';

    let navn = document.getElementById('navn').value;
    if (navn == '' || /\d/.test(navn)) {
        document.getElementById('navn').value = '';
        document.getElementById('navn').placeholder = 'du må skrive inn et navn';
        return;
    }
    let handling = handlinger[Math.floor(Math.random()*handlinger.length)];
    let offer = offere[Math.floor(Math.random()*offere.length)];
    let tid = tider[Math.floor(Math.random()*tider.length)];
    tid = tid.replace(/:offer:/g, offere[Math.floor(Math.random()*offere.length)]);
    tid = tid.replace(/:handling:/g, handlinger[Math.floor(Math.random()*handlinger.length)]);

    let vits = navn + ' ' + handling + ' ' + offer + ' ' + tid;

    let sitat = document.createElement('p');
    sitat.innerText = '"' + vits + '"';
    sitat.style = 'color: #FEFFFF; ';
    document.getElementById('sitat').appendChild(sitat);
    let brian = document.createElement('p');
    brian.innerText = '-Brian';
    brian.style = 'text-align: right; margin-right: 1em;';
    document.getElementById('sitat').appendChild(brian);

}

function lagBilde() {
    let bilde = document.createElement('canvas');
    bilde.style.display = 'hidden';
}