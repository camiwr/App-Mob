import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert 
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Save } from 'lucide-react-native';

export default function AreaFormScreen() {
  const [formData, setFormData] = useState({
    matricula: '',
    description: '',
    totalArea: '',
    pricePerSqm: '',
  });

  const handleSave = () => {
    if (!formData.description || !formData.totalArea || !formData.pricePerSqm) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios');
      return;
    }
    
    Alert.alert('Sucesso', 'Área salva com sucesso!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#3B82F6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar Área</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Matrícula <Text style={styles.optional}>(opcional)</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a matrícula"
              value={formData.matricula}
              onChangeText={(text) => setFormData(prev => ({...prev, matricula: text}))}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição *</Text>
            <TextInput
              style={styles.input}
              placeholder="Descrição da área"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({...prev, description: text}))}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.locationSection}>
            <Text style={styles.label}>Localização</Text>
            <TouchableOpacity 
              style={styles.mapButton}
              onPress={() => router.push('/territory-map')}
            >
              <MapPin size={20} color="#3B82F6" />
              <Text style={styles.mapButtonText}>Selecionar no mapa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Área total *</Text>
            <View style={styles.inputWithUnit}>
              <TextInput
                style={styles.inputWithUnitField}
                placeholder="0"
                value={formData.totalArea}
                onChangeText={(text) => setFormData(prev => ({...prev, totalArea: text}))}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.unit}>m²</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Valor do m² *</Text>
            <View style={styles.inputWithUnit}>
              <Text style={styles.currency}>R$</Text>
              <TextInput
                style={styles.inputWithUnitField}
                placeholder="0,00"
                value={formData.pricePerSqm}
                onChangeText={(text) => setFormData(prev => ({...prev, pricePerSqm: text}))}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Save size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Salvar Área</Text>
          </TouchableOpacity>
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
  form: {
    paddingVertical: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  optional: {
    color: '#6B7280',
    fontWeight: '400',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationSection: {
    marginBottom: 24,
  },
  mapButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderStyle: 'dashed',
  },
  mapButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
    marginLeft: 8,
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputWithUnitField: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  unit: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  currency: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#14B8A6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});