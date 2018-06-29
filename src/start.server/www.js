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
const http = require('http');
const app = require('./server');
const constants = require('../utils/constants');

app.set('host', constants.HOST);
app.set('port', constants.PORT);

const server = http.createServer(app);
server.listen(constants.PORT);
