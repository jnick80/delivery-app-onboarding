import { NextFunction, Request, Response } from 'express';

type ValidatorValue = string | number | undefined | null;

function isEmptyValue(value: ValidatorValue) {
  if (typeof value === 'number') {
    return Number.isNaN(value);
  }

  return typeof value !== 'string' || value.trim().length === 0;
}

export function validateRequiredFields(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missingFields = fields.filter((field) => isEmptyValue(req.body[field] as ValidatorValue));

    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
      return;
    }

    next();
  };
}
