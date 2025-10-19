import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { UserProfile, Order } from '../types';
import { StorageService } from '../services/StorageService';

interface BookingScreenProps {
  navigation: any;
  route: {
    params: {
      item: 'crepe' | 'cookie' | 'icecream';
    };
  };
}

const itemDetails = {
  crepe: {
    name: 'Crêpe',
    emoji: '🥞',
    color: '#fdcb6e',
    description: 'Délicieuse crêpe sucrée ou salée',
  },
  cookie: {
    name: 'Cookie',
    emoji: '🍪',
    color: '#e17055',
    description: 'Cookie aux pépites de chocolat',
  },
  icecream: {
    name: 'Glace',
    emoji: '🍦',
    color: '#74b9ff',
    description: 'Glace artisanale aux saveurs variées',
  },
};

const classrooms = [
  'A101', 'A102', 'A103', 'A201', 'A202', 'A203',
  'B101', 'B102', 'B103', 'B201', 'B202', 'B203',
  'C101', 'C102', 'C103', 'C201', 'C202', 'C203',
  'Amphithéâtre 1', 'Amphithéâtre 2', 'Salle de conférence',
];

export default function BookingScreen({ navigation, route }: BookingScreenProps) {
  const { item } = route.params;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [customClassroom, setCustomClassroom] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const savedProfile = await StorageService.getProfile();
    setProfile(savedProfile);
  };

  const handleConfirmOrder = async () => {
    if (!profile) {
      Alert.alert('Erreur', 'Profil non trouvé');
      return;
    }

    const classroom = selectedClassroom || customClassroom.trim();
    if (!classroom) {
      Alert.alert('Erreur', 'Veuillez sélectionner ou saisir une salle de classe');
      return;
    }

    const order: Order = {
      id: Date.now().toString(),
      userId: profile.id,
      item,
      classroom,
      timestamp: new Date(),
    };

    try {
      await StorageService.saveOrder(order);
      Alert.alert(
        'Commande confirmée !',
        `Votre ${itemDetails[item].name.toLowerCase()} sera livré en ${classroom}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Menu'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la confirmation de la commande');
    }
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const itemInfo = itemDetails[item];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Confirmer la commande</Text>
      </View>

      <View style={styles.itemContainer}>
        <View style={[styles.itemCard, { backgroundColor: itemInfo.color }]}>
          <Text style={styles.itemEmoji}>{itemInfo.emoji}</Text>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemName}>{itemInfo.name}</Text>
            <Text style={styles.itemDescription}>{itemInfo.description}</Text>
            <Text style={styles.freeText}>GRATUIT</Text>
          </View>
        </View>
      </View>

      <View style={styles.classroomSection}>
        <Text style={styles.sectionTitle}>Sélectionnez votre salle de classe</Text>
        
        <View style={styles.classroomGrid}>
          {classrooms.map((classroom) => (
            <TouchableOpacity
              key={classroom}
              style={[
                styles.classroomButton,
                selectedClassroom === classroom && styles.selectedClassroomButton,
              ]}
              onPress={() => {
                setSelectedClassroom(classroom);
                setCustomClassroom('');
              }}
            >
              <Text
                style={[
                  styles.classroomButtonText,
                  selectedClassroom === classroom && styles.selectedClassroomButtonText,
                ]}
              >
                {classroom}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.orText}>ou</Text>
        
        <TextInput
          style={styles.customInput}
          value={customClassroom}
          onChangeText={setCustomClassroom}
          placeholder="Saisissez une salle personnalisée"
          onFocus={() => setSelectedClassroom('')}
        />
      </View>

      <View style={styles.confirmSection}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <Text style={styles.confirmButtonText}>Confirmer la commande</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>
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
  },
  itemContainer: {
    padding: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemEmoji: {
    fontSize: 50,
    marginRight: 20,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 10,
  },
  freeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  classroomSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 15,
  },
  classroomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  classroomButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedClassroomButton: {
    backgroundColor: '#6c5ce7',
    borderColor: '#6c5ce7',
  },
  classroomButtonText: {
    fontSize: 12,
    color: '#2d3436',
    fontWeight: '500',
  },
  selectedClassroomButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#636e72',
    marginVertical: 15,
    fontSize: 16,
  },
  customInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  confirmSection: {
    padding: 20,
  },
  confirmButton: {
    backgroundColor: '#00b894',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#636e72',
    fontSize: 16,
    fontWeight: '500',
  },
});
