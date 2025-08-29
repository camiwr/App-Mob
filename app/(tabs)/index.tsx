import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';
import { Plus, Map, ChartBar as BarChart3, MapPin } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, João!</Text>
          <Text style={styles.subtitle}>O que você gostaria de fazer hoje?</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.primaryCard}
            onPress={() => router.push('/area-form')}
          >
            <View style={styles.cardIcon}>
              <Plus size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.primaryCardTitle}>Nova Simulação</Text>
            <Text style={styles.primaryCardSubtitle}>Criar uma nova simulação de área</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryCard}
            onPress={() => router.push('./(tabs)/areas')}
          >
            <View style={styles.secondaryCardIcon}>
              <MapPin size={28} color="#14B8A6" />
            </View>
            <Text style={styles.secondaryCardTitle}>Minhas Áreas</Text>
            <Text style={styles.secondaryCardSubtitle}>Visualizar áreas cadastradas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimas Atividades</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <BarChart3 size={20} color="#3B82F6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Simulação - Área Central</Text>
              <Text style={styles.activitySubtitle}>Criada há 2 dias</Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Map size={20} color="#14B8A6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Nova Área - Zona Norte</Text>
              <Text style={styles.activitySubtitle}>Criada há 5 dias</Text>
            </View>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  quickActions: {
    marginBottom: 32,
  },
  primaryCard: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  primaryCardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  secondaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryCardIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#F0FDFA',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  secondaryCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  secondaryCardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activityIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});