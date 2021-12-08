const fs = require('fs')

try {
    const data = fs.readFileSync('input.txt', 'utf8').split("\n");
    const gridData = data.slice(1);

    const calloutOrder = data[0].split(",");

    let winningBoardIdx = null;
    let winningBoard = null;
    let stepsToBeat = Number.MAX_SAFE_INTEGER;
    let board = [];
    let winner = false;

    for (let i = 0; i < gridData.length + 1; i++){
        if (i % 6 === 0){
            if (board.length > 0){
                //Check verticals
                for (let colIdx = 0; colIdx < 5; colIdx++){
                    const column = [];
                    for (let rowIdx = 0; rowIdx < 5; rowIdx++){
                        column.push(board[rowIdx][colIdx]);
                    }
                    const toWinCol = stepsToWin(0, calloutOrder, column);
                    if (toWinCol < stepsToBeat){
                        winningBoardIdx = Math.floor(i / 6);
                        stepsToBeat = toWinCol;
                        winner = true;
                    }
                }
            }
            if (winner){
                winningBoard = board;
                winner = false;
            }

            board = [];
            continue;
        }

        const row = gridData[i].trimLeft().split(/ +/).map(str => parseInt(str));

        const toWinRow = stepsToWin(0, calloutOrder, row);
        if (toWinRow < stepsToBeat){
            winningBoardIdx = Math.floor(i / 6);
            stepsToBeat = toWinRow;
            winner = true;
        }

        board.push(row);
    }


    //Calculate score
    const calledOut = calloutOrder.slice(0, stepsToBeat);
    const a = winningBoard.reduce((prev, curr) => prev + curr.reduce((prev, cell) => calledOut.includes(cell.toString()) ? prev : (cell + prev), 0), 0);
    const b = calloutOrder[stepsToBeat - 1];

    console.log(a * b);

} catch (err) {
    console.error(err)
}

function stepsToWin(calledSoFar, toBeCalled, remainingInSet){
    //Base case
    if (toBeCalled.length === 0){
        return Number.MAX_SAFE_INTEGER
    }

    if (remainingInSet.length === 0){
        return calledSoFar;
    }

    //Inductive case
    return stepsToWin(calledSoFar + 1, toBeCalled.slice(1), remainingInSet.filter(num => num != toBeCalled[0]));
}