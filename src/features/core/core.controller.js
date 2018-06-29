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
const Joi = require('joi');
const I18NHelper = require('../../utils/locale/I18N.helper');
const PATH_ROOT_ID = '/:id';
const PATH_ROOT = '/';

module.exports = {
    validation(req, value, schema, next, callback) {
        Joi.validate(value, schema, {
            abortEarly: false,
            allowUnknown: true,
            language: I18NHelper.getJoiMessages()
        }, (err, value) => {
            if (err) {
                next(err);
            } else {
                return callback();
            }
        });
    },

    bodyValidation(req, res, next, schema, callback) {
        this.validation(req, req.body, schema, next, callback);
    },

    queryParamsValidation(req, res, next, schema, callback) {
        this.validation(req, req.params, schema, next, callback);
    },
    PATH_ROOT_ID,
    PATH_ROOT
};