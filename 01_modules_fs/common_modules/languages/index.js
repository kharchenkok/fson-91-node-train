const english = require('./english');


//варіанти імпорту module.exports = {french,japanese}==================================================================
//1
// const other = require('./languages/other');
// other.french();
// other.japanese();

//2
// const {french, japanese} = require('./languages/other');
// french();
// japanese();

//імпорт для exports.french = ()=> console.log('Hello from other.js - french');=======================================
const {french,japanese} = require('./other');

module.exports = {
    english,
    french,
    japanese
}
