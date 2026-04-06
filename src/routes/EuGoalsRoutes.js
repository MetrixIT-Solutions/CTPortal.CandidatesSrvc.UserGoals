/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const gCtrl = require('../controllers/EuGoalsCtrl');

module.exports.controller = (app) => {

  app.get('/', gCtrl.apiServerStatus);

  app.post('/ctpcust/v1/eu/goal/list', gCtrl.getEuGoalList);
  app.post('/ctpcust/v1/eu/goal/create', gCtrl.postEuGoalCreate);
  app.put('/ctpcust/v1/eu/goal/update/:recordId', gCtrl.putEuGoalUpdate);
  app.put('/ctpcust/v1/eu/goal/status/update/:recordId', gCtrl.putEuGoalStatusUpdate);
  app.put('/ctpcust/v1/eu/goal/delete/:recordId', gCtrl.putEuGoalDelete);

}