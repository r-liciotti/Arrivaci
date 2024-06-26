//
// FILE DEPRECATO
//
// Controllo il disposivo sia touch o con mouse
const clickOrTouch = isTouchDevice() === true ? 'touchstart' : 'click'

// Caricamento brani
const backgroundMusic = new Audio('./sounds/track.mp3');
const gameoverMusic = new Audio('./sounds/GameOver.wav');
const buttonMusic = new Audio('./sounds/obj.wav');

backgroundMusic.loop = true;
backgroundMusic.volume = 0.12;
buttonMusic.volume = 0.8;
gameoverMusic.volume = 0.5;

// Creazione elementi DOM
// Titolo
const titoloElement = document.querySelector(".titolo");

// Counter
const body = document.querySelector("body");
const counterElement = document.createElement("div");
counterElement.classList = "counter";
var startIcon = document.createElement("span");
startIcon.id = "start";
startIcon.classList = "material-symbols-outlined";
startIcon.innerText = "play_circle";

counterElement.appendChild(startIcon);

// Tutorial
const tutorialDiv = document.createElement('div');
tutorialDiv.classList.add('tutorial');

const tutrial_ul = document.createElement('ul');

const tutrial_li_Regole = document.createElement('li');
tutrial_li_Regole.innerHTML = 'REGOLE:';
tutrial_li_Regole.classList = "regole"

const tutrial_li1 = document.createElement('li');
tutrial_li1.innerHTML = 'Questi sono i tuoi punti attuali <div class="counter">3</div>';
const tutrial_li2 = document.createElement('li');
tutrial_li2.innerHTML = 'Questi sono gli obbiettivi da raggiungere <div class="obj">6</div>';
const tutrial_li3 = document.createElement('li');
tutrial_li3.innerHTML = 'Raggiuni gli obbiettivi entro il tempo limite';
tutrial_ul.appendChild(tutrial_li_Regole);
tutrial_ul.appendChild(tutrial_li1);
tutrial_ul.appendChild(tutrial_li2);
tutrial_ul.appendChild(tutrial_li3);


// Creazione finestra GameOver
const gameOverDiv = document.createElement('div');
gameOverDiv.className = 'gameover';
gameOverDiv.style = "top: -1000px";
const closeButton = document.createElement('span');
closeButton.id = 'close';
closeButton.className = 'material-symbols-outlined';
closeButton.textContent = 'close';
closeButton.addEventListener('click', hideGameOver);

const gameOverTitle = document.createElement('h1');
gameOverTitle.textContent = 'GAME OVER!';

const gameOverPoints = document.createElement('h4');
gameOverPoints.textContent = 'Hai totalizzato 234 punti!';

// Append degli elementi alla div gameover
gameOverDiv.appendChild(closeButton);
gameOverDiv.appendChild(gameOverTitle);
gameOverDiv.appendChild(gameOverPoints);
body.appendChild(gameOverDiv);

//  Creazione elementi tutorial distinzione tra mobile e desktop
if (clickOrTouch === "click") {
    const tutrial_li3 = document.createElement('li');
    const tutrial_h4_1 = document.createElement('h4');
    tutrial_h4_1.textContent = 'Per giocare utilizzando il Mouse:';
    tutrial_li3.appendChild(tutrial_h4_1);

    const tutrial_li4 = document.createElement('li');
    tutrial_li4.innerHTML = '<b>Click Destro</b> per Aumentare Punti';

    const tutrial_li5 = document.createElement('li');
    tutrial_li5.innerHTML = '<b>Click Sinistro</b> per Diminuire';

    const tutrial_li6 = document.createElement('li');
    tutrial_li6.innerHTML = '<b>Rotella Sù</b> per Aumentare Punti';

    const tutrial_li7 = document.createElement('li');
    tutrial_li7.innerHTML = '<b>Rotella Giù</b> per Diminuire Punti';

    const tutrial_li8 = document.createElement('li');
    const tutrial_h4_2 = document.createElement('h4');
    tutrial_h4_2.textContent = 'Per giocare utilizzando la Tastiera:';
    tutrial_li8.appendChild(tutrial_h4_2);

    const tutrial_li9 = document.createElement('li');
    tutrial_li9.innerHTML = '<b>Tasto "+" </b> per Aumentare Punti';

    const tutrial_li10 = document.createElement('li');
    tutrial_li10.innerHTML = '<b>Tasto "-"</b> per Diminuire Punti';
    tutrial_ul.appendChild(tutrial_li3);
    tutrial_ul.appendChild(tutrial_li4);
    tutrial_ul.appendChild(tutrial_li5);
    tutrial_ul.appendChild(tutrial_li6);
    tutrial_ul.appendChild(tutrial_li7);
    tutrial_ul.appendChild(tutrial_li8);
    tutrial_ul.appendChild(tutrial_li9);
    tutrial_ul.appendChild(tutrial_li10);
} else {

    const tutrial_li3 = document.createElement('li');
    const tutrial_h4_1 = document.createElement('h4');
    tutrial_h4_1.textContent = 'Per giocare:';
    tutrial_li3.appendChild(tutrial_h4_1);

    const tutrial_li4 = document.createElement('li');
    tutrial_li4.innerHTML = '<b>Tocca la meta Sinistra</b> per Diminuire Punti';
    const tutrial_li5 = document.createElement('li');
    tutrial_li5.innerHTML = '<b>Tocca la meta Destra</b> per Aumentare Punti';
    tutrial_ul.appendChild(tutrial_li3);
    tutrial_ul.appendChild(tutrial_li4);
    tutrial_ul.appendChild(tutrial_li5);
}
tutorialDiv.appendChild(tutrial_ul);

