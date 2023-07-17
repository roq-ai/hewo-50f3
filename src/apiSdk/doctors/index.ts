import axios from 'axios';
import queryString from 'query-string';
import { DoctorInterface, DoctorGetQueryInterface } from 'interfaces/doctor';
import { GetQueryInterface } from '../../interfaces';

export const getDoctors = async (query?: DoctorGetQueryInterface) => {
  const response = await axios.get(`/api/doctors${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDoctor = async (doctor: DoctorInterface) => {
  const response = await axios.post('/api/doctors', doctor);
  return response.data;
};

export const updateDoctorById = async (id: string, doctor: DoctorInterface) => {
  const response = await axios.put(`/api/doctors/${id}`, doctor);
  return response.data;
};

export const getDoctorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/doctors/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDoctorById = async (id: string) => {
  const response = await axios.delete(`/api/doctors/${id}`);
  return response.data;
};
