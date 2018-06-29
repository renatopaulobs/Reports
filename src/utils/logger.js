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
const constants = require('./constants.js');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const ERROR_LOG_PATH = './log/error.log';
const COMBINED_LOG_PATH = './log/combined.log';
const MORGAN_LOG_PATH = './log/morgan.log';

const tsFormat = () => (new Date().toISOString());

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.File({ filename: ERROR_LOG_PATH, level: 'error', timestamp: tsFormat }),
        new transports.File({ filename: COMBINED_LOG_PATH, timestamp: tsFormat })
    ]
});

const morganLogger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.File({ filename: MORGAN_LOG_PATH, timestamp: tsFormat })
    ]
});


if (process.env.NODE_ENV !== 'production') {
    morganLogger.add(new transports.Console({
        format: combine(
            timestamp(),
            logFormat
        )
    }));
    logger.add(new transports.Console({
        format: combine(
            timestamp(),
            logFormat
        )
    }));
}

module.exports = logger;
module.exports = morganLogger;

module.exports.stream = {
    write: function (message, encoding) {
        morganLogger.info(message);
    }
};