// Nav
const navElement = document.createElement("nav");
const divElement = document.createElement("div");
const ulElement = document.createElement("ul");
ulElement.classList = "comandi";

const li_PlayStopElement = document.createElement("li");
const iconPause = document.createElement("span");
iconPause.classList = "material-symbols-outlined";
iconPause.innerText = "pause";
li_PlayStopElement.id = "PlayStop";
li_PlayStopElement.appendChild(iconPause);
ulElement.appendChild(li_PlayStopElement);


const li_ResetElement = document.createElement("li");
const iconRestart = document.createElement("span");
iconRestart.classList = "material-symbols-outlined";
iconRestart.innerText = "restart_alt";
li_ResetElement.id = "reset";
li_ResetElement.appendChild(iconRestart);
ulElement.appendChild(li_ResetElement);
divElement.appendChild(ulElement);

const div_PunteggioElement = document.createElement("div");
const div_livelloElement = document.createElement("div");
const progressElement = document.createElement("progress");
div_PunteggioElement.classList = "punteggio";
div_livelloElement.id = "livello";
div_livelloElement.innerText = "1";
progressElement.max = "100";
progressElement.value = "0";
const puntiElement = document.createElement("div");
puntiElement.id = "punti";
puntiElement.textContent = "0";

div_PunteggioElement.appendChild(div_livelloElement);
div_PunteggioElement.appendChild(progressElement);
div_PunteggioElement.appendChild(puntiElement);

divElement.appendChild(div_PunteggioElement);
navElement.appendChild(divElement);

body.appendChild(navElement);
body.appendChild(counterElement);
body.appendChild(tutorialDiv);

navElement.style = "top: -150px;";




var intervalID = null; // Variabile per gestire il tempo della comparizione degli obbiettivi

// Binding per lo start del gioco
startIcon.addEventListener(clickOrTouch, function (e) {
    // Avvia il brano di sottofondo
    backgroundMusic.play();

    startEvent(e);
});

// Binding per lo pause e play secondari del gioco
li_PlayStopElement.addEventListener(clickOrTouch, function (e) {
    removesEventListener();
    pauseTimer();
    if (intervalID === null) {
        addsEventListener();
        startTimer();
        intervalID = setInterval(createObbiettivo, difficoltaTempo());
        e.currentTarget.firstChild.innerText = "pause";
        return;
    }
    clearInterval(intervalID);
    intervalID = null;
    e.currentTarget.firstChild.innerText = "play_arrow";

});

// Binding del reset
li_ResetElement.addEventListener(clickOrTouch, function (e) {
    resetEvent();
});

// Ottengo le posizione degli elementi che mi serve per evitare che gli obbiettivi che si generano casualmente si sovrappongono al counter ed alla nav
var counterPosition = counterElement.getBoundingClientRect();
var navPosition = navElement.children[0].getBoundingClientRect();

var obbiettivi = []; //Vettore contenente gli obbiettivi

// Creazione e gestione del timer
let tempo = 0;
let seconds = 15;
let intervalId;
let isPaused = false;

// Funzione gestione timer
function pad(number, length) {
    const str = String(number);
    return '0'.repeat(length - str.length) + str;
}

function updateTimerDisplay() {
    const timerElement = document.querySelector('.titolo');
    const formattedTime = `${pad(seconds, 2)}`;
    titoloElement.textContent = `${formattedTime}`;
}

