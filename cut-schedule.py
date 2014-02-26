import json
import datetime

schedule_list = json.loads(open("raw-schedule.json").read())

#print datetime.date.today()
index = 0

for i in range(len(schedule_list)):
	datetext = schedule_list[i][0]["date"][:10]
	date = datetime.date(int(datetext[:4]),int(datetext[5:7]), int(datetext[8:]))
	if date == datetime.date.today():
		index = i
		break

print index

open("raw-schedule-future.json","w").write(json.dumps(schedule_list[index:]))


