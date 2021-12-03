const fs = require('fs')

try {
    const data = fs.readFileSync('input.txt', 'utf8').split("\n");


    const values = getBinVals(data);
    const gamma = values[0];
    const epsilon = values[1];


    console.log(`Gamma: ${gamma} | Epsilon: ${epsilon}`);
    console.log(`Power Consumption: ${gamma * epsilon}`);
} catch (err) {
    console.error(err)
}

function getZerosInColumn(list, columnIdx){
    //Base case
    if (list.length == 0){
        return 0;
    }

    //Inductive case
    var isZero = list[0].charAt(columnIdx) == "0"; //Assuming that data is strictly binary numbers

    return getZerosInColumn(list.slice(1), columnIdx) + (isZero ? 1 : 0);
}

function getBinVals(list){
    const width = list[0].length;
    var gammaStr = "";
    var epsilonStr = "";

    for (let i = 0; i < width; i++){
        var zeros = getZerosInColumn(list, i);

        if (zeros > list.length / 2){
            gammaStr += "0";
            epsilonStr += "1"
        } else {
            gammaStr += "1";
            epsilonStr += "0"
        }
    }

    return [parseInt(gammaStr,2),parseInt(epsilonStr,2)];
}