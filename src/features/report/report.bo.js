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
const reportDao = require('./report.dao');
const HttpStatus = require('http-status-codes');
const businessError = require('../../utils/business.error');
const constants = require('../../utils/constants');
const format = require('string-format');
const I18NHelper = require('../../utils/locale/I18N.helper');
const axios = require('axios');
const lodash = require('lodash');

require('dotenv').config();

const getAllProductsUrl = 'v1/product';
const getAllDefectssUrl = 'v1/defect';

function httpGet(URL) {
    return new Promise((resolve, reject) => {
        let baseURL = process.env.PRODUCT_DEFECT_MICROSERVICE_BASE_URL;
        if (!baseURL) {
            reject(new businessError(I18NHelper.getBusinessErrorMessages().DEFECT_NOT_FOUND, HttpStatus.NOT_FOUND));
        }
        let completedURL = process.env.PRODUCT_DEFECT_MICROSERVICE_BASE_URL + URL;

        axios.get(completedURL)
            .then(function (response) {
                return resolve(response.data);
            })
            .catch(function (error) {
                if (error.code === constants.HTTP_ERROR_CODE_ECONNREFUSED) {
                    return reject(new businessError(I18NHelper.getBusinessErrorMessages().PRODUCT_DEFECT_MICROSERVICE_UNAVAILABLE, HttpStatus.SERVICE_UNAVAILABLE));
                }
                else {
                    return reject(new businessError(I18NHelper.getBusinessErrorMessages().PRODUCT_DEFECT_MICROSERVICE_UNKNOWN, HttpStatus.INTERNAL_SERVER_ERROR));
                }
            });
    });
}

const reportBo = {
    save(report, error) {
        return new Promise((resolve, reject) => {
            reportDao.save(report).then((report) => {
                return resolve(report);
            }).catch((err) => {
                reject(err);
            });

        });
    },

    syncData(ifModifiedSince) {
        return new Promise((resolve, reject) => {
            httpGet(getAllProductsUrl)
                .then(function (products) {
                    httpGet(getAllDefectssUrl)
                        .then(function (defects) {
                            let syncData = { products: products, defects: defects };

                            const sysPeriods = products.map(product => product.sysPeriod[0]).concat(defects.map(defect => defect.sysPeriod[0]));
                            const maxSysPeriod = lodash.max(sysPeriods);

                            let syncInfos;
                            if (ifModifiedSince && maxSysPeriod) {
                                if (maxSysPeriod > ifModifiedSince) {
                                    syncInfos = { syncData: syncData, lastUpdate: maxSysPeriod };
                                } else {
                                    syncInfos = { lastUpdate: maxSysPeriod };
                                }
                            } else {
                                syncInfos = { syncData: syncData, lastUpdate: maxSysPeriod };
                            }

                            return resolve(syncInfos);
                        })
                        .catch(function (error) {
                            return reject(error);
                        });
                })
                .catch(function (error) {
                    return reject(error);
                });

        });
    }

};

module.exports = reportBo;