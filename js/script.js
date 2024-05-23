// Controllo il disposivo sia touch o con mouse
const clickOrTouch = isTouchDevice() === true ? 'touchstart' : 'click';

// Caricamento brani
const backgroundMusic = new Audio('./assets/sounds/track.mp3');
const gameOverSound = new Audio('./assets/sounds/GameOver.wav');
const objCompletedSound = new Audio('./assets/sounds/obj.wav');

backgroundMusic.loop = true;
backgroundMusic.volume = 0.12;
objCompletedSound.volume = 0.8;
gameOverSound.volume = 0.5;

// Creazione Elementi

// -- Titolo
var titoloElement = createElement("h1", null, "titolo", "ARRIVACI!");
// -- Counter
const counterElement = createElement("div", null, "counter", null);
var startIcon = createElement("span", "start", "material-symbols-outlined", "play_circle");
counterElement.appendChild(startIcon);

// -- Tutorial
const tutorialDiv = createElement("div", null, "tutorial", null);
const tutorial_ul = createElement("ul", null, null, null);

const tutorial_li_Regole = createElement("li", null, "regole", "REGOLE:");
const tutorial_li1 = createElement("li", null, null, 'Questi sono i tuoi punti attuali <div class="counter">3</div>');
const tutorial_li2 = createElement("li", null, null, 'Questi sono gli obbiettivi da raggiungere <div class="obj">6</div>');
const tutorial_li3 = createElement("li", null, null, 'Raggiuni gli obbiettivi entro il tempo limite');
tutorial_ul.appendChild(tutorial_li_Regole);
tutorial_ul.appendChild(tutorial_li1);
tutorial_ul.appendChild(tutorial_li2);
tutorial_ul.appendChild(tutorial_li3);

// -- Finestra GameOver
const gameOverDiv = createElement("div", null, "gameover", null);
gameOverDiv.style = "top: -1000px";
gameOverDiv.appendChild(createElement("span", "close", "material-symbols-outlined", "close"));
gameOverDiv.appendChild(createElement("h1", null, null, "GAME OVER!"));
const puntiTotalizzatiElement = createElement("h4", null, null, "")
gameOverDiv.appendChild(puntiTotalizzatiElement);

if (clickOrTouch === "click") {
    const tutorial_li3 = createElement("li", null, null, null);
    tutorial_li3.appendChild(createElement("h4", null, null, "Per giocare utilizzando il Mouse:"));

    const tutorial_li8 = createElement("li", null, null, null);
    tutorial_li8.appendChild(createElement("h4", null, null, "Per giocare utilizzando la Tastiera:"));

    tutorial_ul.appendChild(tutorial_li3);
    tutorial_ul.appendChild(createElement("li", null, null, '<b>Click Destro</b> per Aumentare Punti'));
    tutorial_ul.appendChild(createElement("li", null, null, '<b>Click Sinistro</b> per Diminuire'));
    tutorial_ul.appendChild(createElement("li", null, null, '<b>Rotella Sù</b> per Aumentare Punti'));
    tutorial_ul.appendChild(createElement("li", null, null, '<b>Rotella Giù</b> per Diminuire Punti'));
    tutorial_ul.appendChild(tutorial_li8);
    tutorial_ul.appendChild(createElement("li", null, null, '<b>Tasto "+" </b> per Aumentare Punti'));
    tutorial_ul.appendChild(createElement("li", null, null, '<b>Tasto "-"</b> per Diminuire Punti'));

} else {
    const tutorial_li3 = createElement("li", null, null, null);
    tutorial_li3.appendChild(createElement("h4", null, null, "Per giocare:"));

    tutorial_ul.appendChild(tutorial_li3);
    tutorial_ul.appendChild(createElement("li", null, null, '<b>Tocca la meta Sinistra</b> per Diminuire Punti'));
    tutorial_ul.appendChild(createElement("li", null, null, '<b>Tocca la meta Destra</b> per Aumentare Punti'));
}
tutorialDiv.appendChild(tutorial_ul);


// -- Nav
const navElement = createElement("nav", null, null, null);
navElement.style = "top: -150px;";

const divElement = createElement("div", null, null, null);
const ulElement = createElement("ul", null, "comandi", null);

const li_PlayStopElement = createElement("li", "PlayStop", null, null);
li_PlayStopElement.appendChild(createElement("span", null, "material-symbols-outlined", "pause"));
ulElement.appendChild(li_PlayStopElement);

