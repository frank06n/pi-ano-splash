let samples = [];
let notes = [];
let sfx = [];

const _kick = 0;
const _hihat = 1;
const _snare = 2;
const _ride = 3;

const NOTES = (() => {
    const _list = [1,2,3,4,5,6,7,8,0,9];
    shuffle(_list);
    return {
        SA: _list[0],
        RE: _list[1],
        GA: _list[2],
        MA: _list[3],
        PA: _list[4],
        DHA: _list[5],
        NI: _list[6],
        SA_: _list[7],
        B0: _list[8],
        B1: _list[9],
        isPlayable: (s) => !(s=='.' || s==_list[8] || s==_list[9])
    };
})();

let mstr;
let ix = 0;
let ix_f = 0.0;

const kick = () => samples[_kick].play();
const snare = () => samples[_snare].play();
const hihat = () => samples[_hihat].play();
const ride = () => samples[_ride].play();
const play_note = (i) => notes[int(i)].play();

const squish = () => sfx[0].play();

const check_play = (to_add, to_mod, play) => {if ( (ix + to_add) % to_mod == 0) play()}

let font;
let font2;
let charWidth;
let charHeight;

const RATE = 3.3; // per sec
const BS = 10; // Border Size

let particles = [];

function preload() {
    soundFormats('mp3', 'wav');
    samples[_kick] = loadSound('/assets/samples/kick.wav');
    samples[_hihat] = loadSound('/assets/samples/hihat.wav');
    samples[_snare] = loadSound('/assets/samples/snare.wav');
    samples[_ride] = loadSound('/assets/samples/ride.wav');

    notes[NOTES.SA] = loadSound('/assets/notes/sa.mp3');
    notes[NOTES.RE] = loadSound('/assets/notes/re.mp3');
    notes[NOTES.GA] = loadSound('/assets/notes/ga.mp3');
    notes[NOTES.MA] = loadSound('/assets/notes/ma.mp3');
    notes[NOTES.PA] = loadSound('/assets/notes/pa.mp3');
    notes[NOTES.DHA] = loadSound('/assets/notes/dha.mp3');
    notes[NOTES.NI] = loadSound('/assets/notes/ni.mp3');
    notes[NOTES.SA_] = loadSound('/assets/notes/sa_.mp3');

    sfx[0] = loadSound('/assets/sfx/squish.mp3');

    myData = loadStrings('/assets/million_pi.txt');

    font = loadFont('/assets/fonts/my_fontx.ttf');
    font2 = loadFont('/assets/fonts/my_font2.ttf');

    samples[_kick].setVolume(0.5);
    samples[_hihat].setVolume(0.5);
    samples[_snare].setVolume(0.3);
    samples[_ride].setVolume(0.5);

    sfx[0].setVolume(0.7);
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
        if (focused) ix_f += deltaTime * RATE / 1000.0;
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
    text('πano splash', width / 2, 10);

    textSize(18);
    fill(42, 128, 46);
    text('~~ 03/14/25 ~~', width / 2, 62);

    textAlign(CENTER, BOTTOM);
    textSize(16);
    fill(51);
    text('CLICK if there is NO sound', width / 2, height - 10);

    textFont(font);
    textSize(50);
    textAlign(LEFT, CENTER);

    push();
    translate(- (ix_f - ix) * charWidth, 0);

    fill(51);
    text(mstr.substring(ix, ix + 15), width / 2, height / 2);

    const s = mstr[ix];

    if (NOTES.isPlayable(s))
        fill(177, 24, 196);
    else
        fill(84, 209, 207);
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

    colorMode(HSL);
    const remainingParticles = [];
    for (let particle of particles) {
      particle.update();
      particle.show(); 
      particle.fade();
      if (!particle.isTotallyFaded()) remainingParticles.push(particle);
    }
    particles = remainingParticles;
    colorMode(RGB);

    cursor('/assets/paint-brush.png');
    displayBorders();
}


function doOnce() {
    const s = mstr[ix];
    const START_KICK = 15;
    const START_SNARE = 30;
    const START_HIHAT = 40;
    const GROUP_SIZE = 20;
    const GROUP_COUNT = 4;

    if (NOTES.isPlayable(s)) play_note(s);

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

function mouseClicked() {
    if (millis() <= 2000) return;
        squish();

    colorMode(HSL);
    const h = random(0, 360);
    const s = 64;
    const l = 62;

    const count = floor(random(8, 12));
    for (let n = 0; n < count; n++) {
        const x = mouseX + random(-25, 25);
        const y = mouseY + random(-25, 25);
        const d = 180/random(5, 18);
        const c = color(
            floor((h + random(-20, 20)) % 361), 
            floor(constrain(s + random(-3, 3), 0, 100)),            
            floor(constrain(l + random(-3, 3), 0, 100)),
            255);
        particles.push(new Particle(x,y,d,c));
    }
    colorMode(RGB);
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



function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}