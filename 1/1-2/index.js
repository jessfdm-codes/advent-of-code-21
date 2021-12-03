const fs = require('fs')

try {
    const data = fs.readFileSync('input.txt', 'utf8').split("\n").map(s => parseInt(s));


    console.log(sumIncreases(data, Number.MAX_SAFE_INTEGER))
} catch (err) {
    console.error(err)
}


function sumIncreases(remainingList, previousWindow){
    //Base case
    if (remainingList.length < 3){
        return 0;
    }

    //Inductive case
    const thisWindow = remainingList[0] + remainingList[1] + remainingList[2];

    const hasIncreased = thisWindow > previousWindow;

    return sumIncreases(remainingList.slice(1), thisWindow) + (hasIncreased ? 1 : 0);
}