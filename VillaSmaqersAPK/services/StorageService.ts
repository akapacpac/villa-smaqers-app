import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, Order } from '../types';

const PROFILE_KEY = 'user_profile';
const ORDERS_KEY = 'user_orders';

export class StorageService {
  // Profile management
  static async saveProfile(profile: UserProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }

  static async getProfile(): Promise<UserProfile | null> {
    try {
      const profileData = await AsyncStorage.getItem(PROFILE_KEY);
      return profileData ? JSON.parse(profileData) : null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  // Orders management
  static async saveOrder(order: Order): Promise<void> {
    try {
      const existingOrders = await this.getOrders();
      const updatedOrders = [...existingOrders, order];
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  }

  static async getOrders(): Promise<Order[]> {
    try {
      const ordersData = await AsyncStorage.getItem(ORDERS_KEY);
      return ordersData ? JSON.parse(ordersData) : [];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  static async clearOrders(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ORDERS_KEY);
    } catch (error) {
      console.error('Error clearing orders:', error);
      throw error;
    }
  }
}
