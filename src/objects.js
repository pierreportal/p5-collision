

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
    /* 

    I ) detection line
    II ) color transfer
    III ) eat
    
    */

    /*
 
     0a.) observe the construction of classes, how is the position represented, the radius...
     0b.) observe our constants (margin, n, randomRate...)
     1.) create collision check function in Atom class that takes the array of atoms as parameter.
     2.) call collision check function for each atoms in the main draw function
     3.) loop through [atoms] by keeping track of the element and its index. (forEach(elem, i))
     4.) check if not meeting itself in the loop.
     5.) get the distance between itself and the other atom.
     6.) set a conditional statment (if dist <= margin --> detect(a,b,distance)) --> line, color transfer
     7.) set a conditional statment (if dist <= the radius of 1 atom (half of 2 atoms radius) --> eat(atoms, i))
     8.) create the distance function in our sketch main file that takes two element as parameters.
     9.) create the detect function to draw the line between the atoms.
     10.) craete the eat function that takes the list of atoms and an index as parameters, this function will splice the list to remove the index passed as parameters.
     */
    //####################### CHECK DISTANCES & COLLISIONS ######################

    //###########################################################################
}