import * as yup from 'yup';

export const medicinalReminderValidationSchema = yup.object().shape({
  reminder_time: yup.date().required(),
  medicine_name: yup.string().required(),
  user_id: yup.string().nullable(),
});
