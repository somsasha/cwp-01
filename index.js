let name = [];

for (let i = 2; i<process.argv.length; i++) name[i-2] = process.argv[i];

function con(mas) {
    let s = ""
    for(var i=0; i<mas.length; i++) s += mas[i] + " "
    return s
  }

console.log(`Hi ${con(name)}!`);