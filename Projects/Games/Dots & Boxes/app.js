// Generating gameBoard ------------------------------

let gameBoard = document.getElementById('gameBoard');

// let gridBy = Number(prompt('Enter a grid size below'));

let gridBy = Number(window.localStorage.getItem('gridBy'));

// Creating boxes

let initialNum = (gridBy * 2) + 2;
let boxCount = [];
while (boxCount.length < gridBy * gridBy) {
    for (j = 1; j < gridBy; j++) {
        if (boxCount.length === gridBy * j) {
            initialNum = initialNum + (gridBy * 2) + 2;
        }
    }
    boxCount.push(initialNum);
    initialNum = initialNum + 2;
}
// console.log(boxCount.length);
// console.log('Created boxes: ', boxCount);

// for grid size style:
gameBoard.style.gridTemplateColumns = `repeat(${gridBy}, 1fr 5fr) 1fr`;
gameBoard.style.gridTemplateRows = `repeat(${gridBy}, 1fr 5fr) 1fr`;


// Creating all divs to make complete grid.
for (let i = 0; i < ((gridBy * 2) + 1) * ((gridBy * 2) + 1); i++) {

    let div = document.createElement("div");
    if (i % 2 != 0) {
        div.className = 'line';
    } else if (boxCount.includes(i)) {
        div.className = 'box';
    } else {
        div.className = 'dot';
    }
    gameBoard.appendChild(div);
}

// ----------------------------------- Game Logic---------------------------------------------->
// Creating array of lines which completes whole a box
let initialElm = 0;
let setGap = gridBy + 1;
let linesForCompBoxes = [];
for (let i = 0; i < gridBy * gridBy; i++) {
    linesForCompBoxes.push([]);
}
for (let i = 0; i < gridBy * gridBy; i++) {
    if (i != 0 && i % gridBy === 0) {
        initialElm = initialElm + setGap;
    }
    linesForCompBoxes[i].push(initialElm);
    linesForCompBoxes[i].push(initialElm + gridBy);
    linesForCompBoxes[i].push(initialElm + gridBy + 1);
    linesForCompBoxes[i].push(initialElm + gridBy + 1 + gridBy);
    initialElm++;
}
// console.log(linesForCompBoxes);



let lines = document.querySelectorAll('.line');

let boxes = document.querySelectorAll('.box');

let turnInc = document.getElementById('turnInc');

let docScoreBlue = document.getElementById('blue');

let docScoreRed = document.getElementById('red');

let scoreP1 = 0;

let scoreP2 = 0;


let turnP1 = true;

let clickedLines = [];

let turnArr = [];

// let click;

let blueName = (window.localStorage.getItem('blueName') === '') ? `Blue` : `${window.localStorage.getItem('blueName')}`;
let redName = (window.localStorage.getItem('redName') === '') ? `Red` : `${window.localStorage.getItem('redName')}`;


docScoreBlue.innerText = `${blueName}: 0`;
docScoreRed.innerText = `${redName}: 0`;
turnInc.innerText = `Turn: ${blueName}`;




let undoValue = window.localStorage.getItem('undoValue');

if (undoValue === 'false') {
    document.getElementById('undo').style.display = 'none';
}



lines.forEach((line, index, arr) => {
    const clk = () => {
        
        // console.log('---------------Line----------------')
        if (!clickedLines.includes(index)) {
            // let isComp = false;

            if (turnP1) {
                line.classList.add('lineClickP1');
                // turnP1 = false;
            } else {
                line.classList.add('lineClickP2');
                // turnP1 = true;
            }

            clickedLines.push(index);
            // console.log('Clicked Lines:', clickedLines);
            boxCheck();
            // console.log(isComp);
            // click = true;
        }

    }
    line.addEventListener('click', clk);

    line.addEventListener('mouseover', () => {
        if (!clickedLines.includes(index)) {

            if (turnP1) {
                line.classList.add('lineHoverBlue');
            } else {
                line.classList.add('lineHoverRed');
            }
        }
    })
    line.addEventListener('mouseout', () => {
        line.classList.remove('lineHoverBlue');
        line.classList.remove('lineHoverRed');
    })
    line.addEventListener('mouseup', () => {
        line.classList.remove('lineHoverBlue');
        line.classList.remove('lineHoverRed');
    })

})


//-------------------------------------------------------------------------------
let count = 0;
let overAllCompBoxes = [];
let boxestriggeredComp = [];
let lineTriggeredCompBox = [];
let trackingCount = [];

const boxCheck = () => {
    let tempArr = [];
    count = 0;
    boxes.forEach((box, index) => {
        if (linesForCompBoxes[index].every(item => clickedLines.includes(item))) {
            if (!overAllCompBoxes.includes(index)) {
                if (turnP1) {
                    box.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
                    overAllCompBoxes.push(index);
                    tempArr.push(index);
                    boxestriggeredComp.push(tempArr);
                    lineTriggeredCompBox.push(clickedLines[clickedLines.length - 1]);
                    count++;
                    scoreP1++;
                    docScoreBlue.innerText = `${blueName}: ${scoreP1}`;



                    // turnP1 = false;
                } else {
                    box.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
                    overAllCompBoxes.push(index);
                    tempArr.push(index);
                    boxestriggeredComp.push(tempArr);
                    lineTriggeredCompBox.push(clickedLines[clickedLines.length - 1]);
                    count++;
                    scoreP2++;
                    docScoreRed.innerText = `${redName}: ${scoreP2}`;


                    // scoreP2++;
                    // turnP1 = true;
                }

            }
         
        }
    })
    trackingCount.push(count);





    if (count === 2) {
        boxestriggeredComp.pop();
        lineTriggeredCompBox.pop();
    }

    if (trackingCount[trackingCount.length - 1] === 0) {
        if (turnP1) {
            turnP1 = false;
            turnInc.innerText = `Turn: ${redName}`;
        } else {
            turnP1 = true;
            turnInc.innerText = `Turn: ${blueName}`;

        }
    }
    turnArr.push(turnP1);


    // console.log('overAllCompBoxes:', overAllCompBoxes);
    // console.log('boxestriggeredComp:', boxestriggeredComp);
    // console.log('lineTriggeredCompBox:', lineTriggeredCompBox);
    // console.log('trackingCount', trackingCount);
    // console.log(turnArr);


}
//------------------------------------------------------------------------------------



