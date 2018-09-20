const input = process.argv[2];
var path = require('path');
const fs = require('fs');
const folder = path.relative(path.dirname(input), input);
var copyright = "";

fs.readFile(process.cwd() + "\\config.json", (err, data) => {
							const jsonObj = JSON.parse(data);
							copyright = jsonObj.copyright;
						})

function readFolder(file_path)
{
	fs.readdir(file_path, (err, items) => {
		if (err) throw err; 
		items.forEach(item => {
			fs.stat(path.resolve(file_path, item), (err, stat) => {
				const filedir = path.resolve(file_path, item);
				if (stat && stat.isDirectory() & item != ".git" & item != folder) {
					readFolder(filedir)
				}
				else {
					fs.appendFile("summary.js","console.log(\"" + path.relative(file_path, filedir) + "\");\n", (err) => {
						if (err) throw err;
						if (path.extname(filedir) == ".txt")
						{
							var copyFileDir = input + "\\" + folder + "\\" + item;
							fs.writeFile(copyFileDir, copyright, (err) => {
								fs.readFile(filedir, (err, data) => {
									fs.appendFile(copyFileDir, data, (err) => {
										fs.appendFile(copyFileDir, copyright, (err) => {
											console.log(copyFileDir);
										})
									})
								});
							})
						}
					});

				}
			})
		})
	})
}
fs.writeFile("summary.js", "//v0.1\n", (err) => {
	if (err) throw err;
})

fs.mkdir(input + "\\" + folder, (err) => {
});

readFolder(input);


fs.watch(input + "\\" + folder, (eventType, filename) => {
							if (eventType == "change") { console.log(filename); }
						})