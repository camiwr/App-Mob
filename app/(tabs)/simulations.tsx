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
import { Plus, ChartBar as BarChart3, TrendingUp, Eye } from 'lucide-react-native';

type Simulation = {
  id: string;
  name: string;
  area: string;
  grossRevenue: string;
  netRevenue: string;
  date: string;
};

export default function SimulationsScreen() {
  const simulations: Simulation[] = [
    {
      id: '1',
      name: 'Área Central',
      area: '250 m²',
      grossRevenue: 'R$ 125.000',
      netRevenue: 'R$ 98.500',
      date: '15/01/2025',
    },
    {
      id: '2',
      name: 'Zona Norte',
      area: '180 m²',
      grossRevenue: 'R$ 90.000',
      netRevenue: 'R$ 72.000',
      date: '12/01/2025',
    },
  ];

  const renderSimulation = ({ item }: { item: Simulation }) => (
    <TouchableOpacity 
      style={styles.simulationCard}
      onPress={() => router.push('./simulation')}
    >
      <View style={styles.simulationHeader}>
        <Text style={styles.simulationName}>{item.name}</Text>
        <Text style={styles.simulationDate}>{item.date}</Text>
      </View>
      
      <View style={styles.simulationInfo}>
        <Text style={styles.simulationArea}>{item.area}</Text>
        <View style={styles.revenueRow}>
          <View style={styles.revenueItem}>
            <Text style={styles.revenueLabel}>Receita Bruta</Text>
            <Text style={styles.grossRevenue}>{item.grossRevenue}</Text>
          </View>
          <View style={styles.revenueItem}>
            <Text style={styles.revenueLabel}>Receita Líquida</Text>
            <Text style={styles.netRevenue}>{item.netRevenue}</Text>
          </View>
        </View>
      </View>

      <View style={styles.simulationActions}>
        <TouchableOpacity style={styles.viewButton}>
          <Eye size={16} color="#3B82F6" />
          <Text style={styles.viewButtonText}>Ver Detalhes</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Simulações</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/area-form')}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <BarChart3 size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Simulações</Text>
          </View>
          
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#14B8A6" />
            <Text style={styles.statNumber}>R$ 2.1M</Text>
            <Text style={styles.statLabel}>Total Simulado</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suas Simulações</Text>
            <TouchableOpacity onPress={() => router.push('./comparison')}>
              <Text style={styles.compareLink}>Comparar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={simulations}
            renderItem={renderSimulation}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 0.48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  compareLink: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  simulationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  simulationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  simulationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  simulationDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  simulationInfo: {
    marginBottom: 12,
  },
  simulationArea: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  revenueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  revenueItem: {
    flex: 1,
  },
  revenueLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  grossRevenue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  netRevenue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#14B8A6',
  },
  simulationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
    marginLeft: 4,
  },
});