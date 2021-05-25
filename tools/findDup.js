const xml2js = require('xml2js');
const fs = require('fs')

let parser = new xml2js.Parser();
let xmlData;

fs.readFile('./src/anime.xml', (err, data) => {
    if(err){ console.log(err)}
    
    parser.parseString(data,  (err, result) => {
        xmlData = result;
        
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


const findDuplicates = async () => {
    //loops over the sorted object and see if there are duplicates 
    data = await xmlData.animeset.anime
    //console.log(data)
    data.sort(sortOrder('image'))
    var foundOrNot = false;
    for(let i = 0; i < data.length - 1; i++){
        //console.log(i)
        if(data[i].image[0] == data[i + 1].image[0]){
            foundOrNot = true;
            console.log(`'${data[i].name[0]}' is a duplicate`)
        }
    }
    if(!foundOrNot){
        console.log('no dups found')
    }
}

