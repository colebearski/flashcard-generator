// require basic flashcard module
var BasicCard = require("./BasicCard.js");
var normalData = require("./NormalCards.json");

// require cloze flashcard module
var ClozeCard = require("./ClozeCard.js");
var clozeData = require("./CoolCards.json");
// inquirer
var inquirer = require("inquirer");
// fs
var fs = require("fs");

// what do we want to do?
inquirer.prompt([{
	name: "command",
	message: "What would you like to do?",
	type: "list",
	choices: [{
		name: "add-flashcard"
	}, {
		name: "show-all-cards"
	}]
}]).then(function(answer) {
	if (answer.command === "add-flashcard") {
		addCard();
	}else if (answer.command === "show-all-cards") {
		showCards();
	};
})

// add card
var addCard = function () {
	// user input for type of card
	inquirer.prompt([{
		name: "cardType",
		message: "What kind of flashcard would you like to make?",
		type: "list",
		choices: [{
			name: "BasicCard"
		}, {
			name: "ClozeCard"
		}]
		// once we get the type
	}]).then(function(answer) {
		if (answer.cardType === "BasicCard") {
			inquirer.prompt([{
				name: "front",
				message: "What is your question?",
				validate: function(input) {
					if (input === "") {
						console.log("Please provide a question");
						return false;
					} else {
						return true;
					}
				}
			}, {
				name: "back",
				message: "What is your answer?",
				validate: function(input) {
					if (input === "") {
						console.log("Please provide an answer");
						return false;
					} else {
						return true;
					}
				}

			}]).then(function(answer) {
				var newBasic = new BasicCard(answer.front, answer.back);
				// add data to Normal Cards JSON
				normalData.push(newBasic);
				// stringify to write
				var newnormalData = JSON.stringify(normalData, null, '\t');
				fs.writeFile('./NormalCards.json', newnormalData, function (error) {
					if (error) {
						return error;
					};
					console.log("Basic Done!");
				})
				newBasic.create();
				// whatsNext();
			})
		} else if (answer.cardType === "ClozeCard") {
			inquirer.prompt([{
				name: "text",
				message: "What is the full text?",
				validate: function(input) {
					if (input === "") {
						console.log("Please provide the full text");
						return false;
					} else {
						return true;
					}
				}
			}, {
				name: "cloze",
				message: "What is the cloze portion?",
				validate: function(input) {
					if (input === "") {
						console.log("Please provide the cloze portion");
						return false;
					} else {
						return true;
					}
				}

			}]).then(function(answer) {
				var newCloze = new ClozeCard(answer.text, answer.cloze, answer.clozeDelete);
				// add data to Cloze Cards JSON
				clozeData.push(newCloze);
				// stringify
				var newclozeData = JSON.stringify(clozeData, null, '\t');
				fs.writeFile('./CoolCards.json', newclozeData, function (error) {
					if (error) {
						return error;
					};
					console.log("Cloze Done!");
				})
				newCloze.create();
			})
		};
	})
}

// show cards
var showCards = function () {
	// select which type of cards to see
	inquirer.prompt([{
		name: "flashcardType",
		message: "Would you like Cloze or Basic flashcards?",
		type: "list",
		choices: [{
			name: "Cloze"
		}, {
			name: "Basic"
		}]
		// once we specify we can then display
	}]).then(function(cardList) {
		if (cardList.flashcardType === "Cloze") {
			// read our file
			fs.readFile('./CoolCards.json', 'utf8', function(error, data) {
				// log error if..
				if (error) {
					console.log("Cloze Error: " + error);
				};
				// here we go
				console.log(data);
			})
		} else if (cardList.flashcardType === "Basic") {
			fs.readFile('./NormalCards.json', 'utf8', function(error, data) {
				if (error) {
					console.log(error);
				};
				console.log(data);
			})
		};
	})
}

// console.log the error in cloze if applicable
// format show cards


















