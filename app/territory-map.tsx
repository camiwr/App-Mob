import * as Location from 'expo-location';
import { router } from 'expo-router';
import { ArrowLeft, Check, Locate } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type LocationCoords = { latitude: number; longitude: number } | null;

export default function TerritoryMapScreen() {
  const [selectedLocation, setSelectedLocation] = useState<LocationCoords>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationCoords>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permita o acesso à localização para usar o mapa.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setSelectedLocation(currentLocation);
      Alert.alert('Localização', 'Localização atual selecionada');
    } else {
      Alert.alert('Erro', 'Não foi possível obter a localização atual.');
    }
  };

  const handleConfirmTerritory = () => {
    if (!selectedLocation) {
      Alert.alert('Aviso', 'Por favor, selecione uma localização primeiro');
      return;
    }

    Alert.alert('Território Confirmado', 'Localização salva com sucesso!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#3B82F6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Selecionar Território</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Mapa não suportado na web</Text>
          </View>
        ) : currentLocation ? (
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                pinColor={selectedLocation ? '#14B8A6' : '#EF4444'}
              />
            )}
          </MapView>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Carregando mapa...</Text>
          </View>
        )}
      </View>

      <View style={styles.locationInfo}>
        {selectedLocation && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Área Selecionada</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Latitude</Text>
              <Text style={styles.infoValue}>{selectedLocation.latitude.toFixed(6)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Longitude</Text>
              <Text style={styles.infoValue}>{selectedLocation.longitude.toFixed(6)}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={handleUseCurrentLocation}
        >
          <Locate size={20} color="#3B82F6" />
          <Text style={styles.locationButtonText}>Usar minha localização atual</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.confirmButton, selectedLocation && styles.confirmButtonActive]}
          onPress={handleConfirmTerritory}
        >
          <Check size={20} color="#FFFFFF" />
          <Text style={styles.confirmButtonText}>Confirmar território</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  placeholder: {
    width: 24,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    borderRadius: 16,
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  centerPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -24,
    marginLeft: -24,
  },
  pin: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pinActive: {
    backgroundColor: '#F0FDF4',
  },
  locationInfo: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  locationButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
    marginLeft: 8,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9CA3AF',
    borderRadius: 12,
    paddingVertical: 16,
  },
  confirmButtonActive: {
    backgroundColor: '#14B8A6',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});