
const sitatId = document.getElementById('sitat');
const knappId = document.getElementById('knapp');

// om man trykker enter i input-feltet, kjører generer()
var input = document.getElementById('navn');
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        knappId.click();
    }
});

// funksjon som genererer et sitat (kjøres når knapp trykkes)
function generer() {
    sitatId.innerText='';

    let navn = document.getElementById('navn').value;
    // sjekker om inputfeltet er tomt eller inneholder tall
    if (navn == '' || /\d/.test(navn)) {
        document.getElementById('navn').value = '';
        document.getElementById('navn').placeholder = 'du må skrive inn et navn';
        return;
    }
    navn = capitalize(navn);
    // velger tilfeldige elementer fra listene
    let handling = handlinger[Math.floor(Math.random()*handlinger.length)];
    let offer = offere[Math.floor(Math.random()*offere.length)];
    let tid = tider[Math.floor(Math.random()*tider.length)];

    // velger kjønnet på personen og erstatter :kjoenn: med riktig pronomen
    try {
        // å finne riktig pronomen tar en del tid, så om man ikke trenger det, kjører funksjonen uten å
        if ((tid+handling).includes(':kjoenn:')) {
            knappId.disabled = true;
            fetch('https://api.genderize.io?name='+navn)
        .then(response => response.json())
        .then(data => {
            let pronomen;
            if (data['gender'] == 'female') {
                pronomen = 'hun';
            } else if (data['gender'] == 'male') {
                pronomen = 'han';
            } else {
                pronomen = 'de';
            }
            tid = tid.replace(/:kjoenn:/g, pronomen);
            handling = handling.replace(/:kjoenn:/g, pronomen);
            
            printSitat(navn, handling, offer, tid);
            
            knappId.disabled = false;
        })

        } else {
            printSitat(navn, handling, offer, tid);
        }
        
    } catch (error) {console.log(error)}

}

function printSitat(navn, handling, offer, tid) {
    // setter sammen setning
    let vits = navn + ' ' + handling + ' ' + offer + ' ' + tid;
    
    // leter etter :tag: og bytter det ut med tilfeldig fra liste
    vits = vits.replace(/:offer:/g, offere[Math.floor(Math.random()*offere.length)]);
    vits = vits.replace(/:handling:/g, handlinger[Math.floor(Math.random()*handlinger.length)]);

    // endrer melding-variabelet fra del.js til vitsen slik at sitatet blir med om man deler siden
    melding = vits + '%0a-Brian';
                    
    // lager elementet som holder sitatet
    let sitat = document.createElement('p');
    sitat.innerText = '"' + vits + '"';
    sitat.style = 'color: #FEFFFF; ';
    sitat.id = 'sitatTekst';
    sitatId.appendChild(sitat);
    
    // lager "-Brian"
    let brian = document.createElement('p');
    brian.innerText = '-Brian';
    brian.style = 'text-align: right; margin-right: 1em;';
    sitatId.appendChild(brian);
}

// tar inn en setning (navn) og gjør forbokstaven av hvert ord stort
function capitalize(navn) {
    navn = navn.toLowerCase();
    navn = navn.split(' ');
    for (let i = 0; i < navn.length; i++) {
        navn[i] = navn[i][0].toUpperCase() + navn[i].substr(1);
    }
    navn = navn.join(' ');
    return navn;
}