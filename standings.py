import json
import requests
from bs4 import BeautifulSoup

url = "http://www.nba.com/standings/team_record_comparison/conferenceNew_Std_Div.html"

results = requests.get(url).text

soup = BeautifulSoup(results)

divs = soup.find_all("div",id="nbaFullContent")

div = divs[0]

table = div.find_all("table",class_="mainStandings")[0]

team_list = json.loads(open("team-list.json").read())

for row in table.find_all("tr"):
	if row.find_all("td",class_="team"):
		team = row.find("td",class_="team").find("a").text.strip()
		cells = row.find_all("td")
		
		matches = 0	

		for stub in team_list:
			if team_list[stub]["location"] == team or (stub == "los-angeles-clippers" and team == "L.A. Clippers") or (stub == "los-angeles-lakers" and team == "L.A. Lakers"):
				matches = matches+1
				team_list[stub]["W"] = int(cells[1].text)
				team_list[stub]["L"] = int(cells[2].text)
				team_list[stub]["standingsAsOf"] = "2014-02-23"

		print team+": "+str(matches)

open("team-list-with-standings.json","w").write(json.dumps(team_list))
