import { Router } from 'express';
import { validateRequiredFields } from '../middleware/validation';
import {
  getDriverOnboardingStatus,
  getMerchantOnboardingStatus,
  submitDriverOnboarding,
  submitMerchantOnboarding,
} from '../services/onboardingService';

const router = Router();

function toStatusResponse(record: {
  id: string;
  type: 'driver' | 'merchant';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}) {
  return {
    id: record.id,
    type: record.type,
    status: record.status,
    submittedAt: record.submittedAt,
  };
}

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
    const record = submitDriverOnboarding({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      licenseNumber: req.body.licenseNumber,
      licenseExpiry: req.body.licenseExpiry,
      vehicleType: req.body.vehicleType,
      vehiclePlate: req.body.vehiclePlate,
      insuranceExpiry: req.body.insuranceExpiry,
      bankAccount: req.body.bankAccount,
    });

    res.status(201).json({
      success: true,
      message: 'Driver onboarding submitted successfully.',
      data: toStatusResponse(record),
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
    data: toStatusResponse(record),
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
    const record = submitMerchantOnboarding({
      businessName: req.body.businessName,
      businessEmail: req.body.businessEmail,
      businessPhone: req.body.businessPhone,
      ownerName: req.body.ownerName,
      taxId: req.body.taxId,
      registrationNumber: req.body.registrationNumber,
      serviceArea: req.body.serviceArea,
      deliveryRadius: req.body.deliveryRadius,
      bankAccount: req.body.bankAccount,
    });

    res.status(201).json({
      success: true,
      message: 'Merchant onboarding submitted successfully.',
      data: toStatusResponse(record),
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
    data: toStatusResponse(record),
  });
});

export default router;