const li_ResetElement = createElement("li", "reset", null, null);
li_ResetElement.appendChild(createElement("span", null, "material-symbols-outlined", "restart_alt"));
ulElement.appendChild(li_ResetElement);
divElement.appendChild(ulElement);

const div_PunteggioElement = createElement("div", null, "punteggio", null);
const progressElement = createElement("progress", null, null, null);
progressElement.max = "100";
progressElement.value = "0";
const divLivelloElement = createElement("div", "livello", null, "1");
div_PunteggioElement.appendChild(divLivelloElement);
div_PunteggioElement.appendChild(progressElement);
const divPuntiElement = createElement("div", "punti", null, "0");
div_PunteggioElement.appendChild(divPuntiElement);
divElement.appendChild(div_PunteggioElement);
navElement.appendChild(divElement);

const divWrapper = createElement("div", null, "wrapper", null);
divWrapper.appendChild(gameOverDiv);
divWrapper.appendChild(navElement);

divWrapper.appendChild(titoloElement);
divWrapper.appendChild(counterElement);
divWrapper.appendChild(tutorialDiv);
document.body.appendChild(divWrapper);

// Ottengo le posizione degli elementi che mi serve per evitare che gli obbiettivi che si generano casualmente si sovrappongono al counter ed alla nav
var counterPosition = counterElement.getBoundingClientRect();
var navPosition = navElement.children[0].getBoundingClientRect();
var obbiettivi = []; //Vettore contenente gli obbiettivi
// Variabili per Gestione Timer
let tempo = 0; // Tiene traccia dei secondi totali al fine di calcolare i punti
let seconds = 15;
let intervalId;
let isPaused = false;

divWrapper.addEventListener(clickOrTouch, function (e) {
    if (e.target.id === "start") {
        // Avvia il brano di sottofondo
        backgroundMusic.play();
        startEvent(e);
        return;
    }

    if (e.target.parentElement.id === "PlayStop") {

        removesEventListener();
        pauseTimer();
        if (intervalID === null) {
            addsEventListener();
            startTimer();
            intervalID = setInterval(createObbiettivo, difficoltaTempo());
            e.target.innerText = "pause";
            return;
        }
        clearInterval(intervalID);
        intervalID = null;
        e.target.innerText = "play_arrow";
        return;
    }

    if (e.target.parentElement.id === "reset") {
        resetEvent();
        return;
    }
    if (e.target.id === "close") {
        hideGameOver();
        return;
    }

});

// Gestione Inizio del gioco
function startEvent(e) {
    e.target.classList.add("hide");
    tutorialDiv.remove();
    startTimer();

    setTimeout(() => {
        counterElement.textContent = "0";
        intervalID = setInterval(createObbiettivo, difficoltaTempo());
        bindingEventListener();
    }, 700);

    navElement.style = "top: 0px;";
    li_PlayStopElement.firstChild.innerText = "pause";
}
// Gestione del reset gioco
function resetEvent() {
    backgroundMusic.pause(); // Stoppo musica
    removesEventListener(); // Rimuovo gli EventListener
    stopTimer(); // Fermo Timer
    titoloElement.textContent = "ARRIVACI!"; // Riscrivo il titolo
    divPuntiElement.textContent = "0"; // Azzero il counter
    clearInterval(intervalID); // Pulisco e azzerro l'intervalID
    intervalID = null;
    divLivelloElement.textContent = "1"; // Risetto il livello a 1
    progressElement.value = 0; // Azzero Progress Bar

    removeAllObject(); // Rimuovo tutti gli obbietti

    startIcon.classList = "material-symbols-outlined"; // Resetto il bottone Start del counter
    counterElement.innerText = "";
    counterElement.appendChild(startIcon);

    navElement.style = "top: -150px;"; // Nascondo la navbar
}
// Rimuove tutti gli obbiettivi
function removeAllObject() {
    document.querySelectorAll(".obj").forEach(function (element) { //
        element.remove();
    });
    obbiettivi = [];
}

// GESTIONE TIMER
function pad(number, length) {
    const str = String(number);
    return '0'.repeat(length - str.length) + str;
}

function updateTimerDisplay() { // Agiorna il timer
    const formattedTime = `${pad(seconds, 2)}`;
    titoloElement.textContent = `${formattedTime}`;
}

