// inquirer 
var inquirer = require("inquirer");

// read and write | fs is already a part of node | no need to install :)
var fs = require("fs");

// requirement for content "JSON file api"
var normalData = require("./NormalCards.json");
// console.log(normalData);

// constructor function for creating flashcard objects
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}

// inquirer prompt
function createNewCard () {
	inquirer.prompt([{
		type: "input",
		name: "front",
		message: "What is your question?"
	},{
		type: "input",
		name: "back",
		message: "What is your answer?"
	}]).then(function (answers) {
		var card = new BasicCard(answers.front, answers.back);
		// add new data to card data
		normalData.push(card);
		// only way to write to json file is a string
		var newnormalData = JSON.stringify(normalData, null, '\t');
		fs.writeFile('./NormalCards.json', newnormalData, function (error) {
			if (error) {
				return error;
			};
			console.log("Done!");
		})
	// console.log(card);
	})
}

createNewCard();






/*
// new flashcard
var firstPresident = new BasicCard 
	("Who was the first president of the United States?", "George Washington");
	// Who was the first president...
	console.log(firstPresident.front);
	// George ....
	console.log(firstPresident.back);
*/

