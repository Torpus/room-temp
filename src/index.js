const schedule = require('node-schedule');
const probe = require('./probe');

const tempCheckScheduleRule = new schedule.RecurrenceRule();
tempCheckScheduleRule.second = [0, 15, 30, 45];

schedule.scheduleJob(tempCheckScheduleRule, () => {
  probe();
});
