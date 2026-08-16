import { Router } from 'express';
import { validateRequiredFields } from '../middleware/validation';
import { getFieldAssistance } from '../services/aiAssistanceService';

const router = Router();

router.post('/assist', validateRequiredFields(['field']), async (req, res, next) => {
  try {
    const assistance = await getFieldAssistance(req.body);

    res.json({
      success: true,
      data: assistance,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
