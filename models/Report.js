const mongoose = require('mongoose');





const reportSchema = new mongoose.Schema({
  checkname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
status:{
  type: String,
  default: "initially no status",
} , 

  responseTime: {
    type: Number,
    default: 0,
  },
  upTimes: {
    type: Number,
    default: 0,
  },
  downTimes: {
    type: Number,
    default: 0,
  },
  availability: {
    type: Number,
    default: 0,
  },
  upTimePeriod: {
    type: Number,
    default: 0,
  },
  downTimePeriod: {
    type: Number,
    default: 0,
  },
  averageResponseTime: {
    type: Number,
    default: 0,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
  history: {
    type: [Object],
  }
});



module.exports=mongoose.model('Report',reportSchema);