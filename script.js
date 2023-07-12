console.log("The game here");

let turn = 'X';
let gameOver = false;
let ting = new Audio('ting.mp3');
let win = new Audio('win.wav');

const changeTurn = () => {
    if (turn === 'X') {
        return '0';
    } else {
        return 'X';
    }
}

// Win.
const winGame = () => {
    arr = [
        // Horizontal winning position and the transition on the x y and rotation for the line.
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        // Vertical winning position and the transition on the x y and rotation for the line.
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        // Diagonal winning position and the transition on the x y and rotation for the line.
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],


    ]

    // Getting all the boxes.
    let boxText = document.getElementsByClassName('boxText');
    arr.forEach(e => {
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[0]].innerText) && boxText[e[0]].innerText !== '') {
            document.querySelector(".gameInfoText").innerText = boxText[e[0]].innerText + ": Won the game";
            document.getElementById('img').style.width = '200px';
            gameOver = true;
            win.play();
            setInterval(() => {
                win.pause();
            }, 4000);
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    })
};
// Game Logic

let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector('.boxText');
    element.addEventListener('click', () => {
        if (boxText.innerText === '') {
            boxText.innerText = turn;
            turn = changeTurn();
            ting.play();
            winGame();
            if (!gameOver)
                document.querySelector(".gameInfoText").innerText = "Turn for: " + turn;
        }
    })

});

let btn = document.getElementById('btn');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    turn = 'X';
    let boxText = document.getElementsByClassName('boxText');
    Array.from(boxText).forEach(element => {
        element.innerText = '';
    });
    document.getElementById('img').style.width = '0px';
    document.querySelector(".gameInfoText").innerText = "Turn for: " + turn;
    document.querySelector(".line").style.width = "0";
    gameOver = false;
})