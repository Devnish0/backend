const chalk = require("chalk");
console.log(chalk.blue("Hello world!"));

//! NPM understanding

//? npm - node pakage manager (node apps )
//* node pakage manager (initially only node application) ==> later more than only node apps (changed to npm)
//* ? codebases downloader knowns as packages
//* package vs module =>
//* jo nodejs ke core me installed hota hai (modules)
//* no npm se install karte hai wo package
//** example=> tts(text to speech) npm package

//------------------------------------------------//

//! installing and uninstalling anything basics & advance
//* install => npm i/install packageName
//* uninstall => npm uninstall packageName
//* update => npm update packageName
//* view all installed packages => npm list
//* instaling particular version => npm i accessibility@0.2.1

//------------------------------------------------//

// understanding node modules

//------------------------------------------------//

// dependency - pakages and pakages ki dependencies

//------------------------------------------------//

// devdependency - used during development only not when the actual app is developed example -nodemon, eslint, jest, mocha, typescript
//? example - npm install nodemon --save-dev

//------------------------------------------------//

// scripts - understanding default scripts PATH and custom  scripts

console.log("script ran");
