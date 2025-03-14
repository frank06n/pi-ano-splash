class Particle {
    constructor(x, y, d, color, lifetime) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.color = color;
        this.lifetime = lifetime;

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

        //fading
        const a = this.color._getAlpha();
        if (a > 0)
            this.color.setAlpha(max(0, a - deltaTime/1000.0/this.lifetime));
    }

    show() {
        fill(this.color);
        circle(this.x, this.y, this.d);
    }

    isAlive() {
        return this.color._getAlpha() > 0;
    }
}

class DuckParticle {
    constructor(x, y, d, lifetime) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.lifetime = lifetime;

        this.color = color(97, 51, 10);

        this.stOff = random(-1000, 1000);
        this.vel = { x: 0, y: 0 };
    }

    update() {
        this.vel.x = (noise(this.stOff) * 2 - 1) / 5;
        this.vel.y = (noise(0, this.stOff) * 2 - 1) / 5;

        this.stOff += 0.1;

        this.x += this.vel.x;
        this.y += this.vel.y;

        //fading
        const a = this.color._getAlpha();
        if (a > 0)
            this.color.setAlpha(max(0, a - 255*deltaTime/1000.0/this.lifetime));
    }

    show() {
        fill(this.color);
        circle(this.x, this.y, this.d);
        textFont('Courier New');
        textSize(this.d*0.7);
        textAlign('CENTER', 'CENTER');
        text('🐥', this.x - this.d*0.47, this.y + this.d*0.03);
    }

    isAlive() {
        return this.color._getAlpha() > 0;
    }
}

class MoaiParticle {
    constructor(x, y, d, lifetime) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.lifetime = lifetime;

        this.color = color(51);

        this.stOff = random(-1000, 1000);
        this.vel = { x: 0, y: 0 };
    }

    update() {
        this.vel.x = (noise(this.stOff) * 2 - 1) / 5;
        this.vel.y = (noise(0, this.stOff) * 2 - 1) / 5;

        this.stOff += 0.1;

        this.x += this.vel.x;
        this.y += this.vel.y;

        //fading
        const a = this.color._getAlpha();
        if (a > 0)
            this.color.setAlpha(max(0, a - 255*deltaTime/1000.0/this.lifetime));
    }

    show() {
        fill(this.color);
        circle(this.x, this.y, this.d);
        textFont('Courier New');
        textSize(this.d*0.6);
        textAlign('CENTER', 'CENTER');
        text('🗿', this.x - this.d*0.42, this.y + this.d*0.04);
    }

    isAlive() {
        return this.color._getAlpha() > 0;
    }
}