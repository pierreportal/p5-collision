

class Atom {
    constructor({ randomRate, color }) {
        this.position = [Math.random() * WIDTH, Math.random() * HEIGHT]
        this.radius = radius;
        this.randomRate = randomRate;
        this.color = color;
    }
    move = () => {
        this.position[0] += random(this.randomRate) - this.randomRate / 2;
        this.position[1] += random(this.randomRate) - this.randomRate / 2;

        if (this.position[0] - this.radius / 2 > WIDTH) this.position[0] = - this.radius
        if (this.position[1] - this.radius / 2 > HEIGHT) this.position[1] = - this.radius;
    }

    create = () => {
        this.move();
        fill(this.color);
        noStroke();
        circle(...this.position, this.radius);
    }

    collisionCheck = atoms => {
        atoms.forEach((atom, i) => {
            if (atom === this) return;
            let dist = distance(this, atom);
            if (dist <= detectionDistance) this.detect(atom, dist);
            if (dist <= this.radius) this.eat(atoms, i);
        })
    }

    detect = (atom, dist) => {
        stroke('magenta')
        strokeWeight(((detectionDistance - dist) / detectionDistance) * 5)
        line(...this.position, ...atom.position)
        atom.color = this.color
    }

    eat = (atoms, i) => {
        atoms.splice(i, 1)
    }
}