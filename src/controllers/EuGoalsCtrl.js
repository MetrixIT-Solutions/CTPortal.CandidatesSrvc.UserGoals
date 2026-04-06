/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const gCv = require('../controllers/apiVldns/EuGoalsCtrlVldn');
const gSrvc = require('../services/EuGoalsSrvc');
const util = require('../lib/util');
const SetRes = require('../SetRes');
const tokens = require('../tokens');

const apiServerStatus = (req, res) => {
  const resObj = SetRes.apiServerStatus();
  util.sendApiRes(res, resObj);
}

const getEuGoalList = (req, res) => {
  const vds = gCv.goalListVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = gCv.tokenVldn(tData);
      if (tv.flag) {
        gSrvc.getEuGoalList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const postEuGoalCreate = (req, res) => {
  const vds = gCv.gCreateVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = gCv.tokenVldn(tData);
      if (tv.flag) {
        gSrvc.postEuGoalCreate(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putEuGoalUpdate = (req, res) => {
  const vds = gCv.gUpdteVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = gCv.tokenVldn(tData);
      if (tv.flag) {
        gSrvc.putEuGoalUpdate(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putEuGoalStatusUpdate = (req, res) => {
  const vds = gCv.gStsUpdteVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = gCv.tokenVldn(tData);
      if (tv.flag) {
        gSrvc.putEuGoalStatusUpdate(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putEuGoalDelete = (req, res) => {
  const vds = gCv.gDeleteVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = gCv.tokenVldn(tData);
      if (tv.flag) {
        gSrvc.putEuGoalDelete(req.params.recordId, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

module.exports = {
  apiServerStatus, getEuGoalList, postEuGoalCreate, putEuGoalUpdate, putEuGoalStatusUpdate, putEuGoalDelete
}