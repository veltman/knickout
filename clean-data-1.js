var fs = require("fs");

var teamList = {};

fs.readFile("data/teams.json","utf8",
	function(err,data){
		if (err) {
			console.log(err);
			return true;
		}

		var teams = JSON.parse(data);

		teams.teams.forEach(
			function(d){
				teamList[d.full_name] = d;
			}
		);

		fs.writeFile("data/team-list.json",JSON.stringify(teamList,null,"\t"),function(err){
			if (err) console.log("Failure.");
			else console.log("Success!");
		});

	}
);