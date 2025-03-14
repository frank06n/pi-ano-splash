class Particle {

    constructor(x, y, d, color) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.color = color;

        console.log(color);

        this.stOff = random(-1000, 1000);
        this.vel = { x: 0, y: 0 };
    }

    update() {
        this.vel.x = (noise(this.stOff) * 2 - 1) / 5;
        this.vel.y = (noise(0, this.stOff) * 2 - 1) / 5;

        this.stOff += 0.1;

        this.x += this.vel.x;
        this.y += this.vel.y;
    }

    show() {
        fill(this.color);
        circle(this.x, this.y, this.d);
    }

    fade() {
        const a = this.color._getAlpha();
        // console.log(a);
        if (a > 0)
            this.color.setAlpha(max(0, a - 1.0/6*deltaTime/1000));
    }

    isTotallyFaded() {
        return this.color._getAlpha() <= 0;
    }
}