import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FitnessGoalInterface {
  id?: string;
  goal: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface FitnessGoalGetQueryInterface extends GetQueryInterface {
  id?: string;
  goal?: string;
  user_id?: string;
}
