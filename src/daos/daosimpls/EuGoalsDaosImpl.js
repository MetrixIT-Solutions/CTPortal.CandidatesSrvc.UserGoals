/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var {v4: uuidv4} = require('uuid');

const euGoals = require('../../schemas/B2BEuGoals');
const euGoalsLcs = require('../../schemas/B2BEuGoalsLcs');
const cs = require('../../services/CommonSrvc');
const {cuType} = require('../../consts/EuGoalsConsts.json');

const goalList = (reqBody, tData) => {
  const searchStr = reqBody.searchStr || '';
  const gsObj = reqBody.gStatus !== 'All' ? {gStatus: reqBody.gStatus} : {};
  return {delFlag: false, b2b: tData.b2b, euUser: tData.iss, ...gsObj,
    $or: [
      { 'gsStr': { $regex: searchStr, $options: 'i' } }
    ]
  };
}

const goalCreateObj = (reqBody, tData) => {
  const data = setGoalCrtObj(reqBody, tData);
  return new euGoals(data);
}

const goallfcCreateObj = (data, tData) => {
  const obj = setGoalLfcData(data, tData);
  return new euGoalsLcs(obj);
}

const updategoalObj = (_id, reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const query = {_id, delFlag: false, b2b: tData.b2b};

  const uObj = {
    gType: reqBody.gType,
    gCategory: reqBody.gCategory,
    // gTitle: reqBody.gTitle,
    gAccmnts: reqBody.gAccmnts,
    gStatus: reqBody.gStatus,
    gsNotes: reqBody.gsNotes || '',
    gsDtStr: reqBody.gsDtStr, // [reqBody.gsDtStr],

    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };

  return {query, uObj};
}

const stsUpdategoalObj = (_id, reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const query = {_id, delFlag: false, b2b: tData.b2b};

  const uObj = {
    gStatus: reqBody.gStatus,
    gsNotes: reqBody.gsNotes,
    gsDtStr: reqBody.gsDtStr,
    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };

  return {query, uObj};
}

const glDltObj = (_id, tData) => {
  const curUtc = cs.currUTCObj();
  const query = {_id, delFlag: false, b2b: tData.b2b};

  const uObj = {
    delFlag: true,

    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };

  return {query, uObj};
}

module.exports = {
  goalList, goalCreateObj, goallfcCreateObj, updategoalObj, stsUpdategoalObj, glDltObj
};

const setGoalCrtObj = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    _id: uuidv4(),
    b2b: tData.b2b, b2bName: tData.bn, b2bCode: tData.bc,
    org: tData.org, orgName: tData.on, orgCode: tData.oc,    
    team: tData.ot, tName: tData.otn, tCode: tData.otc,
    euUser: tData.iss, euName: tData.fn + ' ' +tData.ln, euMobCcNum: tData.mn, euEmID: tData.eid, euUID: tData.uid, euPrimary: tData.mp,

    gsStr: reqBody.gType+'<#$>'+reqBody.gCategory+'<#$>'+reqBody.gTitle,
    gType: reqBody.gType,
    gCategory: reqBody.gCategory,
    // gTitle: reqBody.gTitle,
    gAccmnts: reqBody.gAccmnts,
    gStatus: reqBody.gStatus,
    gsNotes: reqBody.gsNotes || '',
    gsDtStr: [reqBody.gsDtStr],

    cuType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr,
    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr

  };
}

const setGoalLfcData = (data, tData) => {
  const curUtc = cs.currUTCObj();

  return {
    ...data,
    _id: uuidv4(),
    goal: data._id,

    cuType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr,
  }
}
