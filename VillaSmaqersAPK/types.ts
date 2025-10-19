export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  age: number;
}

export interface Order {
  id: string;
  userId: string;
  item: 'crepe' | 'cookie' | 'icecream';
  classroom: string;
  timestamp: Date;
}

export type RootStackParamList = {
  Main: undefined;
  Profile: undefined;
  Menu: undefined;
  Booking: { item: 'crepe' | 'cookie' | 'icecream' };
};
