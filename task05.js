let path = "";
//path+=process.argv[2];
path+='D:\\SaNyA\\BSTU\\PSCA\\cwp-01\\task05_test\\';

let summary = "";

var fs = require('fs');

function scandir(paths){
fs.readdir(paths, function(err, items){
    for (var i = 0; i<items.length; i++) {
        if(items[i].indexOf('.') != -1)
            summary+="console.log(" + items[i] + "); ";
        else
            scandir(paths + items[i] + "\\")
    }
});
writesummary(paths);
}

scandir(path) => writesummary(path);

function writesummary(paths){
fs.writeFile(paths+='summary.js', summary, function(err)
{
    if(err) {
        return console.log("ERROR: Bad path, {" + err + "}");
    } else {
        //console.log("File saved");
    }
});
}