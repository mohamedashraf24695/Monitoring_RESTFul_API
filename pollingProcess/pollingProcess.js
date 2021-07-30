const axios = require("axios");
const processControllers = require("../Controllers/processControllers");
const emailControllers = require("../Controllers/emailControllers");
/***************************************************************************** */
async function sucessSituation(resp, eachCheck) {
  await processControllers.updateTimeStamp(
    eachCheck.name,
    eachCheck.email,
  );
  await processControllers.updateResponseTime(
    eachCheck.name,
    eachCheck.email,
    resp.headers["request-duration"]
  );
  await processControllers.updateStatus(
    eachCheck.name,
    eachCheck.email,
    resp.status
  );

  await processControllers.updateUpTimes(eachCheck.name, eachCheck.email);
  await processControllers.updateUpPeriod(
    eachCheck.name,
    eachCheck.email,
    eachCheck.timeInterval
  );

  await processControllers.updateAvailability(eachCheck.name, eachCheck.email);
  await processControllers.updateAverageResponseTime(
    eachCheck.name,
    eachCheck.email,
    resp.headers["request-duration"]
  );

  await processControllers.historyLogger(eachCheck);
  await processControllers.callWebHook(eachCheck.name, eachCheck.email);



}
/***************************************************************************** */
async function failedSituation(error, eachCheck) {
  await processControllers.updateStatus(eachCheck.name, eachCheck.email, 404);

  await processControllers.updateTimeStamp(
    eachCheck.name,
    eachCheck.email,
  );


  await processControllers.updateDownTimes(eachCheck.name, eachCheck.email);
  await processControllers.updateDownPeriod(
    eachCheck.name,
    eachCheck.email,
    eachCheck.timeInterval
  );

  await processControllers.updateAvailability(eachCheck.name, eachCheck.email);
  await processControllers.updateAverageResponseTime(
    eachCheck.name,
    eachCheck.email,
    eachCheck.timeOut *1000
  );



  if(await processControllers.getDownTimes (eachCheck.name, eachCheck.email)% eachCheck.threshold === 0 ){
      await emailControllers.sendEmail(eachCheck.email,
        'Your website is failed',
      'Hello '+ eachCheck.email+' \n '+ ' Your Website ' +eachCheck.URL + "is now down during " + eachCheck.name+ "check");

  }



  await processControllers.historyLogger(eachCheck);
  await processControllers.callWebHook(eachCheck.name, eachCheck.email);

}
/***************************************************************************** */
async function callingCheckURLs(eachCheck) {
  if (eachCheck.isCheckActive) {
    const resp = await axios
      .get(eachCheck.URL, {
        timeout: (eachCheck.timeOut)*1000,
      })
      .then(async (resp) => {
        await sucessSituation(resp, eachCheck);
      })
      .catch(async (error) => {
        await failedSituation(error, eachCheck);
      });
  }
}
/***************************************************************************** */
async function mainProcess() {
  processControllers.startProcessConfig();
  let allChecks = await processControllers.findAllChecks();
  allChecks.forEach(async (eachCheck) => {
    let interval_1 = setInterval(async () => {
      callingCheckURLs(eachCheck);
      let allChecks_2 = await processControllers.findAllChecks();
      if (JSON.stringify(allChecks_2) != JSON.stringify(allChecks)) {
        clearInterval(interval_1);
        mainProcess();
      } else {
      }
    }, (eachCheck.timeInterval)*1000);
  });
  if (allChecks.length === 0 ){
    mainProcess();
  }
}
/***************************************************************************** */
module.exports = {
  mainProcess: mainProcess,
};

/***************************************************************************** */