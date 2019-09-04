const CronJob = require('cron').CronJob;
// const petVaccineService = require('../server/pet/petVaccine/petVaccine.service');
// const petMedicineService = require('../server/pet/petMedicine/petMedicine.service');
const config = require('./config');

const cronService = {
  start: () => {
    // a cada 5 min
    new CronJob(
      '*/5 * * * *',
      () => {
        console.log("job")
        // petVaccineService.checkPetNotifications();
        // petMedicineService.checkPetNotifications();
      },
      null,
      true,
      config.tz
    );

    // DEBUG
    // petVaccineService.checkPetNotifications();
    // petMedicineService.checkPetNotifications();
  }
};

module.exports = cronService;
