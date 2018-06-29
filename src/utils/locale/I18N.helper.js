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
const locale = require('locale');
let defaultLanguage = 'pt_BR';
let supportedLanguages = [defaultLanguage, 'en_US', 'es_LA'];
let requestLanguage = defaultLanguage;

const joiLanguageBasePath = './joi.language.';
const businessErrorLanguageBasePath = './business.error.messages.';
const labelLanguageBasePath = './label.';

const defaultJoiLanguagePath = joiLanguageBasePath + defaultLanguage;
const defaultBusinessErrorLanguagePath = businessErrorLanguageBasePath + defaultLanguage;
const defaultLabelLanguagePath = labelLanguageBasePath + defaultLanguage;

function getLaguage(languageBasePath, defaultLanguagePath) {
    let selectedLanguage = require(languageBasePath + requestLanguage);

    if (!selectedLanguage) {
        selectedLanguage = require(defaultLanguagePath);
    }
    return selectedLanguage;
}

module.exports =
    {
        setRequestLanguage(req) {
            requestLanguage = req.locale;
        },

        getJoiMessages() {
            let selectedJoiLanguage = getLaguage(joiLanguageBasePath, defaultJoiLanguagePath);

            return selectedJoiLanguage.errors;
        },

        getBusinessErrorMessages() {
            let bussinessErrorLanguage = getLaguage(businessErrorLanguageBasePath, defaultBusinessErrorLanguagePath);

            return bussinessErrorLanguage.errors;
        },

        getLabels() {
            let labelLanguage = getLaguage(labelLanguageBasePath, defaultLabelLanguagePath);

            return labelLanguage.labels;
        },

        defaultLanguage,
        supportedLanguages
    };