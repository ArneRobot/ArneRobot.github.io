
// om man trykker enter i input-feltet, kjører generer()
var input = document.getElementById('navn');
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("knapp").click();
    }
});

// funksjon som genererer et sitat (kjøres når knapp trykkes)
function generer() {
    document.getElementById('sitat').innerText='';

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
    // leter etter :tag: og bytter det ut med tilfeldig fra liste
    tid = tid.replace(/:offer:/g, offere[Math.floor(Math.random()*offere.length)]);
    tid = tid.replace(/:handling:/g, handlinger[Math.floor(Math.random()*handlinger.length)]);

    // velger kjønnet på personen og erstatter :kjoenn: med riktig pronomen
    try {
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
            
            // setter sammen setning
            let vits = navn + ' ' + handling + ' ' + offer + ' ' + tid;
                    
            // lager elementet som holder sitatet
            let sitat = document.createElement('p');
            sitat.innerText = '"' + vits + '"';
            sitat.style = 'color: #FEFFFF; ';
            sitat.id = 'sitatTekst';
            document.getElementById('sitat').appendChild(sitat);
            
            // lager "-Brian"
            let brian = document.createElement('p');
            brian.innerText = '-Brian';
            brian.style = 'text-align: right; margin-right: 1em;';
            document.getElementById('sitat').appendChild(brian);
        })
    } catch (error) {console.log(error)}
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