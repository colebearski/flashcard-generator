// fs
var fs = require("fs");

// export
module.exports = ClozeCard;

// requirement for data
var clozeData = require("./CoolCards.json");

// constructor for creation
function ClozeCard(text, cloze) {
	this.text = text;
	this.cloze = cloze;
	// text is our question, cloze is our answer. this replaces the answer with ____
	this.clozeDelete = this.text.replace(this.cloze, '_____');
	this.create = function () {

		var data = {
			text: this.text,
			cloze: this.cloze,
			clozeDelete: this.clozeDelete,
			type: "cloze"
		};
	}
}

