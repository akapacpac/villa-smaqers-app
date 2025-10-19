import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { UserProfile } from '../types';
import { StorageService } from '../services/StorageService';

interface MenuScreenProps {
  navigation: any;
}

const menuItems = [
  {
    id: 'crepe',
    name: 'Crêpe',
    description: 'Délicieuse crêpe sucrée ou salée',
    emoji: '🥞',
    color: '#fdcb6e',
  },
  {
    id: 'cookie',
    name: 'Cookie',
    description: 'Cookie aux pépites de chocolat',
    emoji: '🍪',
    color: '#e17055',
  },
  {
    id: 'icecream',
    name: 'Glace',
    description: 'Glace artisanale aux saveurs variées',
    emoji: '🍦',
    color: '#74b9ff',
  },
];

export default function MenuScreen({ navigation }: MenuScreenProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const savedProfile = await StorageService.getProfile();
    setProfile(savedProfile);
  };

  const handleItemPress = (itemId: 'crepe' | 'cookie' | 'icecream') => {
    if (!profile) {
      Alert.alert(
        'Profil requis',
        'Veuillez d\'abord créer votre profil avant de passer commande.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Créer un profil', onPress: () => navigation.navigate('Profile') },
        ]
      );
      return;
    }
    navigation.navigate('Booking', { item: itemId });
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Villa des Smaqers Brisés</Text>
          <Text style={styles.subtitle}>Menu</Text>
        </View>
        <View style={styles.noProfileContainer}>
          <Text style={styles.noProfileText}>
            Veuillez d'abord créer votre profil pour commander
          </Text>
          <TouchableOpacity
            style={styles.createProfileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.createProfileButtonText}>Créer mon profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Villa des Smaqers Brisés</Text>
        <Text style={styles.subtitle}>Menu</Text>
        <Text style={styles.welcomeText}>
          Bonjour {profile.firstName} ! Choisissez votre gourmandise
        </Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={() => handleItemPress(item.id as 'crepe' | 'cookie' | 'icecream')}
          >
            <Text style={styles.menuEmoji}>{item.emoji}</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
            </View>
            <Text style={styles.freeText}>GRATUIT</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tous nos produits sont offerts par la Villa des Smaqers Brisés
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6c5ce7',
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  noProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noProfileText: {
    fontSize: 18,
    color: '#636e72',
    textAlign: 'center',
    marginBottom: 30,
  },
  createProfileButton: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  createProfileButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  menuItemDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  freeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#636e72',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
