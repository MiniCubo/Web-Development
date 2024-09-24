const fs = require("fs")

fs.readFile("msg.txt", "utf-8", (err, fd) =>{
	console.log(fd)
})

console.log("Done with the program")