// read and write | fs is already a part of node | no need to install :)
var fs = require("fs");

// export
module.exports = BasicCard;

// requirement for content "JSON file api"
var normalData = require("./NormalCards.json");
// console.log(normalData);

// constructor function for creating flashcard objects
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
	this.create = function () {

		var data = {
			front: this.front,
			back: this.back,
			type: "basic"
		};
	}
}
