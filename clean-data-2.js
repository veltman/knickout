var fs = require("fs");

fs.readdir("data",processTeams);

var schedule = [];

var filesLeft;

function processTeams(err,fileList) {
	
	filesLeft = fileList.length;

	fileList.forEach(function(file){		

		fs.readFile("data/"+file,"utf8",processTeam);

	});
}

function processTeam(err,temp) {
	var fileContents = JSON.parse(temp);

	var mainTeam = fileContents.team.full_name;

	var toAdd = fileContents.schedule.filter(function(d){
		return d.isHomeGame;
	}).map(function(d){
		d.team1 = mainTeam;
		d.team2 = d.opponent.full_name;
		d.date = d.when.fullDateTime;

		delete d.opponent;
		delete d.isHomeGame;
		delete d.tv;
		delete d.where;		
		delete d.when;

		return d;
	});

	schedule = schedule.concat(toAdd);

	filesLeft--;

	if (!filesLeft) {
		console.log(schedule.length);
		writeSchedule(schedule);
	}

}

function writeSchedule(content) {

	content.sort(function(a,b){
		var date_a = new Date(a.date);
		var date_b = new Date(b.date);

		return date_a - date_b;

	});

	var output = [];

	var currentDate;

	content.forEach(function(d){
		var date = new Date(d.date);
		var str = date.toDateString();

		console.log(str);

		console.log(output.length);
		if (str !== currentDate) {
			output.push([]);						
		} else {
		}
		console.log(output.length);

		output[output.length-1].push(d);		

		console.log(output);

		currentDate = str;
	});


	fs.writeFile("raw-schedule.json",JSON.stringify(output,null,"\t"),function(err){
		console.log(err ? "Failure" : "Success");
	});
	
}