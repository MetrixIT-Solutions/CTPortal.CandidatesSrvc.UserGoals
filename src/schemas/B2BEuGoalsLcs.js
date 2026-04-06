/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema;

// --- Begin: B2B Partner End User Goals Lifecycles Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  goal: {type: String, index: true, required: true}, // Goal Record ID, i.e. B2BEuGoals._id

  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},
  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},
  team: {type: String, required: true},
  tName: {type: String, required: true}, // Team Name
  tCode: {type: String, required: true}, // Team Code

  euUser: {type: String, required: true},
  euName: {type: String, required: true},
  euMobCcNum: {type: String, required: false}, // Mobile Number with Country Code
  euEmID: {type: String, required: true, trim: true}, // Email ID
  euUID: {type: String, required: true}, // Reference Unique ID
  euPrimary: {type: String, required: true}, // Mobile Number or Email

  gsStr: {type: String, required: true}, // Goal Search String: gType<#$>gCategory<#$>gTitle<#$>gRvrName<#$>gRvrEmID
  gType: {type: String, required: true}, // Goal Type: Week Goal, Month Goal, Quarter Goal, Half Year Goal, Year Goal
  gCategory: {type: String, required: true}, // Goal Category: Business Goal, Career Development Goal
  gTitle: {type: String, required: false}, // Goal Title
  gAccmnts: {type: String, required: true}, // Goal Accomplishments
  gStatus: {type: String, required: true}, // Goal Status: Not Started, In Progress, Completed, Reviewed
  gsNotes: {type: String, required: false}, // Goal Status Notes
  gsDtStr: {type: [String], required: true}, // Goal Status Dates: YYYY-MM-DD

  gReview: {type: String, required: false}, // Goal Review
  grStatus: {type: Boolean, default: false}, // Goal Review Status
  grNotes: {type: String, required: false}, // Goal Review Notes
  grDtStr: {type: String, required: false}, // Goal Review Date: YYYY-MM-DD
  grRating: {type: Number, required: false}, // Goal Review Rating: Rating out of 5 or 10
  gReviewer: {type: String, required: false}, // B2BUsers._id
  gRvrName: {type: String, required: false},
  gRvrMobCcNum: {type: String, required: false},
  gRvrEmID: {type: String, required: false},
  gRvrUID: {type: String, required: false},
  gRvrPrimary: {type: String, required: false},

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({cDtStr: -1});

module.exports = mongoose.model(config.collB2BEuGoalsLcs, schema);
// --- End: B2B Partner End User Goals Lifecycles Schema --- //
