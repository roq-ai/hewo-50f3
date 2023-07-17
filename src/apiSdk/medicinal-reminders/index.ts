import axios from 'axios';
import queryString from 'query-string';
import { MedicinalReminderInterface, MedicinalReminderGetQueryInterface } from 'interfaces/medicinal-reminder';
import { GetQueryInterface } from '../../interfaces';

export const getMedicinalReminders = async (query?: MedicinalReminderGetQueryInterface) => {
  const response = await axios.get(`/api/medicinal-reminders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMedicinalReminder = async (medicinalReminder: MedicinalReminderInterface) => {
  const response = await axios.post('/api/medicinal-reminders', medicinalReminder);
  return response.data;
};

export const updateMedicinalReminderById = async (id: string, medicinalReminder: MedicinalReminderInterface) => {
  const response = await axios.put(`/api/medicinal-reminders/${id}`, medicinalReminder);
  return response.data;
};

export const getMedicinalReminderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/medicinal-reminders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMedicinalReminderById = async (id: string) => {
  const response = await axios.delete(`/api/medicinal-reminders/${id}`);
  return response.data;
};
