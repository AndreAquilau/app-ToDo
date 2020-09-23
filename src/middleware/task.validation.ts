import Task from '@model/interface/Task';
import Next from '@routes/interface/Next';
import Request from '@routes/interface/Request';
import Response from '@routes/interface/Response';

export default async (
  request: Request<Task>,
  response: Response,
  next: Next,
) => {
  const errors: Array<string> = [];

  const { macaddress, type, title, description, when, done } = request.body;

  if (!macaddress) errors.push('macaddress is required');
  if (!type) errors.push('type is required');
  if (!title) errors.push('title is required');
  if (!description) errors.push('description is required');
  if (!when) errors.push('when is required');
  if (!done) errors.push('done is required');

  if (errors.length > 0)
    return response.status(400).json({
      errors,
    });

  next();
};
