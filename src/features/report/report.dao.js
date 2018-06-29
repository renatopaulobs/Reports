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

const reportDao = {
    save(req, res) {
        return new Promise((resolve, reject) => {
            return resolve(req);
        });
    },
    syncData(ifModifiedSince) {
        return new Promise((resolve, reject) => {
            return resolve(ifModifiedSince);
        });
    }

};
module.exports = reportDao;