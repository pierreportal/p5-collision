collisionCheck = atoms => {

    atoms.forEach((atom, i) => {

        if (atom === this) return;

        let dist = distance(this, atom);

        if (dist <= warningDistance) this.detect(this, atom, dist);

        if (dist <= this.radius) this.eat(atoms, i);

    })
}


detect = (a, b, dist) => {
    stroke('magenta')
    strokeWeight(((warningDistance - dist) / warningDistance) * 5)
    line(...a.position, ...b.position)
    b.color = a.color
}

eat = (atoms, i) => {
    atoms.splice(i, 1)
}

//#################

const distance = (a, b) => {
    // euclidean distance = sqrt( (x1 - x2)^2 + (y1 - y2)^2 )
    return Math.sqrt((a.position[0] - b.position[0]) ** 2 + (a.position[1] - b.position[1]) ** 2)
}