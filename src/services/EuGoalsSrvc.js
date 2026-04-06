/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const gDaoimpl = require('../daos/daosimpls/EuGoalsDaosImpl');
const gDao = require('../daos/EuGoalsDaos');

const getEuGoalList = (reqBody, tData, callback) => {
  const obj = gDaoimpl.goalList(reqBody, tData);
  gDao.getEuGoalList(reqBody, obj, callback);
}

const postEuGoalCreate = (reqBody, tData, callback) => {
  const crtObj = gDaoimpl.goalCreateObj(reqBody, tData);
  gDao.postEuGoalCreate(crtObj, resObj => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject());
      const lfcObj = gDaoimpl.goallfcCreateObj(obj, tData);
      gDao.postEuGoalCreate(lfcObj, resObj => {});
    }
    callback(resObj);
  });
}

const putEuGoalUpdate = (recordId, reqBody, tData, callback) => {
  const updObj = gDaoimpl.updategoalObj(recordId, reqBody, tData);
  gDao.putEuGoalUpdate(updObj.query, updObj.uObj, resObj => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject());
      const lfcObj = gDaoimpl.goallfcCreateObj(obj, tData);
      gDao.postEuGoalCreate(lfcObj, resObj => {});
    }
    callback(resObj);
  });
}

const putEuGoalStatusUpdate = (recordId, reqBody, tData, callback) => {
  const updObj = gDaoimpl.stsUpdategoalObj(recordId, reqBody, tData);
  gDao.putEuGoalUpdate(updObj.query, updObj.uObj, resObj => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject());
      const lfcObj = gDaoimpl.goallfcCreateObj(obj, tData);
      gDao.postEuGoalCreate(lfcObj, resObj => {});
    }
    callback(resObj);
  });
}

const putEuGoalDelete = (recordId, tData, callback) => {
  const updObj = gDaoimpl.glDltObj(recordId, tData);
  gDao.putEuGoalUpdate(updObj.query, updObj.uObj, resObj => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject());
      const lfcObj = gDaoimpl.goallfcCreateObj(obj, tData);
      gDao.postEuGoalCreate(lfcObj, resObj => {});
    }
    callback(resObj);
  });
}

module.exports = {
  getEuGoalList, postEuGoalCreate, putEuGoalUpdate, putEuGoalStatusUpdate, putEuGoalDelete
}