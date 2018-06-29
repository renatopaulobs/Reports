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
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorhandler = require('strong-error-handler');
const appRoutes = require('./app.routes');
const expressValidation = require('express-validator');
const HttpStatus = require('http-status-codes');
const constants = require('../utils/constants');
const morganLogger = require('../utils/logger');
const locale = require('locale');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const trim = require('deep-trim-node');
const I18NHelper = require('../utils/locale/I18N.helper');

if (constants.ENABLE_SWAGGER) {
    const expressSwagger = require('express-swagger-generator')(app);
    let options = {
        swaggerDefinition: {
            info: {
                description: 'Report Microservice API',
                title: 'Report Microservice API',
                version: '0.4'
            },
            host: constants.HOST + ':' + constants.PORT,
            basePath: '/v1',
            produces: [
                'application/json',
                'application/xml'
            ],
            schemes: ['http', 'https']
        },
        basedir: __dirname, // app absolute path

        files: ['../features/**/*.js'] // Path to the API handle folder
    };
    expressSwagger(options);
}

// Security Settings
// https://www.npmjs.com/package/helmet#how-it-works
// By default, helmet disables DNS prefetching, protects against frame-based attacks (like clickjacking)
// removes the X-Powered-By header (blocking people from knowing which server version is running), forces
// using HTTPS, disables browser's mime type sniffing and adds very basic protection against XSS.
app.use(helmet());
// Enabled to comply with FR_10.0 1 Back after logout
app.use(helmet.noCache());
app.use(helmet.hsts({
    setIf: (req, res) => constants.ENABLE_FORCE_HTTPS
}));
// TODO: Consider using helmet.hpkp() [JIRA: LSTRS-19]
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ['\'self\''],
        // TODO: The amazonaws.com domain must be changed when we have our S3 buckets configured, to
        // restrict only to content in the specific bucket. [JIRA: LSTRS-20]
        imgSrc: ['\'self\'', '\'amazonaws.com\'']
    }
}));


app.use(compression());
app.use(locale(I18NHelper.supportedLanguages, I18NHelper.defaultLanguage));
app.use(expressValidation());
app.use(express.static(__dirname + '/../client/app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json(
    {
        type: 'application/vnd.api+json'
    }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Expose-Headers', 'x-total-count');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');

    next();
});

app.use(logger(constants.TYPE_LOG_DEV));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: false
    }));
morganLogger.debug('Overriding Express logger');
app.use(require('morgan')({ 'stream': morganLogger.stream }));

app.use((req, res, next) => {
    if (req.body) {
        req.body = trim(req.body);
    }
    next();
});

app.use((req, res, next) => {
    I18NHelper.setRequestLanguage(req);
    next();
});

appRoutes(app);

app.use((err, req, res, next) => {
    if (err.isJoi) {
        res.status(HttpStatus.BAD_REQUEST).json({
            errors: err.details.map(dt => ({ message: dt.message, context: dt.context, path: dt.path }))
        });
    }
    else if (err.IsBusinessError) {
        res.status(err.status).json({
            errors: [err.message]
        });
    }
    else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
        {
            message: 'INTERNAL SERVER ERROR'
        });
    return next(err);
});

module.exports = app;