function startTimer() {
    isPaused = false; // Reset paused state
    clearInterval(intervalId); // Clear any existing interval
    intervalId = setInterval(() => {
        if (!isPaused) { // Se non è in stato Pausa, aumento i secondi
            tempo++;
            seconds--;
            if (seconds === 0) {
                showGameOver();
            }
        }
        updateTimerDisplay();
    }, 1000); // Update every second
}

function stopTimer() {
    clearInterval(intervalId);
    seconds = 15;
    updateTimerDisplay();
}

function pauseTimer() {
    isPaused = true;
}
function resumeTimer() {
    isPaused = false;
}

function resetTimer() {
    tempo = 0;
    seconds = 15;
    isPaused = false; // Reset paused state

    clearInterval(intervalId);
    updateTimerDisplay();
    startTimer();
}
// END GESTIONE TIMER


// Gestione Creazione Obbiettivi
function createObbiettivo() {
    // Creo elemento Obbiettivo
    let obj_element = createElement("div", null, "obj " + (obbiettivi.length + 1), null);
    let divX = 0;  // Posizione asse X Obbiettivo
    let divY = 0;  // Pos. asse y Obbiettivo

    counterPosition = counterElement.getBoundingClientRect(); // Ottengo la posizione Counter
    navPosition = navElement.children[0].getBoundingClientRect(); // Ottengo la posizione nav

    // genero una posizione casuale per li obbiettibi che non si sovrappone ad altri elementi
    while (true) {
        // Genero random la possibile posizione obbiettivo
        divX = Math.random() * (window.innerWidth - 60);
        divY = Math.random() * (window.innerHeight - 60);

        // Controllo che la posizione non deve coprire il counter e la navbar
        if (controlloPosizioneObbiettivo(divX, divY, counterPosition, navPosition)) break;
    }
    // Se Ok, assegno posizione
    obj_element.style.left = divX + "px";
    obj_element.style.top = divY + "px";
    // Genero un numuro causale da assegnare all'obbiettivo
    obj_element.textContent = generaNumeroCasuale((parseInt(counterElement.textContent) - 10), (parseInt(counterElement.textContent) + 10))

    obbiettivi.push(obj_element);
    divWrapper.appendChild(obj_element);
}

function controlloPosizioneObbiettivo(divX, divY, counterPosition, navPosition) {
    if (controlloPosizioneCounter(divX, divY, counterPosition) &&
        controlloPosizioneNav(divX, divY, navPosition)) {
        return true; // Posizione Ok, non copre counter e navbar
    }
    return false;
}
function controlloPosizioneCounter(divX, divY, counterPosition) {
    if (((divX + 60) < counterPosition.left || (divX + 60) > counterPosition.right) &&
        ((divY + 60) < counterPosition.top || (divY + 60) > counterPosition.bottom)) {
        return true; // l'obbiettivo non copre il counter
    }
    return false;
}
function controlloPosizioneNav(divX, divY, navPosition) {
    if (((divX + 60) < navPosition.left || (divX + 60) > navPosition.right) &&
        ((divY + 60) < navPosition.top || (divY + 60) > navPosition.bottom)) {
        return true; // l'obbiettivo non copre la navbar
    }
    return false;
}

