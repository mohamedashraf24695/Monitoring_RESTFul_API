const express = require("express");
const router = require("express").Router();
const checkControllers = require("../Controllers/checkControllers");
const reportControllers = require("../Controllers/reportControllers");
const authCont = require("../middleware/authCont");
/************************************************************************************************************************** */

router.post("/create", authCont.authenticateToken, async (req, res) => {
  let name = req.body.name;
  let email = req.useremail;
  let URL = req.body.URL;
  let timeInterval = req.body.timeInterval;
  let threshold = req.body.threshold;
  let timeOut = req.body.timeOut;
  let tags = req.body.tags;
  let webhook = req.body.webhook;

  try {
    let result = await checkControllers.createCheck(
      name,
      email,
      URL,
      timeInterval,
      timeOut,
      threshold,
      tags,
      webhook
    );

    await reportControllers.createReport(name, email, tags);

    res.status(200).json({
      message: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/************************************************************************************************************************** */

router.post("/pause", authCont.authenticateToken, async (req, res) => {
  let name = req.body.name;
  let email = req.useremail;
  try {
    const result = await checkControllers.pauseCheck(email, name);

    res.status(200).json({
      message: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/************************************************************************************************************************** */

router.post("/active", authCont.authenticateToken, async (req, res) => {
  let name = req.body.name;
  let email = req.useremail;
  try {
    const result = await checkControllers.activeCheck(email, name);

    res.status(200).json({
      message: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/************************************************************************************************************************** */

router.get(
  "/read/one/:check_name",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.findCheckByName(
        req.params.check_name,
        req.useremail
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

/************************************************************************************************************************** */


router.get(
  "/read/tag/:tag_name",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.findChecksByTag(
        req.params.tag_name,
        req.useremail
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

/************************************************************************************************************** */

router.get("/read/all", authCont.authenticateToken, async (req, res) => {
  try {
    let result = await checkControllers.findMyChecks(req.useremail);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/************************************************************************************************************************** */

router.patch(
  "/update/check/name",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.updateCheckName(
        req.body.oldName,
        req.body.newName
      );

      await reportControllers.updateReportName(
        req.useremail,
        req.body.oldName,
        req.body.newName
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

/************************************************************************************************************************** */

router.patch(
  "/update/check/URL",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.updateCheckURL(
        req.useremail,
        req.body.checkName,
        req.body.newURL
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

/************************************************************************************************************************** */

router.patch(
  "/update/tags/add",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.pushNewTag(
        req.useremail,
        req.body.checkName,
        req.body.newTag
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
/************************************************************************************************************************** */

router.patch(
  "/update/tags/one",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.updateTag(
        req.useremail,
        req.body.checkName,
        req.body.oldTag,
        req.body.newTag
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
/************************************************************************************************************************** */

router.delete(
  "/delete/tags/all",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.deleteAllTags(
        req.useremail,
        req.body.checkName
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
/************************************************************************************************************************** */

router.delete(
  "/delete/tags/one/",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.deleteOneTag(
        req.useremail,
        req.body.checkName,
        req.body.targetTag
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

/************************************************************************************************************************** */

router.delete(
  "/delete/check/one",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.deleteCheck(
        req.useremail,
        req.body.checkName
      );

      await reportControllers.deleteReport(req.useremail, req.body.checkName);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

/************************************************************************************************************************** */

router.delete(
  "/delete/check/all",
  authCont.authenticateToken,
  async (req, res) => {
    try {
      let result = await checkControllers.deleteAllMyChecks(req.useremail);

      await reportControllers.deleteAllMyReports(req.useremail);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

/**************************************************************************************************************** */

module.exports = router;
