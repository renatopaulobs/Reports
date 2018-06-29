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
require('dotenv').config();

const constants =
    {
        TYPE_LOG_DEV: 'dev',
        PORT: parseInt(process.env.PORT, 10) || 4000,
        HOST: '0.0.0.0',
        ENABLE_SWAGGER: process.env.ENABLE_SWAGGER === 'true',
        ENABLE_FORCE_HTTPS: process.env.ENABLE_FORCE_HTTPS === 'true',
        HTTP_ERROR_CODE_ECONNREFUSED: 'ECONNREFUSED',
        HTTP_HEADER_IF_MODIFIED_SINCE: 'If-Modified-Since',
        HTTP_HEADER_LAST_MODIFIED: 'Last-Modified'

    };

module.exports = constants;

