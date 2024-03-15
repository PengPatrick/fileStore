let mic;
let particles = [];
let particleFrequency = 0.1; 
let particleSpeedFactor = 0.1; 

function setup() {
    createCanvas(800, 400);
    background(0);


    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    background(255, 255, 255, 25); 


    let vol = mic.getLevel();
    if (vol > 0.01) { 
        let n = map(vol, 0, 1, 0, 10); 
        for (let i = 0; i < n; i++) {
            let size = random(1, 7);
            let shape = random() < 0.5 ? 'circle' : 'drop';
            particles.push(new Particle(random(width), random(height), random(-2, 2), random(-2, 2), size, shape));
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].isFinished()) {
            particles.splice(i, 1);
        }
    }
}

class Particle {
    constructor(x, y, dx, dy, size, shape) {
        this.position = createVector(x, y);
        this.velocity = createVector(dx, dy);
        this.size = size;
        this.shape = shape;
        this.lifespan = 70;
        this.strokeWeight = random(0.5, 3);
        this.color = color(random(255), random(255), random(255), this.lifespan);
    }

    update() {
        this.velocity.add(createVector(random(-0.5, 0.5), random(-0.5, 0.5)));
        this.position.add(this.velocity);
        this.lifespan -= 2;
        this.color.setAlpha(this.lifespan);
    }

    display() {
        stroke(this.color);
        fill(this.color);
        strokeWeight(this.strokeWeight);
        if (this.shape === 'circle') {
            ellipse(this.position.x, this.position.y, this.size, this.size);
        } else if (this.shape === 'drop') {
            ellipse(this.position.x, this.position.y, this.size / 2, this.size);
        }
    }

    isFinished() {
        return this.lifespan < 0;
    }
}