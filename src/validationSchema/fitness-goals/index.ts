import * as yup from 'yup';

export const fitnessGoalValidationSchema = yup.object().shape({
  goal: yup.string().required(),
  user_id: yup.string().nullable(),
});
