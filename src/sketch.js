

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
        x.collisionCheck(listOfAtoms);
    });
}

const distance = (a, b) => {
    // euclidean distance = sqrt( (x1 - x2)^2 + (y1 - y2)^2 )
    return Math.sqrt((a.position[0] - b.position[0]) ** 2 + (a.position[1] - b.position[1]) ** 2)
}



//################################### SCORES ##################################
// const scores = {}
// colors.forEach(c => { scores[c] = 0 })

// const printScores = () => {
//     const updatedScores = { ...scores }
//     listOfAtoms.forEach(x => {
//         let c = x.color
//         updatedScores[c] += 1
//     })
//     console.log(updatedScores)
// }

