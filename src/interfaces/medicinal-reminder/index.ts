import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MedicinalReminderInterface {
  id?: string;
  reminder_time: any;
  user_id?: string;
  medicine_name: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface MedicinalReminderGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  medicine_name?: string;
}
