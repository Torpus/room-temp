const schedule = require('node-schedule');
const publish = require('./publish');
const probe = require('./probe');

const tempCheckScheduleRule = new schedule.RecurrenceRule();
tempCheckScheduleRule.second = [0, 15, 30, 45];

schedule.scheduleJob(tempCheckScheduleRule, async () => {
  const temps = await probe.getTemps();
  Object.keys(temps).forEach((sensor) => {
    publish(sensor, temps[sensor]);
  });
});
