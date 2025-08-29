import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  FlatList 
} from 'react-native';
import { router } from 'expo-router';
import { Plus, MapPin, CreditCard as Edit, Trash2 } from 'lucide-react-native';

export default function AreasScreen() {
  type Area = {
    id: string;
    name: string;
    description: string;
    totalArea: string;
    pricePerSqm: string;
    matricula: string;
  };

  const areas: Area[] = [
    {
      id: '1',
      name: 'Área Central',
      description: 'Centro comercial da cidade',
      totalArea: '250',
      pricePerSqm: '500',
      matricula: 'MAT001',
    },
    {
      id: '2',
      name: 'Zona Norte',
      description: 'Área residencial',
      totalArea: '180',
      pricePerSqm: '400',
      matricula: '',
    },
  ];

  const renderArea = ({ item }: { item: Area }) => (
    <View style={styles.areaCard}>
      <View style={styles.areaHeader}>
        <View style={styles.areaIcon}>
          <MapPin size={20} color="#14B8A6" />
        </View>
        <View style={styles.areaInfo}>
          <Text style={styles.areaName}>{item.name}</Text>
          {item.matricula && (
            <Text style={styles.areaMatricula}>Matrícula: {item.matricula}</Text>
          )}
        </View>
        <View style={styles.areaActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.areaDescription}>{item.description}</Text>
      
      <View style={styles.areaMetrics}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Área Total</Text>
          <Text style={styles.metricValue}>{item.totalArea} m²</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Valor/m²</Text>
          <Text style={styles.metricValue}>R$ {item.pricePerSqm}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.simulateButton}
        onPress={() => router.push('./simulation')}
      >
        <Text style={styles.simulateButtonText}>Simular</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Áreas</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/area-form')}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FlatList
          data={areas}
          renderItem={renderArea}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  areaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  areaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  areaIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F0FDFA',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  areaInfo: {
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  areaMatricula: {
    fontSize: 12,
    color: '#6B7280',
  },
  areaActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  areaDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  areaMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  simulateButton: {
    backgroundColor: '#14B8A6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  simulateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});