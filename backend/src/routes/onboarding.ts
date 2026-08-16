import { Router } from 'express';
import { validateRequiredFields } from '../middleware/validation';
import {
  getDriverOnboardingStatus,
  getMerchantOnboardingStatus,
  submitDriverOnboarding,
  submitMerchantOnboarding,
} from '../services/onboardingService';

const router = Router();

router.post(
  '/driver',
  validateRequiredFields([
    'name',
    'email',
    'phone',
    'licenseNumber',
    'licenseExpiry',
    'vehicleType',
    'vehiclePlate',
    'insuranceExpiry',
    'bankAccount',
  ]),
  (req, res) => {
    const record = submitDriverOnboarding(req.body);

    res.status(201).json({
      success: true,
      message: 'Driver onboarding submitted successfully.',
      data: record,
    });
  }
);

router.get('/driver/:id', (req, res): void => {
  const record = getDriverOnboardingStatus(req.params.id);

  if (!record) {
    res.status(404).json({
      success: false,
      error: 'Driver onboarding application not found.',
    });
    return;
  }

  res.json({
    success: true,
    data: record,
  });
});

router.post(
  '/merchant',
  validateRequiredFields([
    'businessName',
    'businessEmail',
    'businessPhone',
    'ownerName',
    'taxId',
    'registrationNumber',
    'serviceArea',
    'deliveryRadius',
    'bankAccount',
  ]),
  (req, res) => {
    const record = submitMerchantOnboarding(req.body);

    res.status(201).json({
      success: true,
      message: 'Merchant onboarding submitted successfully.',
      data: record,
    });
  }
);

router.get('/merchant/:id', (req, res): void => {
  const record = getMerchantOnboardingStatus(req.params.id);

  if (!record) {
    res.status(404).json({
      success: false,
      error: 'Merchant onboarding application not found.',
    });
    return;
  }

  res.json({
    success: true,
    data: record,
  });
});

export default router;
