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
/**
 * @typedef Evidence
 * @property {integer} evidenceId.required
 * @property {string} evidencesPath.required
*/
/**
 * @typedef Report
 * @property {integer} ASCId.required
 * @property {string} SONumber.required
 * @property {string} deviceModel.required
 * @property {string} deviceSN.required
 * @property {string} symptom.required
 * @property {integer} creationDate.required
 * @property {integer} lastUpdate.required
 * @property {integer} technicianId.required
 * @property {string} technicianName.required
 * @property {string} technicianSignaturePath.required
 * @property {string} technicianNaturalPersonDocument
 * @property {string} technicianProfessionalDocument
 * @property {integer} defectId.required
 * @property {string} defectName.required
 * @property {string} defectCode.required
 * @property {string} defectVersion.required
 * @property {string} diagnostic.required
 * @property {string} conclusion
 * @property {integer} productId.required
 * @property {string} productName.required
 * @property {string} productWarrantyTerm
 * @property {integer} rootCauseId.required
 * @property {string} rootCauseText.required
 * @property {string} customerName.required
 * @property {string} customerNaturalPersonDocument
 * @property {string} customerJuridicalPersonDocument
 * @property {string} customerTelephone.required
 * @property {string} customerEmail
 * @property {string} customerAddress.required
 * @property {string} customerCityName.required
 * @property {string} customerStateCode.required
 * @property {string} customerCountryCode.required
 * @property {Array.<Evidence>} evidences.required Array of evidence id and evidences path
 */
