const schedule = require('node-schedule');
const db = require('./db');
const probe = require('./probe');

const tempCheckScheduleRule = new schedule.RecurrenceRule();
tempCheckScheduleRule.second = [0, 15, 30, 45];

schedule.scheduleJob(tempCheckScheduleRule, async () => {
  const temps = await probe.getTemps();
  Object.keys(temps).forEach((sensor) => {
    db(sensor, temps[sensor]);
  });
});
