process.env.NODE_ENV = 'development'; //додаємо змінну оточення NODE_ENV
// console.log(process.env)//environment -змінні оточення

// console.log(process.argv)//arguments array- аргументи командного рядка
// [
// '/home/kate/.nvm/versions/node/v20.11.0/bin/node',
//     '/work/education/fson-91-node-train/02_console-app/index.js'
// ]

// console.log(process.cwd())//current working directory- поточна робоча директорія
// process.exit()//завершення роботи програми
// console.log(__dirname)//current working directory- поточна робоча директорія
// console.log(__filename)//current working directory- поточна робоча директорія

// console.log(global)


import {program} from 'commander';// const {program} = require('commander');
import fs from 'fs/promises';// const fs = require('fs/promises');
import readline from 'readline';// const readline = require('readline');
import colors from 'colors';// require('colors');

// SETUP ARGUMENT
// <type> - show error if no arg
// 2nd arg - description
// 3rd arg - default value
// using args: 'node index.js -f <name of the log file>'
program.option('-f, --file <type>', 'file for saving game logs', 'default.log');

// parse command line arguments
program.parse(process.argv);

// create interaction interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


// //simple example of using readline
// rl.on('line',(txt)=>{
//     console.log({txt});
//     // if(txt==='exit'){
//     //     rl.close();
//     // }
//     rl.close()
// })
let counter = 0;
const mind = Math.ceil(Math.random()*10);//random number from 1 to 10
const logFile=program.opts().file;

/**
 * Logger to write game results into the log file
 * @param {string} msg - message to log
 * @param {string} logFile - file to log
 * @returns {Promise<void>}
 */

const logger = async (msg, logFile) => {
    try {
        await fs.appendFile(logFile, `${new Date().toLocaleString('uk-UA')}: ${msg}\n`);

        console.log(msg.bgWhite.brightMagenta);
        console.log(`Saved game results to the log file: ${logFile}}`.yellow);
    } catch (err) {
        console.log(`Something went very wrong: ${err.message}`.red);
    }
};



/**
 * Simple input validation
 * @author Kateryna_Kharchenko
 * @category validators
 * @param {number} num - input value
 * @returns {boolean}
 */
const isValid=(num)=>{
    if(!Number.isNaN(num) && num>0 && num<=10 && num%1===0) return true;
    if(Number.isNaN(num)) console.log('Please, enter a number only..'.red);
    if(num%1!==0) console.log('Please, enter a whole number only..'.red);
    if(num<1 || num>10) console.log('Please, enter a number from 1 to 10 only..'.red);
    return false;
}

const game =()=>{
    rl.question('Please enter any whole number from 1 to 10\n'.blue,(val)=>{
        const num = Number(val);
        //validate the number
        if(!isValid(num)) return game();
        counter+=1;
        if(num!==mind){
            console.log('Oh no!! Try again..'.red);
            return game();
        }
        // console.log(`Congrats!! You've guessed the number in ${counter} step(s)`.green);
        logger(`Congrats!! You've guessed the number in ${counter} step(s)`,logFile);
        rl.close();

    })

}
game();

