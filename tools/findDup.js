const xml2js = require('xml2js');
const fs = require('fs')

let parser = new xml2js.Parser();
let xmlData;

fs.readFile('../src/anime.xml', function(err, data) {
    //smh async
    parser.parseString(data, function (err, result) {
        xmlData = result;
        // console.log(result);
        // console.log('Done');
        findDuplicates(xmlData)
    });
});

const sortOrder = (name) => {
    //this is used for array.sort but based on the element of the object
    return (a, b) => {
        if (a[name] > b[name]) {    
            return 1;    
        } else if (a[name] < b[name]) {    
            return -1;    
        }    
        return 0; 
    }
}


const findDuplicates = (xmlData) => {
    //loops over the sorted object and see if there are duplicates 
    data = xmlData.animeset.anime
    //console.log(data)
    data.sort(sortOrder('image'))

    for(let i = 0; i < data.length - 1; i++){
        //console.log(i)
        if(data[i].image[0] == data[i + 1].image[0]){
            console.log(`'${data[i].name[0]}' is a duplicate`)
        }
    }
}

//TODO: add autodelete 