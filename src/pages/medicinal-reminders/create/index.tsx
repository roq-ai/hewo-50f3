import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createMedicinalReminder } from 'apiSdk/medicinal-reminders';
import { Error } from 'components/error';
import { medicinalReminderValidationSchema } from 'validationSchema/medicinal-reminders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { MedicinalReminderInterface } from 'interfaces/medicinal-reminder';

function MedicinalReminderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MedicinalReminderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMedicinalReminder(values);
      resetForm();
      router.push('/medicinal-reminders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MedicinalReminderInterface>({
    initialValues: {
      reminder_time: new Date(new Date().toDateString()),
      medicine_name: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: medicinalReminderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Medicinal Reminder
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="reminder_time" mb="4">
            <FormLabel>Reminder Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.reminder_time ? new Date(formik.values?.reminder_time) : null}
                onChange={(value: Date) => formik.setFieldValue('reminder_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="medicine_name" mb="4" isInvalid={!!formik.errors?.medicine_name}>
            <FormLabel>Medicine Name</FormLabel>
            <Input
              type="text"
              name="medicine_name"
              value={formik.values?.medicine_name}
              onChange={formik.handleChange}
            />
            {formik.errors.medicine_name && <FormErrorMessage>{formik.errors?.medicine_name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'medicinal_reminder',
    operation: AccessOperationEnum.CREATE,
  }),
)(MedicinalReminderCreatePage);
