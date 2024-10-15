const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, agreementService } = require('../services');
const { getPagination } = require('../utils/pagination');
const { getSuccessResponse } = require('../utils/Response');
const { createPatientdata } = require('../services/patient.servic');

const createData = catchAsync(async (req, res) => {
  let { user } = req.loggerInfo;
  console.log('============user========', user);
  const result = await createPatientdata(req.body, user)  //await agreementService.createAgreement(req.body, fileMetadata, user);
  res.status(httpStatus.CREATED).send(getSuccessResponse(httpStatus.CREATED, 'Patient created successfully', result));
});

module.exports = {
  createData
};
