import Task from '@model/interface/Task';
import Next from '@routes/interface/Next';
import Request from '@routes/interface/Request';
import Response from '@routes/interface/Response';
import Param from '@routes/interface/Param';
import validator from './Validate';

export default async (
  request: Request<Task<Date>, Param>,
  response: Response,
  next: Next,
) => {
  try {
    const { macaddress } = request.params;

    if (!macaddress) {
      return response.status(404).json({
        errors: [{ message: 'macaddress is required' }],
      });
    }

    if (!validator.isMACAddress(macaddress)) {
      return response.status(404).json({
        errors: [{ message: 'MACAddress is invalid' }],
      });
    }

    next();
  } catch (err) {
    return response.status(404).json({ errors: [{ message: err.message }] });
  }
};
