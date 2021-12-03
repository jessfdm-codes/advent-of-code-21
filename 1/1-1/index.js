const fs = require('fs')

try {
    const data = fs.readFileSync('input.txt', 'utf8').split("\n").map(s => parseInt(s));

    let count = 0;
    previous = -1;
    data.forEach(measurement => {
        if (previous > 0 && previous < measurement){
            count++;
        }
        previous = measurement;
    });

    console.log(count)
} catch (err) {
    console.error(err)
}