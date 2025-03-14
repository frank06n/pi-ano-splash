let samples = [];
let notes = [];

const _kick = 0;
const _hihat = 1;
const _snare = 2;
const _ride = 3;


const _sa = 1;
const _re = 2;
const _ga = 3;
const _ma = 4;
const _pa = 5;
const _dha = 6;
const _ni = 7;
const _sa_ = 8;


let mstr;
let ix = 0;
let ix_f = 0.0;

let font;
let font2;
let charWidth;
let charHeight;

const RATE = 3.3; // per sec

const BS = 10; // Border Size

function preload() {
    soundFormats('mp3', 'wav');
    samples[_kick] = loadSound('/assets/samples/kick.wav');
    samples[_hihat] = loadSound('/assets/samples/hihat.wav');
    samples[_snare] = loadSound('/assets/samples/snare.wav');
    samples[_ride] = loadSound('/assets/samples/ride.wav');

    notes[_sa] = loadSound('/assets/notes/sa.mp3');
    notes[_re] = loadSound('/assets/notes/re.mp3');
    notes[_ga] = loadSound('/assets/notes/ga.mp3');
    notes[_ma] = loadSound('/assets/notes/ma.mp3');
    notes[_pa] = loadSound('/assets/notes/pa.mp3');
    notes[_dha] = loadSound('/assets/notes/dha.mp3');
    notes[_ni] = loadSound('/assets/notes/ni.mp3');
    notes[_sa_] = loadSound('/assets/notes/sa_.mp3');


    myData = loadStrings('/assets/million_pi.txt');

    font = loadFont('/assets/fonts/my_fontx.ttf');
    font2 = loadFont('/assets/fonts/my_font2.ttf');

    samples[_kick].setVolume(0.5);
    samples[_hihat].setVolume(0.5);
    samples[_snare].setVolume(0.3);
    samples[_ride].setVolume(0.5);
}

function setup() {
    createCanvas(400, 400);

    mstr = myData[0];

    textFont(font);
    textSize(50);
    charWidth = textWidth('0');
    charHeight = font.textBounds('dp', 0, 0).h;

    htmlSetup();
}

function draw() {
    if (millis() > 2000) {
        ix_f += deltaTime * RATE / 1000.0;
        background(255, 212, 250);
    }
    else {
        const f = millis()/2000.0;
        background(255*f, 212*f, 250*f)
    }

    textFont(font2);
    textAlign(CENTER, TOP);

    textSize(36);
    fill(230, 60, 60);
    text('πano splash', width / 2, 30);

    textSize(18);
    fill(42, 128, 46);
    text('~~ 03/14/25 ~~', width / 2, 82);

    textFont(font);
    textSize(50);
    textAlign(LEFT, CENTER);

    push();
    translate(- (ix_f - ix) * charWidth, 0);

    fill(51);
    text(mstr.substring(ix, ix + 15), width / 2, height / 2);

    const s = mstr[ix];

    if (s == '.' || s == '0' || s == '9')
        fill(84, 209, 207);
    else
        fill(177, 24, 196);
    text(s, width / 2, height / 2);

    pop();

    strokeWeight(4);
    stroke(102, 122, 255);
    line(width / 2 - charWidth, height / 2 + charHeight / 2 + 10, width / 2, height / 2 + charHeight / 2 + 10);
    noStroke();

    if (int(ix_f) > ix) {
        ix++;
        doOnce();
    }


    displayBorders();
}

const kick = () => samples[_kick].play();
const snare = () => samples[_snare].play();
const hihat = () => samples[_hihat].play();
const play_note = (i) => notes[int(i)].play();

const check_play = (to_add, to_mod, play) => {if ( (ix + to_add) % to_mod == 0) play()}

function doOnce() {
    const s = mstr[ix];
    const START_KICK = 20;
    const START_SNARE = 30;
    const START_HIHAT = 40;
    const GROUP_SIZE = 20;
    const GROUP_COUNT = 4;

    if (!'.09'.includes(s)) play_note(s);

    if (ix < START_KICK) 
        check_play(0, 4, kick);
    else 
        check_play(0, 2, kick);
    


    if (ix > START_SNARE)
    {
        const P = int((ix - START_SNARE) / GROUP_SIZE) % GROUP_COUNT;
        switch (P) {
            case 0:
                check_play(0, 3, snare);
                break;

            case 1:
                check_play(1, 4, snare);
                break;

            case 2:
                check_play(1, 2, snare);
                break;

            case 3:
                check_play(0, 3, snare);
                break;
        }
    }

    
    if (ix > START_HIHAT)
    {
        const P = int((ix - START_HIHAT) / GROUP_SIZE) % GROUP_COUNT;
        switch (P) {
            case 0:
                check_play(0, 5, hihat);
                break;

            case 1:
                check_play(1, 3, hihat);
                break;

            case 2:
                check_play(0, 1, hihat);
                break;

            case 3:
                check_play(3, 8, hihat);
                break;
        }
    }
}


function displayBorders() {
    noFill();
    stroke(171, 24, 14);
    strokeWeight(BS);
    rect(0,0,width,height);
    arc(BS, BS, 2*BS, 2*BS, PI, PI + HALF_PI);
    arc(BS, height - BS, 2*BS, 2*BS, HALF_PI, PI);
    arc(width - BS, height - BS, 2*BS, 2*BS, 0, HALF_PI);
    arc(width - BS, BS, 2*BS, 2*BS, -HALF_PI, 0);
    noStroke();
}

function htmlSetup() {
    document.querySelector('html').style.height='100%';
    document.querySelector('body').style.height='100%';
    const _main = document.querySelector('main');
    _main.style.height='100%';
    _main.style.display='flex';
    _main.style.alignItems='center';
    _main.style.justifyContent='center';
    document.querySelector('canvas').style.borderRadius=`${BS}px`;
}