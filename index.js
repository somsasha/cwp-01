const name = [];

for (var i = 2; i<process.argv.length; i++) name[i-2] = process.argv[i];

function con(mas) {
    var s = ""
    for(var i=0; i<mas.length; i++) s += mas[i] + " "
    return s
  }

console.log(`Hi ${con(name)}!`);