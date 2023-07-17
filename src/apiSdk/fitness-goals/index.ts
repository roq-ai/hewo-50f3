import axios from 'axios';
import queryString from 'query-string';
import { FitnessGoalInterface, FitnessGoalGetQueryInterface } from 'interfaces/fitness-goal';
import { GetQueryInterface } from '../../interfaces';

export const getFitnessGoals = async (query?: FitnessGoalGetQueryInterface) => {
  const response = await axios.get(`/api/fitness-goals${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFitnessGoal = async (fitnessGoal: FitnessGoalInterface) => {
  const response = await axios.post('/api/fitness-goals', fitnessGoal);
  return response.data;
};

export const updateFitnessGoalById = async (id: string, fitnessGoal: FitnessGoalInterface) => {
  const response = await axios.put(`/api/fitness-goals/${id}`, fitnessGoal);
  return response.data;
};

export const getFitnessGoalById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/fitness-goals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFitnessGoalById = async (id: string) => {
  const response = await axios.delete(`/api/fitness-goals/${id}`);
  return response.data;
};
