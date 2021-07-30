const router = require("express").Router();
const checkControllers = require("../Controllers/checkControllers");
const reportControllers = require("../Controllers/reportControllers");
const authCont = require("../middleware/authCont");


/*************************************************************************************************************************** */


router.get("/read/all", authCont.authenticateToken, async (req, res) => {
    try {
      let result = await reportControllers.findMyReports(req.useremail);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

/*************************************************************************************************************************** */

router.get(
  "/read/report/name/:report_name",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await reportControllers.findReportsByName(
        req.params.report_name,
        req.useremail
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

/*************************************************************************************************************************** */

router.get(
    "/read/tag/:tag_name",
    authCont.authenticateToken,
    async (req, res) => {
      try {

        let allChecks = await checkControllers.findChecksByTag( req.params.tag_name,
          req.useremail) ;
          console.log(allChecks);

        let result = await reportControllers.getReportsByTag(
          allChecks,
          req.useremail
        );
        console.log(result);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  );


/*************************************************************************************************************************** */





module.exports = router ;