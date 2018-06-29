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
const i18N = require('../../utils/locale/I18N.helper');
const reportDefinitions = require('../../features/report/report.definitions');

module.exports = {
    getSaveReportSchema() {
        let labels = i18N.getLabels();
        let saveEvidenceSchema = Joi.object({
            evidenceId: Joi.number().integer().min(1).required().label(i18N.getLabels().report.EVIDENCE_ID),
            evidencePath: Joi.string().required().max(reportDefinitions.EVIDENCES_PATH_MAX_LENGTH).label(i18N.getLabels().report.EVIDENCE_PATH)
        }).required();

        let saveReportSchema =
            {
                ASCId: Joi.number().integer().min(1).required().label(i18N.getLabels().report.ASC_ID),
                SONumber: Joi.string().required().max(reportDefinitions.SO_NUMBER_MAX_LENGTH).label(i18N.getLabels().report.SO_NUMBER),
                deviceModel: Joi.string().required().max(reportDefinitions.DEVICE_MODEL_MAX_LENGTH).label(i18N.getLabels().report.DEVICE_MODEL),
                deviceSN: Joi.string().required().max(reportDefinitions.DEVICE_SN_MAX_LENGTH).label(i18N.getLabels().report.DEVICE_SN),
                symptom: Joi.string().required().max(reportDefinitions.SYMPTOM_MAX_LENGTH).label(i18N.getLabels().report.SYMPTOM),
                creationDate: Joi.number().positive().required().label(i18N.getLabels().report.CREATION_DATE),
                lastUpdate: Joi.number().positive().required().label(i18N.getLabels().report.CREATION_DATE),
                technicianId: Joi.number().integer().min(1).required().label(i18N.getLabels().report.TECHNICIAN_ID),
                technicianName: Joi.string().required().max(reportDefinitions.TECHNICIAN_NAME_MAX_LENGTH).label(i18N.getLabels().report.TECHNICIAN_NAME),
                technicianSignaturePath: Joi.string().required().max(reportDefinitions.TECHNICIAN_SIGNATURE_PATH_MAX_LENGTH).label(i18N.getLabels().report.TECHNICIAN_SIGNATURE_PATH),
                technicianNaturalPersonDocument: Joi.string().max(reportDefinitions.TECHNICIAN_NATURAL_PERSON_DOCUMENT_MAX_LENGTH).label(i18N.getLabels().report.TECHNICIAN_NATURAL_PERSON_DOCUMENT),
                technicianProfessionalDocument: Joi.string().max(reportDefinitions.TECHNICIAN_PROFESSIONAL_DOCUMENT_MAX_LENGTH).label(i18N.getLabels().report.TECHNICIAN_NATURAL_PERSON_DOCUMENT),
                defectId: Joi.number().integer().min(1).required().label(i18N.getLabels().report.DEFECT_ID),
                defectName: Joi.string().required().max(reportDefinitions.DEFECT_NAME_MAX_LENGTH).label(i18N.getLabels().report.DEFECT_NAME),
                defectCode: Joi.string().required().max(reportDefinitions.DEFECT_CODE_MAX_LENGTH).label(i18N.getLabels().report.DEFECT_CODE),
                defectVersion: Joi.string().required().max(reportDefinitions.DEFECT_VERSION_MAX_LENGTH).label(i18N.getLabels().report.DEFECT_VERSION),
                diagnostic: Joi.string().required().max(reportDefinitions.DIAGNOSTIC_MAX_LENGTH).label(i18N.getLabels().report.DIAGNOSTIC),
                conclusion: Joi.string().max(reportDefinitions.CONCLUSION_MAX_LENGTH).label(i18N.getLabels().report.CONCLUSION),
                productId: Joi.number().integer().min(1).required().label(i18N.getLabels().report.PRODUCT_ID),
                productName: Joi.string().required().max(reportDefinitions.PRODUCT_NAME_MAX_LENGTH).label(i18N.getLabels().report.PRODUCT_NAME),
                productWarrantyTerm: Joi.string().max(reportDefinitions.PRODUCT_WARRANTY_TERM_MAX_LENGTH).label(i18N.getLabels().report.PRODUCT_WARRANTY_TERM),
                rootCauseId: Joi.number().integer().min(1).required().label(i18N.getLabels().report.ROOT_CAUSE_ID),
                rootCauseText: Joi.string().required().max(reportDefinitions.ROOT_CAUSE_TEXT_MAX_LENGTH).label(i18N.getLabels().report.PRODUCT_NAME),
                customerName: Joi.string().required().max(reportDefinitions.CUSTOMER_NAME_MAX_LENGTH).label(i18N.getLabels().report.CUSTOMER_NAME),
                customerNaturalPersonDocument: Joi.string().max(reportDefinitions.CUSTOMER_NATURAL_PERSON_DOCUMET_MAX_LENGTH).label(i18N.getLabels().report.CUSTOMER_NATURAL_PERSON_DOCUMET),
                customerJuridicalPersonDocument: Joi.string().max(reportDefinitions.CUSTOMER_JURIDICAL_PERSON_DOCUMENT_MAX_LENGTH).label(i18N.getLabels().report.CUSTOMER_NATURAL_PERSON_DOCUMET),
                customerTelephone: Joi.string().required().max(reportDefinitions.CUSTOMER_TELEPHONE_MAX_LENGTH).label(i18N.getLabels().report.CUSTOMER_TELEPHONE),
                customerEmail: Joi.string().max(reportDefinitions.CUSTOMER_EMAIL_MAX_LENGTH).label(i18N.getLabels().report.CUSTOMER_EMAI),
                customerAddress: Joi.string().required().max(reportDefinitions.CUSTOMER_ADDRESS_MAX_LENGTH).label(i18N.getLabels().report.CUSTOMER_ADDRESS),
                customerCityName: Joi.string().required().max(reportDefinitions.CUSTOMER_CITY_NAME_MAX_LENGTH).label(i18N.getLabels().report.CUSTOMER_CITY_NAME),
                customerStateCode: Joi.string().required().max(reportDefinitions.CUSTOMER_STATE_CODE_MAX_LENGTH).label(i18N.getLabels().report.CUSTOMER_STATE_CODE),
                customerCountryCode: Joi.string().required().max(reportDefinitions.CUSTOMER_COUNTRY_CODE_MAX_LENGTH).label(i18N.getLabels().report.CUSTOMER_COUNTRY_CODE),
                evidences: Joi.array().items(saveEvidenceSchema).unique().required()

            };

        return saveReportSchema;
    }
};

