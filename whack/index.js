const $startButton = document.querySelector('button');
const $moles = document.querySelectorAll('.mole');

const GAME_DURATION = 5000;

let point = 0;
let isPlaying = false;
let previousIndex = -1;

function peek() {
    if (!isPlaying) return;

    let moleIndex;
    do {
        moleIndex = getRandomNumber(0, 5);
    } while (moleIndex === previousIndex);
    previousIndex = moleIndex;

    $moles[moleIndex].classList.add('shown');

    const randomTime = getRandomNumber(300, 800);
    setTimeout(function() {
        $moles[moleIndex].classList.remove('shown');
        peek();
    }, randomTime);
}

function onClickMole(e) {
    setPoints(point + 1);

    e.target.classList.remove('shown');
}

function onClickStart() {
    if (isPlaying) return;

    isPlaying = true;
    setPoints(0);

    peek();

    setTimeout(function() {
        isPlaying = false;
    }, GAME_DURATION);
}

function setPoints(p) {
    const $point = document.querySelector('.point');
    point = p;
    $point.innerText = point;
}

// Helper functions
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Assigning events to elements
$startButton.onclick = onClickStart;
for (const $mole of $moles) {
    $mole.onclick = onClickMole;
}
