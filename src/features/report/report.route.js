/*
* Copyright (c) 2018 Samsung Electronics Co., Ltd. , (c) Center of Informatics
* Federal University of Pernambuco.
* All rights reserved.
*
* This software is a confidential and proprietary information of Samsung
* Electronics, Inc. ("Confidential Information"). You shall not disclose such
* Confidential Information and shall use it only in accordance with the terms
* of the license agreement you entered into with Samsung Electronics.
*/


'use strict';
const REPORT_URL = '/v1/report';
const Router = require('express').Router;
const reportRouter = Router();
const reportController = require('./report.controller').reportController;
const coreController = require('../core/core.controller');

/**
 * Sync data for mobile client.
 * @route GET /report/syncdata
 * @group Report - Operations about reports
 * @param {string} If-Modified-Since.header Date and time of the last sync operation
 * @returns {SyncData.model} 200- Data used to fill a report
 * @returns {} 304- The data are same
 */
reportRouter.get(coreController.PATH_ROOT+'syncdata', reportController.syncData);

/**
 * Save a report.
 * @route POST /report
 * @group Report - Operations about reports
 * @param {Report.model} report.body.required Report to add.
 * @returns {Report.model} 201- Add a new report
 * @returns {Error}  400- 	Invalid input
 */
reportRouter.post(coreController.PATH_ROOT, reportController.save);

module.exports = (app) => {
    app.use(REPORT_URL, reportRouter);
};