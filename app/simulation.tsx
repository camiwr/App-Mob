import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert 
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Save, ChartBar as BarChart3, TrendingUp, TrendingDown } from 'lucide-react-native';

export default function SimulationScreen() {
  const simulationData = {
    areaName: 'Área Central',
    totalArea: '250 m²',
    grossRevenue: 125000,
    discounts: 26500,
    netRevenue: 98500,
  };

  const handleSaveSimulation = () => {
    Alert.alert('Simulação Salva', 'Sua simulação foi salva com sucesso!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

interface SimulationData {
    areaName: string;
    totalArea: string;
    grossRevenue: number;
    discounts: number;
    netRevenue: number;
}

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#3B82F6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Simulação</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.areaInfo}>
          <Text style={styles.areaTitle}>{simulationData.areaName}</Text>
          <Text style={styles.areaSubtitle}>{simulationData.totalArea}</Text>
        </View>

        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Resultados Calculados</Text>
          
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.resultIcon}>
                <TrendingUp size={24} color="#14B8A6" />
              </View>
              <Text style={styles.resultTitle}>Receita Bruta</Text>
            </View>
            <Text style={styles.resultValue}>
              {formatCurrency(simulationData.grossRevenue)}
            </Text>
          </View>

          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.resultIcon}>
                <TrendingDown size={24} color="#EF4444" />
              </View>
              <Text style={styles.resultTitle}>Descontos</Text>
            </View>
            <Text style={[styles.resultValue, styles.discountValue]}>
              - {formatCurrency(simulationData.discounts)}
            </Text>
          </View>

          <View style={[styles.resultCard, styles.netRevenueCard]}>
            <View style={styles.resultHeader}>
              <View style={styles.resultIcon}>
                <BarChart3 size={24} color="#FFFFFF" />
              </View>
              <Text style={[styles.resultTitle, styles.netRevenueTitle]}>Receita Líquida</Text>
            </View>
            <Text style={[styles.resultValue, styles.netRevenueValue]}>
              {formatCurrency(simulationData.netRevenue)}
            </Text>
          </View>
        </View>

        <View style={styles.breakdown}>
          <Text style={styles.sectionTitle}>Detalhamento</Text>
          
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Valor base por m²</Text>
              <Text style={styles.breakdownValue}>R$ 500,00</Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Custos de urbanização</Text>
              <Text style={styles.breakdownValue}>R$ 100,00</Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Taxa de administração</Text>
              <Text style={styles.breakdownValue}>15%</Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Impostos</Text>
              <Text style={styles.breakdownValue}>6%</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveSimulation}
        >
          <Save size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Salvar Simulação</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.compareButton}
          onPress={() => router.push('./comparison')}
        >
          <BarChart3 size={20} color="#3B82F6" />
          <Text style={styles.compareButtonText}>Comparar Simulações</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  areaInfo: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  areaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  areaSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  resultsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  netRevenueCard: {
    backgroundColor: '#3B82F6',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  netRevenueTitle: {
    color: '#FFFFFF',
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  discountValue: {
    color: '#EF4444',
  },
  netRevenueValue: {
    color: '#FFFFFF',
  },
  breakdown: {
    marginBottom: 32,
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  breakdownValue: {
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
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14B8A6',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  compareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  compareButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});