function generaNumeroCasuale(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// END - Gestione Creazione Obbiettivi


// Gestione dell'obbiettivo, controllo se è stato raggiunto; n = valore counter
function controlloObbiettivo(n) {
    if (obbiettivi.length < 1) { return; } // se non ci sono obbiettivo esco

    if (parseInt(obbiettivi[0].textContent) === n) { // Se Obbiettivo raggiunto
        objCompletedSound.play(); // riproduco suono 

        divPuntiElement.textContent = calcoloPunti(); // Assegno punti
        resetTimer();

        divWrapper.removeChild(obbiettivi[0]); // Rimuovo l'obbiettivo raggiunto
        obbiettivi.shift();

        progressElement.value = parseInt(progressElement.value) + 10; // Aumento progressione livello
        if (parseInt(progressElement.value) === 100) { aumentaLivello(); } // se progress bar è all 100%, aumento il livello
    }
}
function calcoloPunti() {
    const liv = parseInt(divLivelloElement.textContent);
    const punt = parseInt(divPuntiElement.textContent);
    return parseInt(punt + 100 - (tempo * liv * 0.6) / (0.2 * liv));
}
function aumentaLivello() {
    progressElement.value = 0;
    divLivelloElement.textContent = parseInt(divLivelloElement.textContent) + 1;

    clearInterval(intervalID);
    intervalID = setInterval(createObbiettivo, difficoltaTempo());
}

// Gestione dell'intervallo della creazione degli obbiettivi in base al livello 
function difficoltaTempo() {
    const lvl = parseInt(divLivelloElement.textContent);
    if (lvl === 1) { return 3000; }
    return 3000 - (lvl * 225);
}
// End Gestione Obbiettivi



// Gestione GameOver
function showGameOver() {
    gameOverSound.play();
    puntiTotalizzatiElement.textContent = `Hai totalizzato ${divPuntiElement.textContent} punti`;
    gameOverDiv.style = "";
    gameOverDiv.classList.remove('hide');
    gameOverDiv.classList.add('show');
    resetEvent();
}
function hideGameOver() {
    gameOverDiv.classList.add('hide');
    gameOverDiv.style = "top: -1000px";

    gameOverDiv.addEventListener('transitionend', function () {
        gameOverDiv.classList.remove('show', 'hide');
    }, { once: true });

    resetEvent();
}
// END Gestione GameOVer


// -----------------------------
function createElement(tag, id, className, content) {
    const el = document.createElement(tag);
    if (id !== null) { el.id = id; }
    if (className !== null) { el.className = className; }
    if (content !== null) { el.innerHTML = content }
    return el;
}


// Verifica se il dispositivo supporta il touch
function isTouchDevice() {
    // Controlla se l'evento ontouchstart è presente in windows
    // significa che il dispositivo ha il touchscreen
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}


// Funzione cappello per estione bindingEvent
function bindingEventListener() {
    // Aggiungi un listener per l'evento touch solo se il dispositivo è touchscreen
    removesEventListener();
    addsEventListener();
}

// Rimozione degli event listener
function removesEventListener() {
    if (isTouchDevice()) {
        document.removeEventListener('touchstart', binding_Touch);
    } else {
        document.removeEventListener("keydown", binding_keydown);
        document.removeEventListener("click", biding_clickLeftMouse);
        document.removeEventListener("contextmenu", biding_clickRightMouse);
        document.removeEventListener("wheel", binding_wheel);
    }
}

// Aggiunta degli event listener
function addsEventListener() {
    if (isTouchDevice()) {
        removesEventListener()
        document.addEventListener('touchstart', binding_Touch);
    } else {
        removesEventListener()
        document.addEventListener("keydown", binding_keydown);
        document.addEventListener("click", biding_clickLeftMouse);
        document.addEventListener("contextmenu", biding_clickRightMouse);
        document.addEventListener("wheel", binding_wheel);
    }
}

// Funzioni agganciate ai singoli tipi di Binding 
function binding_Touch(e) { // Dispositivi Touch
    // Controllo non scatti l'aumento di punti se tocco un bottone.
    if (e.target.classList[0] !== 'wrapper') { return; }
    if (isNaN(parseInt(counterElement.textContent))) { return; }

    // Ottieni le coordinate del tocco rispetto allo schermo
    var touchX = e.touches[0].clientX;
    // Ottieni la larghezza dello schermo
    var screenWidth = window.innerWidth;
    // Calcola la metà dello schermo
    var halfScreenWidth = screenWidth / 2;
    // Determina se il tocco è sulla parte sinistra o destra dello schermo
    touchX < halfScreenWidth ? minusFunction() : addFunction();
}

function binding_keydown(e) {
    e.key === "+" ? addFunction() : null;
    e.key === "-" ? minusFunction() : null;
}

function biding_clickLeftMouse(e) {

    if (e.target.classList[0] === 'wrapper' && e.button === 0) {
        minusFunction();
    }
}

function biding_clickRightMouse(e) {
    e.preventDefault(); // Prevenire il menu contestuale

    if (e.target.classList[0] !== 'wrapper') { return; }
    addFunction();
}
function binding_wheel(e) {
    e.deltaY < 0 ? addFunction() : minusFunction();
}
// END Gestione Funzione agganciate ai singoli event

// Gestione aumento e diminuzione punti
function addFunction() {
    if (!isNaN(Number(counterElement.textContent))) {
        counterElement.textContent = parseInt(counterElement.textContent) + 1;
        controlloObbiettivo(parseInt(counterElement.textContent));
    }
}

function minusFunction() {
    if (!isNaN(Number(counterElement.textContent))) {
        counterElement.textContent = parseInt(counterElement.textContent) - 1;
        controlloObbiettivo(parseInt(counterElement.textContent));
    }
}
