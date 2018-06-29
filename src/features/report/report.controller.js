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
const reportBo = require('./report.bo');
const HttpStatus = require('http-status-codes');
const logger = require('../../utils/logger');
const coreController = require('../core/core.controller');
const reportControllerValidation = require('./report.controller.validation');
const constants = require('../../utils/constants');

const reportController = {
    save(req, res, next) {
        const saveReport = req.body;
        coreController.bodyValidation(req, res, next, reportControllerValidation.getSaveReportSchema(), () => {
            reportBo
                .save(saveReport)
                .then(report => res.status(HttpStatus.CREATED).send(report))
                .catch(error => next(error));
        });
    },

    syncData(req, res, next) {
        const ifModifiedSince = req.header(constants.HTTP_HEADER_IF_MODIFIED_SINCE);
        reportBo
            .syncData(ifModifiedSince)
            .then(syncInfos => {
                if (!syncInfos.syncData) {
                    res.status(HttpStatus.NOT_MODIFIED).send();
                } else {
                    res.setHeader(constants.HTTP_HEADER_LAST_MODIFIED, syncInfos.lastUpdate);
                    res.status(HttpStatus.OK).send(syncInfos.syncData);
                }
            })
            .catch(error => next(error));
    }
};

module.exports = {
    reportController
};