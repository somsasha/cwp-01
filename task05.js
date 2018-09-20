const input = process.argv[2];
var path = require('path');
const fs = require('fs');
const folderName = path.relative(path.dirname(process.cwd()), process.cwd());
var copyright = "";

fs.readFile(process.cwd() + "\\config.json", (err, data) => {
							const jsonObj = JSON.parse(data);
							copyright = jsonObj.copyright;
						})

function readFolder(dir)
{
	console.log("Jump into folder");
	fs.readdir(dir, (err, files) => {
		if (err) throw err; 
		files.forEach(file => {
			fs.stat(path.resolve(dir, file), (err, stat) => {
				const filedir = path.resolve(dir, file);
				if (stat && stat.isDirectory() & file != ".git" & file != folderName) {
					readFolder(filedir)
				}
				else {
					fs.appendFile("summary.js","console.log(\"" + path.relative(input, filedir) + "\");\n", (err) => {
						if (err) throw err;
						if (path.extname(filedir) == ".txt")
						{
							var copyFileDir = process.cwd() + "\\" + folderName + "\\" + file;
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

fs.mkdir(input + "\\" + folderName, (err) => {
});

readFolder(input);


//fs.watch(process.cwd() + "\\" + folderName, (eventType, filename) => {
//							if (eventType == "change") { console.log(filename); }
//						})