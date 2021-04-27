const xml2js = require('xml2js');

const fs = require('fs')

let parser = new xml2js.Parser();

let xmlData;
fs.readFile('../src/anime.xml', function(err, data) {
    //smh async
    parser.parseString(data, function (err, result) {
        xmlData = result;
        console.log(result);
        console.log('Done');
        findDup(xmlData)
    });
});


const findDup = (xmlData) => {
    for(let i = 0; i < xmlData.animeset.anime.length; i++){
        console.log(xmlData.animeset.anime[i])
    }
}


