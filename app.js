
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
        if ((tid+handling).includes(':kjoenn:')) {// å finne riktig pronomen tar en del tid, så om man ikke trenger det, kjører funksjonen uten å
            let pronomen;
            for (let i = 0; i < navnArray.length; i++) {
                if (navnArray[i][0] == navn) {
                    pronomen = navnArray[i][1];
                    tid = tid.replace(/:kjoenn:/g, pronomen);
                    handling = handling.replace(/:kjoenn:/g, pronomen);
                    printSitat(navn, handling, offer, tid);
                    return
                }
            }

            knappId.disabled = true;
            fetch('https://api.genderize.io?name='+navn)
            .then(response => response.json())
            .then(data => {
                if (data.gender == 'female') {
                    pronomen = 'hun';
                } else if (data.gender == 'male') {
                    pronomen = 'han';
                } else {
                    pronomen = 'de';
                    document.querySelector('.switch').style = 'display: initial;';
                }
                tid = tid.replace(/:kjoenn:/g, pronomen);
                handling = handling.replace(/:kjoenn:/g, pronomen);
                
                printSitat(navn, handling, offer, tid);
                
            })
            knappId.disabled = false;

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

let modeArray = ['images/darkMode.png', 'dark', 'light', 'images/lightMode.png']
var count = 0

function darkMode() {
    var mode = modeArray[1];
    var element = document.body;
    element.classList.toggle("dark-mode");
    document.getElementById('modeBilde').src = modeArray[0];
    modeArray.reverse();
    //Disco-mode aktiveres hvis brukeren trykker på Dark-Mode knapped 12 ganger innen 3.3s
    if (count == 0) {
        timer = setTimeout(countAlert, 3300);
    }
    count ++ ;
    if (count == 12) {
        console.log("Disco mode startet.")
        count = 0
        document.getElementById("confetti").className="confettiOn"
        document.getElementById("discoballL").className="discoballLOn"
        document.getElementById("discoballR").className="discoballROn"
        document.getElementById("lightRave").className="lightRaveOn"
        document.body.classList.add("bodyDiscoMode");
        timerOff = setTimeout(countAlert2, 7300)
        clearTimeout(timer)
    }
    function countAlert() {
        console.log("Disco mode startet ikke, over 5 sekunder")
        count = 0
    }
    function countAlert2() {
        document.getElementById("confetti").className="confettiOff"
        document.getElementById("discoballL").className="discoballLOff"
        document.getElementById("discoballR").className="discoballROff"
        document.getElementById("lightRave").className="lightRaveOff"
        document.body.classList.remove("bodyDiscoMode");
        if (mode == 'dark') {
            document.body.classList.add('dark-mode');
        }
        else {
            document.body.classList.remove('darkmode');
        }
    }
}