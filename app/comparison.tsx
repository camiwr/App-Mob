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
import { ArrowLeft, Download, ChartBar as BarChart3 } from 'lucide-react-native';

export default function ComparisonScreen() {
  const comparisonData = [
    {
      name: 'Área Central',
      grossRevenue: 500000,
      netRevenue: 400000,
      color: '#3B82F6',
    },
    {
      name: 'Zona Norte', 
      grossRevenue: 700000,
      netRevenue: 600000,
      color: '#14B8A6',
    },
    {
      name: 'Zona Sul',
      grossRevenue: 450000,
      netRevenue: 350000,
      color: '#8B5CF6',
    },
    {
      name: 'Centro',
      grossRevenue: 550000,
      netRevenue: 450000,
      color: '#F59E0B',
    },
  ];

  const maxValue = Math.max(...comparisonData.map(item => item.grossRevenue));

  const handleExport = () => {
    Alert.alert('Exportar', 'Relatório exportado com sucesso!');
  };

interface ComparisonItem {
    name: string;
    grossRevenue: number;
    netRevenue: number;
    color: string;
}

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
    }).format(value);
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#3B82F6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comparação de Simulações</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <BarChart3 size={24} color="#3B82F6" />
            <Text style={styles.chartTitle}>Comparação de Receitas</Text>
          </View>

          <View style={styles.chart}>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
                <Text style={styles.legendText}>Receita Bruta</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#14B8A6' }]} />
                <Text style={styles.legendText}>Receita Líquida</Text>
              </View>
            </View>

            {comparisonData.map((item, index) => {
              const grossHeight = (item.grossRevenue / maxValue) * 100;
              const netHeight = (item.netRevenue / maxValue) * 100;
              
              return (
                <View key={index} style={styles.chartBar}>
                  <Text style={styles.barLabel}>{item.name}</Text>
                  <View style={styles.barContainer}>
                    <View style={styles.barGroup}>
                      <View 
                        style={[
                          styles.bar, 
                          styles.grossBar,
                          { height: Math.max(grossHeight * 1.2, 20) }
                        ]} 
                      />
                      <View 
                        style={[
                          styles.bar, 
                          styles.netBar,
                          { height: Math.max(netHeight * 1.2, 20) }
                        ]} 
                      />
                    </View>
                  </View>
                  <View style={styles.barValues}>
                    <Text style={styles.barGrossValue}>{formatCurrency(item.grossRevenue)}</Text>
                    <Text style={styles.barNetValue}>{formatCurrency(item.netRevenue)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Maior Receita Bruta</Text>
              <Text style={styles.summaryValue}>Zona Norte - R$ 700.000</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Maior Receita Líquida</Text>
              <Text style={styles.summaryValue}>Zona Norte - R$ 600.000</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Melhor Margem</Text>
              <Text style={styles.summaryValue}>Centro - 81.8%</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.exportButton}
          onPress={handleExport}
        >
          <Download size={20} color="#FFFFFF" />
          <Text style={styles.exportButtonText}>Exportar</Text>
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
  chartSection: {
    paddingVertical: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  chart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  chartBar: {
    marginBottom: 20,
  },
  barLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  barContainer: {
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  barGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bar: {
    width: 20,
    marginHorizontal: 2,
    borderRadius: 4,
  },
  grossBar: {
    backgroundColor: '#3B82F6',
  },
  netBar: {
    backgroundColor: '#14B8A6',
  },
  barValues: {
    alignItems: 'center',
  },
  barGrossValue: {
    fontSize: 10,
    color: '#3B82F6',
    fontWeight: '600',
  },
  barNetValue: {
    fontSize: 10,
    color: '#14B8A6',
    fontWeight: '600',
  },
  summarySection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
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
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14B8A6',
    borderRadius: 12,
    paddingVertical: 16,
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});