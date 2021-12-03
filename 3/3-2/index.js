const fs = require('fs')

try {
    const data = fs.readFileSync('input.txt', 'utf8').split("\n");

    const oxyGenRating = getOxygenGenRating(data, 0);
    const Co2ScrubberRating = getCo2ScrubberRating(data, 0);

    console.log("Oxygen Generation Rating:")
    console.log(oxyGenRating);
    console.log(parseInt(oxyGenRating, 2));
    console.log("-----------------------");
    
    console.log("CO2 Scrubber Rating:")
    console.log(Co2ScrubberRating);
    console.log(parseInt(Co2ScrubberRating, 2));
    console.log("-----------------------");
    
    console.log(parseInt(oxyGenRating, 2) * parseInt(Co2ScrubberRating, 2));
} catch (err) {
    console.error(err)
}

function hasXInYColumn(str, x, y){
    return str.charAt(y) === x;
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


function getOxygenGenRating(list, column){
    //Base case
    if (list.length === 1){
        return list[0];
    }

    //Inductive case
    var zerosInColumns = getZerosInColumn(list, column);
    var mostCommon = (zerosInColumns > list.length / 2) ? "0" : "1";
    
    const filteredList = list.filter(binNum => hasXInYColumn(binNum, mostCommon, column));

    return getOxygenGenRating(filteredList, column + 1);
}

function getCo2ScrubberRating(list, column){
    //Base case
    if (list.length === 1){
        return list[0];
    }

    //Inductive case
    var zerosInColumns = getZerosInColumn(list, column);
    var leastCommon = (zerosInColumns <= list.length / 2) ? "0" : "1";
    
    const filteredList = list.filter(binNum => hasXInYColumn(binNum, leastCommon, column));

    return getCo2ScrubberRating(filteredList, column + 1);
}