function startTimer() {
    clearInterval(intervalId); // Clear any existing interval
    isPaused = false; // Reset paused state
    intervalId = setInterval(() => {
        if (!isPaused) {
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
    clearInterval(intervalId);
    tempo = 0;
    seconds = 15;
    updateTimerDisplay();
    isPaused = false; // Reset paused state
    startTimer();
}
// END Gestione Timer 


// Creazione obbiettivo
function createObbiettivo() {
    //Creo elemento
    let divX = 0;
    let divY = 0;
    let obj_element = document.createElement("div");
    obj_element.classList = "obj " + (obbiettivi.length + 1);

    counterPosition = counterElement.getBoundingClientRect();
    navPosition = navElement.children[0].getBoundingClientRect();
    
    // genero una posizione casuale che non si sovrappone ad altri elementi
    while (true) {
        divX = Math.random() * (window.innerWidth - 60);
        divY = Math.random() * (window.innerHeight - 60);

        if ((((divX + 60) < counterPosition.left || (divX + 60) > counterPosition.right) &&
            ((divY + 60) < counterPosition.top || (divY + 60) > counterPosition.bottom)) &&
            (((divX + 60) < navPosition.left || (divX + 60) > navPosition.right) &&
                ((divY + 60) < navPosition.top || (divY + 60) > navPosition.bottom))) {
 
            break; // Exit the loop when a suitable position is found
        }
    }

    obj_element.style.left = divX + "px";
    obj_element.style.top = divY + "px";
    obj_element.textContent = generaNumeroCasuale((parseInt(counterElement.textContent) - 10), (parseInt(counterElement.textContent) + 10))

    obbiettivi.push(obj_element);
    body.appendChild(obj_element);
}
// END - createObbiettivo()


function generaNumeroCasuale(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gestione dell'obbiettivo, se è stato raggiunto
function controlloObbiettivo(n) {

    if (obbiettivi.length < 1) { return; }

    if (parseInt(obbiettivi[0].textContent) === n) {
        buttonMusic.play();
        const liv = parseInt(div_livelloElement.textContent);
        const punt = parseInt(puntiElement.textContent);
        //console.log(`${punt} + 100 - (${tempo} * ${liv}) / (0.2 * ${liv})`);
        puntiElement.textContent = parseInt(punt + 100 - (tempo * liv * 0.6) / (0.2 * liv)); // Formula per calcolo dei punti
        resetTimer();

        body.removeChild(obbiettivi[0]);
        obbiettivi.shift();
        progressElement.value = parseInt(progressElement.value) + 10; // Aumento progressione livello

        if (parseInt(progressElement.value) === 100) {
            progressElement.value = 0;
            div_livelloElement.textContent = parseInt(div_livelloElement.textContent) + 1;

            clearInterval(intervalID);
            intervalID = setInterval(createObbiettivo, difficoltaTempo());
        }
    }
}
// End Gestione Obbiettivi

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
    backgroundMusic.pause();
    removesEventListener();
    stopTimer();
    titoloElement.textContent = "ARRIVACI!";
    puntiElement.textContent = "0";
    clearInterval(intervalID);
    intervalID = null;
    div_livelloElement.textContent = "1";
    progressElement.value = 0;
    document.querySelectorAll(".obj").forEach(function (element) {
        element.remove();
    });
    obbiettivi = [];
    startIcon.classList = "material-symbols-outlined"; // riscrivo la classe per toliere l'hide

    counterElement.innerText = "";
    counterElement.appendChild(startIcon);

    navElement.style = "top: -150px;";
}


// Gestione dell'intervallo della creazione degli obbiettivi in base al livello 
function difficoltaTempo() {
    const lvl = parseInt(div_livelloElement.textContent);
    if (lvl === 1) { return 3000; }
    return 3000 - (lvl * 225);
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
    if (e.target.tagName !== 'BODY') { return; }
    if (isNaN(parseInt(counterElement.textContent))) { return; }
    // Gestisci l'evento touch qui
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
    if (e.target.tagName === 'BODY' && e.button === 0) {
        minusFunction();
    }
}

function biding_clickRightMouse(e) {
    if (e.target.tagName !== 'BODY') { return; }
    e.preventDefault(); // Prevenire il menu contestuale
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


// Gestione GameOver
function showGameOver() {
    gameoverMusic.play().catch(error => {
        console.error('Errore nella riproduzione del brano del pulsante:', error);
    });
    gameOverPoints.textContent = `Hai totalizzato ${puntiElement.textContent} punti`;
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
}