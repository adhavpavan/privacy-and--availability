const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { Gateway, Wallets } = require('fabric-network');
const { getContractObject, getWalletPath, getCCP, getAgreementsWithPagination } = require('../utils/blockchainUtils');
const {
  NETWORK_ARTIFACTS_DEFAULT,
  BLOCKCHAIN_DOC_TYPE,
  AGREEMENT_STATUS,
  FILTER_TYPE,
} = require('../utils/Constants');
const { getUUID } = require('../utils/uuid');
const { getSignedUrl } = require('../utils/fileUpload');
const THIRTY_DAYS = 2592000000;

// If we are sure that max records are limited, we can use any max number
const DEFAULT_MAX_RECORDS = 100
const utf8Decoder = new TextDecoder();


/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Agreement>}
 */
const createPatientdata = async (patientData, user) => {
  let gateway;
  let client
  try {
    let dateTime = new Date();
    let orgName = `org${user.orgId}`;
    patientData = {
      fcn: 'CreatePatientData',
      data: {
        id: getUUID(),
        createBy: user.email,
        updatedBy: user.email,
        createAt: dateTime,
        updatedAt: dateTime,
        name:patientData.name,
        docType: 'Patient',
        dob:patientData.dob,
        govId:patientData.govId,
        gender:patientData.gender

      },
    };

    const contract = await getContractObject(
      orgName,
      user.email,
      NETWORK_ARTIFACTS_DEFAULT.CHANNEL_NAME,
      NETWORK_ARTIFACTS_DEFAULT.CHAINCODE_NAME,
      gateway,
      client
    );
    await  contract.submitTransaction(patientData.fcn, JSON.stringify(patientData.data));
    return patientData.data;
  } catch (error) {
    console.log(error);
  } finally {
    if (gateway) {
      gateway.close();
    }
    if(client){
      client.close()
    }
  }
};



module.exports = {
  createPatientdata,

};
