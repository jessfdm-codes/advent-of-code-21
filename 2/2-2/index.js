const fs = require('fs')

const FORWARD = "forward";
const UP = "up";
const DOWN = "down";

try {
    const data = fs.readFileSync('input.txt', 'utf8').split("\n").map(instruction => instruction.split(" "));

    let depth = 0;
    let horizontalPos = 0;
    let aim = 0;

    data.forEach(instructionPair => {
        const instruction = instructionPair[0];
        const value = parseInt(instructionPair[1]);

        switch (instruction) {
            case FORWARD:
                horizontalPos += value;
                depth += aim * value;
                break;

            case UP:
                aim -= value;
                break;

            case DOWN:
                aim += value;
                break;
        
            default:
                throw new Error("Illegal instruction: " + instruction);
                break;
        }
    });

    console.log(`Depth: ${depth} | Horizontal Position: ${horizontalPos}`);
    console.log(`Multiplied: ${depth * horizontalPos}`);
    
} catch (err) {
    console.error(err)
}
