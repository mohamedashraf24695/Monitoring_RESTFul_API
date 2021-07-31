const Check = require("../models/Check");
const Report = require("../models/Report");
const axios = require("axios");


async function startProcessConfig() {
  axios.interceptors.request.use((config) => {
    config.headers["request-startTime"] = process.hrtime();

    return config;
  });

  axios.interceptors.response.use((response) => {
    const start = response.config.headers["request-startTime"];
    const end = process.hrtime(start);
    const milliseconds = Math.round(end[0] * 1000 + end[1] / 1000000);
    response.headers["request-duration"] = milliseconds;
    response.headers.status = response.status;
    return response;
  });
}

async function findAllChecks() {
  const result = await Check.find();
  return result;
}

async function updateResponseTime(checkName, email, newResponseTime) {
  await Report.updateOne(
    {
      checkname: checkName,
      email: email,
    },
    { $set: { responseTime: newResponseTime } }
  );
}

async function updateTimeStamp(checkName, email) {

  var timestamp = new Date().toISOString();

  await Report.updateOne(
    {
      checkname: checkName,
      email: email,
    },
    { $set: { Timestamp: timestamp } }
  );
}

async function updateStatus(checkName, email, newStatus) {
  await Report.updateOne(
    {
      checkname: checkName,
      email: email,
    },
    { $set: { status: newStatus } }
  );
}

async function updateUpTimes(checkName, email) {
  await Report.updateOne(
    {
      checkname: checkName,
      email: email,
    },
    { $inc: { upTimes: 1 } }
  );
}

async function updateDownTimes(checkName, email) {
  await Report.updateOne(
    {
      checkname: checkName,
      email: email,
    },
    { $inc: { downTimes: 1 } }
  );
}

async function updateUpPeriod(checkName, email, interval) {
  await Report.updateOne(
    {
      checkname: checkName,
      email: email,
    },
    { $inc: { upTimePeriod: interval } }
  );
}

async function updateDownPeriod(checkName, email, interval) {
  await Report.updateOne(
    {
      checkname: checkName,
      email: email,
    },
    { $inc: { downTimePeriod: interval } }
  );
}

async function updateAvailability(checkName, email) {
  const result = await Report.find({
    checkname: checkName,
    email: email,
  });

  if (result.length === 0) {
    return;
  }
  const upTimes = await result[0].upTimes;
  const downTimes = await result[0].downTimes;

  await Report.updateOne(
    {
      checkname: checkName,
      email: email,
    },
    { $set: { availability: (upTimes / (upTimes + downTimes)) * 100 } }
  );
}

async function updateAverageResponseTime(checkName, email, responseTime) {
  const result = await Report.find({
    checkname: checkName,
    email: email,
  });
  const upTimes = await result[0].upTimes;
  const downTimes = await result[0].downTimes;
  const lastAverageRespTime = await result[0].averageResponseTime;

  const newAverageResponTime =
    (responseTime + lastAverageRespTime * (upTimes + downTimes - 1)) /
    (upTimes + downTimes);

  await Report.updateOne(
    {
      checkname: checkName,
      email: email,
    },
    { $set: { averageResponseTime: newAverageResponTime } }
  );
}

async function historyLogger(eachReport) {
  const result = await Report.find({
    checkname: eachReport.name,
    email: eachReport.email,
  });

  await Report.updateOne(
    { email: eachReport.email, checkname: eachReport.name },
    {
      $push: {
        history: {
          responseTime: result[0].responseTime,
          upTimes: result[0].upTimes,
          downTimes: result[0].downTimes,
          availability: result[0].availability,
          upTimePeriod: result[0].upTimePeriod,
          downTimePeriod: result[0].downTimePeriod,
          averageResponseTime: result[0].averageResponseTime,
          checkname: result[0].checkname,
          email: result[0].email,
          Timestamp: result[0].Timestamp,
          status: result[0].status,
        },
      },
    }
  );
}

async function getDownTimes(checkName, email) {
  const result = await Report.find({
    checkname: checkName,
    email: email,
  });

  if (result.length === 0) {
    return;
  }
  const downTimes = await result[0].downTimes;

  return downTimes;
}

async function callWebHook(checkName, email) {
  const checkResult = await Check.find({
    name: checkName,
    email: email,
  });

  const reportResult = await Report.find({
    checkname: checkName,
    email: email,
  });



  if (await checkResult[0].webhook === undefined || reportResult[0].history.length === 0 ) {
    return;
  }


  const currentWebhook = await checkResult[0].webhook;
 const currentHistory = await reportResult[0].history;
  const instance = await axios.create();
  
await instance.post(currentWebhook, {
  "body":currentHistory
}).catch((error)=>{
}); 


}

module.exports = {
  startProcessConfig: startProcessConfig,
  findAllChecks: findAllChecks,
  updateResponseTime: updateResponseTime,
  updateTimeStamp: updateTimeStamp,
  updateStatus: updateStatus,
  updateUpTimes: updateUpTimes,
  updateDownTimes: updateDownTimes,
  updateUpPeriod: updateUpPeriod,
  updateDownPeriod: updateDownPeriod,
  updateAvailability: updateAvailability,
  updateAverageResponseTime: updateAverageResponseTime,
  historyLogger: historyLogger,
  getDownTimes: getDownTimes,
  callWebHook:callWebHook
};
