const fs = require('fs/promises');
const path = require('path');

//IIFE
(async()=>{
    try{
        const pathToTextFile = path.join('files','texts','example.txt');
        const readResult = await fs.readFile(pathToTextFile);
        // console.log({pathToTextFile,readResult});
        // console.log(readResult.toString());
        const filesDir = 'files';
        const listDirectoryContent = await fs.readdir(filesDir); //'data.json', 'texts'
        // console.log({listDirectoryContent});

        const stat= await fs.lstat(filesDir);
        const statDataJson= await fs.lstat('files/data.json');
        // console.log({stat});
        // console.log({statDataJson:statDataJson.isFile()}); //true
        // console.log({statDataJson:statDataJson.isDirectory()}); //false
        // console.log({stat:stat.isFile()}); //false
        // console.log({stat:stat.isDirectory()}); //true

        //додаємо текст в кінець файлу example.txt==================================================
        // await fs.appendFile(pathToTextFile,'\nHello from Node.js');

        //READ json file==================================================
        const pathToDataJson = path.join('files','data.json');
        const readJsonResult = await fs.readFile(pathToDataJson);
        const dataArr = JSON.parse(readJsonResult);
        // console.log(dataArr); // =>
         // [
         //    { name: 'Michael', year: 1955 },
         //    { name: 'Kate', year: 1999 },
         //    { name: 'Jimi', year: 1946 }
         // ]

        //Add to json file==================================================
        dataArr.push({name:'Bob',year:2000});
        await fs.writeFile(pathToDataJson,JSON.stringify(dataArr));




    }catch(err){
        console.log(err);
    }
})()