const undo = () => {

    if (clickedLines.length != 0) {


        if (trackingCount[trackingCount.length - 1] === 0) {
            if (turnInc.innerText === `Turn: ${blueName}`) {
                turnInc.innerText = `Turn: ${redName}`;
            }
            else if (turnInc.innerText === `Turn: ${redName}`) {
                turnInc.innerText = `Turn: ${blueName}`;
            }
        }



        let lastLineClicked = clickedLines[clickedLines.length - 1];
        lines[lastLineClicked].classList.remove(lines[lastLineClicked].classList[1]);
        clickedLines.pop();


        if (trackingCount[trackingCount.length - 1] === 1) {
            if (boxes[overAllCompBoxes[overAllCompBoxes.length - 1]].style.backgroundColor === 'rgba(0, 0, 255, 0.5)' || boxes[overAllCompBoxes[overAllCompBoxes.length - 1]].style.backgroundColor === 'rgba(255, 0, 0, 0.5)') {
                boxes[overAllCompBoxes[overAllCompBoxes.length - 1]].style.backgroundColor = '';
            } 

            if (turnP1) {
                scoreP1 = scoreP1 - 1;
                docScoreBlue.innerText = `${blueName}: ${scoreP1}`;
            } else {
                scoreP2 = scoreP2 - 1;
                docScoreRed.innerText = `${redName}: ${scoreP2}`;
            }


            overAllCompBoxes.pop();
        }
        if (trackingCount[trackingCount.length - 1] === 2) {
            if (boxes[overAllCompBoxes[overAllCompBoxes.length - 1]].style.backgroundColor === 'rgba(0, 0, 255, 0.5)' || boxes[overAllCompBoxes[overAllCompBoxes.length - 1]].style.backgroundColor === 'rgba(255, 0, 0, 0.5)') {
                boxes[overAllCompBoxes[overAllCompBoxes.length - 1]].style.backgroundColor = '';

            }
            if (boxes[overAllCompBoxes[overAllCompBoxes.length - 2]].style.backgroundColor === 'rgba(0, 0, 255, 0.5)' || boxes[overAllCompBoxes[overAllCompBoxes.length - 2]].style.backgroundColor === 'rgba(255, 0, 0, 0.5)') {
                boxes[overAllCompBoxes[overAllCompBoxes.length - 2]].style.backgroundColor = '';
                count = 0;

            }
            if (turnP1) {
                scoreP1 = scoreP1 - 2;
                docScoreBlue.innerText = `${blueName}: ${scoreP1}`;
            } else {
                scoreP2 = scoreP2 - 2;
                docScoreRed.innerText = `${redName}: ${scoreP2}`;
            }



            overAllCompBoxes.pop();
            overAllCompBoxes.pop();

        }



        lineTriggeredCompBox.pop();
        boxestriggeredComp.pop();
        trackingCount.pop();
        turnArr.pop();

        turnP1 = turnArr[turnArr.length - 1];



        // console.log('---------------Undo----------------')
        // console.log('overAllCompBoxes:', overAllCompBoxes);
        // console.log('boxestriggeredComp:', boxestriggeredComp);
        // console.log('lineTriggeredCompBox:', lineTriggeredCompBox);
        // console.log('trackingCount', trackingCount);
        // console.log(turnArr);
        // console.log(turnP1);
    }
}



document.getElementById('undo').addEventListener('click', () => { undo(); });




//-------------------------------------------------------------------------------------------

//Reset logic

document.getElementById('reset').addEventListener('click', () => { reset(); });

const reset = () => {

    clickedLines = [];
    overAllCompBoxes = [];
    boxestriggeredComp = [];
    lineTriggeredCompBox = [];
    trackingCount = [];
    turnArr = [];
    turnP1 = true;

    lines.forEach((line) => {
        line.classList.remove(line.classList[1]);
    })
    boxes.forEach((box) => {
        box.style.backgroundColor = '';
    })

    turnInc.innerText = `Turn: ${blueName}`;

    scoreP1 = 0;
    scoreP2 = 0;
    docScoreBlue.innerText = `${blueName}: 0`
    docScoreRed.innerText = `${redName}: 0`

    // console.log('---------------Reset----------------')
    // console.log('overAllCompBoxes:', overAllCompBoxes);
    // console.log('boxestriggeredComp:', boxestriggeredComp);
    // console.log('lineTriggeredCompBox:', lineTriggeredCompBox);
    // console.log('trackingCount', trackingCount);
    // console.log(turnArr);
}



