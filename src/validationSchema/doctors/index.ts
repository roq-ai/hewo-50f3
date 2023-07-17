import * as yup from 'yup';

export const doctorValidationSchema = yup.object().shape({
  name: yup.string().required(),
  specialization: yup.string().required(),
  organization_id: yup.string().nullable(),
});
