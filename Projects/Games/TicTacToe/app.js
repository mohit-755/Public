let boxes = document.querySelectorAll('.box');

let restbtn = document.getElementById('resetbtn');

let winScreen = document.querySelector('.winner');

let turnO = true;

let winner = false;

let turnsPlayed = 0;

let winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]]



boxes.forEach((box, index) => {

    const clk = () => {
        if (box.innerText === '') {

            if (!winner) {
                if (turnO) {
                    box.innerText = 'O';
                    turnO = false;
                } else {
                    box.innerText = 'X';
                    turnO = true;
                }
                turnsPlayed++;

                checkWin();
            }
        }
    }
    box.addEventListener('click', clk);
})

const checkWin = () => {
    for (let pattern of winCombos) {
        if (boxes[pattern[0]].innerText === boxes[pattern[1]].innerText &&
            boxes[pattern[1]].innerText === boxes[pattern[2]].innerText &&
            boxes[pattern[0]].innerText != '') {

            winScreen.style.display = 'flex'
            winScreen.innerHTML = `Congrates! ${boxes[pattern[0]].innerText} Wins!`;
            // console.log(`Winner is ${boxes[pattern[0]].innerText}`);
            winner = true;
        }
    }
    if (turnsPlayed === 9 && !winner) {
        console.log('Draw');
        winScreen.style.display = 'flex'
        winScreen.innerHTML = `It Was a Draw!`;
    }
}

const reset = () => {
    boxes.forEach(box => {
        box.innerText = '';
        addEventListener
    })
    winScreen.style.display = 'none'
    winner = false;

}
restbtn.addEventListener('click', reset);