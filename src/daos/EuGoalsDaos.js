/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const euGoals = require('../schemas/B2BEuGoals');

const getEuGoalList = (reqBody, query, callback) => {
  let resultObj = { gListCount: 0, gList: [] };
  if (reqBody.lKey == 'expAll') {
    euGoals.find(query).then((resObj) => {
      if (resObj && resObj.length > 0) {
        const sr = SetRes.successRes(resObj);
        callback(sr);
      } else {
        const noData = SetRes.noData(resultObj);
        callback(noData);
      }
    }).catch((error) => {
      logger.error('Un-known Error in daos/EuGoalsDaos.js, at getEuGoalList:' + error);
      const err = SetRes.unKnownErr(resultObj);
      callback(err);
    });
  } else {
    euGoals.find(query).skip((reqBody.pgNum - 1) * reqBody.limit).limit(reqBody.limit).then((resObj) => {
      if (resObj && resObj.length > 0) {
        getEuGoalListCount(query, resObj, callback);
      } else {
        const noData = SetRes.noData(resultObj);
        callback(noData);
      }
    }).catch((error) => {
      logger.error('Un-known Error in daos/EuGoalsDaos.js, at getEuGoalList:' + error);
      const err = SetRes.unKnownErr(resultObj);
      callback(err);
    });
  }
}

const postEuGoalCreate = (createObj, callback) => {
  createObj.save().then((resObj) => {
    if (resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const sf = SetRes.createFailed({});
      callback(sf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuGoalsDaos.js, at postEuGoalCreate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const putEuGoalUpdate = (query, updateObj, callback) => {
  euGoals.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bEuGoalsDaos.js, at putEuGoalUpdate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

module.exports = {
    getEuGoalList, postEuGoalCreate, putEuGoalUpdate
};

const getEuGoalListCount = (query, resObj, callback) => {
  let resultObj = { gListCount: 0, gList: resObj };
  euGoals.countDocuments(query).then((resultCount) => {
    if (resultCount) {
      resultObj = { gListCount: resultCount, gList: resObj };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const result = SetRes.successRes(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bEuGoalsDaos.js, at getB2bEuGoalListCount:' + error);
    const result = SetRes.successRes(resultObj);
    callback(result);
  });
};
