# p5.js - distance and collision detection

This is an introduction to object distance and collision detection in p5 sketches.

## Introduction 

For this example, we will create a cloud of objects (atoms) moving in random directions at random positions. At the end of the example, our atoms will all <b>detect each other when they are close, exchange informations and destroy each other</b>.

## Step 0 - Our constants

We need to set a few constants in a new <code>constants.js</code> file.
Those constants will be the parameters of our randomly generated cloud and the parameters used for our detection method.

In <b><code>constants.js</code></b>:
```js
// dimention of our p5 canvas</br>
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// available colors assigned to our atoms
const colors = ['red', 'lightcoral', 'yellow', 'green', 'blue'];

// Population size n
const n = 80;
// the rate of random movements 
const randomRate = 10;
// size of our atoms
const radius = 20;
// threshold for detection
const detectionDistance = 100;
```

## Step 1 - Our Atom class

<p>The Atom class is the plueprint of each atom. in its <code>constructor</code> We give the random position, radius (size), the color and the random rate which defines the random movement in the 2d space. The <code>move</code> function creates the movement and the <code>create</code> function draw the atom.</p>

In a new <b><code>atom.js</code></b> file :

```js
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
```

## Step 2 - Our main script

<p>
In the main script we have the usual p5 <code>setup</code> and <code>draw</code> function. We need to draw <i>N</i> atoms in a <i>WIDTH x HEIGHT</i> canvas, we can fill an empty array with <i>N</i> atoms using our Atom blueprint (the Atom class) and giving as arguments the constant random rate and a color from the array of available colors.</br>We draw each atom with a <code>forEach</code> in the draw frunction.
</p>

In a new <b><code>sketch.js</code></b> file :

```js
function setup() {
    createCanvas(WIDTH, HEIGHT);
}

const listOfAtoms = [];
for (let i = 0; i < n; i++) {
    listOfAtoms.push(new Atom({ randomRate, color: colors[i % colors.length] }))
}

function draw() {
    clear()
    listOfAtoms.forEach(x => {
        x.create();
    });
}
```

## Step 3 - The collistionCheck function

To detect atoms and collisions, we need to give all atoms the ability to detect every other atoms. Let's create the collistionCheck function in our Atom class. The function takes as input the array of atoms and get the distance between itself and every other atoms. If the distance is less than the constant detectionDistance, we call a detect function with the other atom as parameter. We can also give the distance as parameters to play with it. If the distance is less than alf of the radius of the atoms it means we have collision, so we can call the eat function. this last function will actually remove the other atom from the list so we need to give two arguments : the list and the index of the atom.

In the Atom class :
```js
collisionCheck = atoms => {
    atoms.forEach((atom, i) => {
        if (atom === this) return;
        let dist = distance(this, atom);
        if (dist <= detectionDistance) this.detect(atom, dist);
        if (dist <= this.radius) this.eat(atoms, i);
    })
};
```

## Step 4 - Distance

To get the distance between atoms we simply need the euclidean distance formula.

In <b><code>sketch.js</code></b> :
```js
distance = (a,b) => {
    return Math.sqrt((a.position[0] - b.position[0]) **2 + (a.position[1] - b.position[1]) **2);
}
```

## Step 5 - Detect

We can draw a line between atoms when they detect each other. the weight of the line can be constant or can depend of the distance. Let's make it bigger when the atoms are closer. Finally the atom will pass its color to the other artom.

In the Atom class :
```js
detect = (atom, dist) => {
    stroke('magenta');
    strokeWeight(((detectionDistance - dist) / dist) * 5);
    line(...this.position, ...atom.position);
    atom.color = this.color;
}
```
	

## Step 6 - Eat

In the Atom class :
```js
eat = (atoms, i) => {
    atoms.splice(i, 1);
}
```

## Step 7 - Call the collisionCheck function of each atom

Back in <b><code>sketch.js</code></b> :
```js
...
function draw() {
    clear()
    listOfAtoms.forEach(x => {
        x.create();
        x.collisionCheck(listOfAtoms);
    });
}
...
```


