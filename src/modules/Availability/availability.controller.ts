import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AvailabilityServices } from './availability.service';

const createAvailability = catchAsync(async (req, res) => {
  const result = await AvailabilityServices.createAvailabilityIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Availability created successfully',
    data: result,
  });
});

export const AvailabilityControllers = {
  createAvailability,
};
