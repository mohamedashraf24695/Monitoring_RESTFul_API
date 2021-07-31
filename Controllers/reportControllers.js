const Report = require("../models/Report");

async function existanceOfSameReportName(name, email) {
    try {
      let check_existance = await Report.exists({
        checkname: name,
        email: email,
      });
  
      if (check_existance) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.message;
    }
  }
  
async function createReport(name, email,tags) {
    const nameExistance = await existanceOfSameReportName(name, email);
    const newReport = {
        checkname: name,
      email: email,
      tags: tags
    };
  
    if (nameExistance === true) {
      return "Report name is already exist associated to your email";
    } else if (nameExistance === false) {
      await Report.create(newReport);
  
      return "A new check is created";
    } else {
      // if it returns error (not true nor false)
  
      return nameExistance;
    }
  }

  async function updateReportName(oldName, newName) {
    await Report.updateOne(
      {
        checkname: oldName,
      },
      { $set: { checkname: newName } }
    );

    return { message: "Name is updated" };
  }


  
  async function findMyReports(email) {
    const result = await Report.find({
      email: email,
    });
    return result;
  }


  async function findReportsByName(name, email) {
    const result = await Report.find({
      checkname: name,
      email: email,
    });
  
    return result;
  }
  

  async function deleteReport(email , name ) {
  

      await Report.deleteOne({   checkname: name,
        email: email });
      return {
        message: name + " Report is deleted successfully",
      };
   
  }
  

  async function deleteAllMyReports(email) {
    await Report.deleteMany({ email : email});
  
    return { message: "All your reports are deleted successfully ! " };
  }
  

  /*
async function findReportsByTag (targetTag,email){


  const result = await Report.find({
    email: email,
    tags: targetTag
  });

  return result;


}
*/

async function getReportHistory(name, email) {
  const result = await Report.find({
    checkname: name,
    email: email,
  });

const history = await result[0].history;

  return history;
}


async function getReportsByTag(allChecks , email){

  const names = [] ; 

  await allChecks.forEach(e=>{
    names.push(e.name) ; 
  })

const result = await Report.find({
  checkname: {$in : names},
  email: email,
})

return result ;

}




  module.exports= {
    createReport:createReport,
    updateReportName:updateReportName,
    findMyReports:findMyReports,
    findReportsByName:findReportsByName,
    deleteReport:deleteReport,
    deleteAllMyReports:deleteAllMyReports,
    getReportHistory:getReportHistory,
    getReportsByTag:getReportsByTag
  }