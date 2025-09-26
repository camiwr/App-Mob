import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Lock, User, Phone, Hash } from 'lucide-react-native';
import { AuthService } from '../services/AuthService';
import { CreateUserDto } from '../types/auth';;

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name) newErrors.name = 'O Nome é obrigatório';
    if (!formData.email) {
      newErrors.email = 'O email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'O formato do email é inválido.';
    }
    if (!formData.password) {
      newErrors.password = 'A senha é obrigatória.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'A senha deve conter pelo menos uma letra minúscula.';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'A senha deve conter pelo menos uma letra maiúscula.';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'A senha deve conter pelo menos um número.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }
    if (formData.phone && !/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = 'O telefone deve conter apenas números.';
    }
    if (formData.cpf && !/^[0-9]+$/.test(formData.cpf)) {
      newErrors.cpf = 'O CPF deve conter apenas números.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleRegister = async () => {
  if (!validateForm()) return;

  setIsLoading(true);
  try {
    const userData: CreateUserDto = {
      name: formData.name,
      email: formData.email,
      password_hash: formData.password,
      cpf: formData.cpf || undefined,
      phone: formData.phone || undefined,
    };
    
    await AuthService.register(userData);

    Alert.alert(
      'Conta Criada!',
      'A sua conta foi criada com sucesso. Agora pode fazer o login.',
      [{ text: 'Fazer Login', onPress: () => router.push('/') }]
    );
  } catch (error: any) {
    Alert.alert('Erro no Cadastro', error.message || 'Ocorreu um erro inesperado.');
  } finally {
    setIsLoading(false);
  }
};

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}>

        <View style={styles.header}>
          <TouchableOpacity 
          onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/');
              }
            }}
          >
            <ArrowLeft size={24} color="#3B82F6" />
          </TouchableOpacity>


          <Text style={styles.headerTitle}>Criar Conta</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContentContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Cadastre-se</Text>
          <Text style={styles.subtitle}>Preencha seus dados para começar</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>


              <View style={styles.inputWrapper}>
                <User size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  value={formData.name}
                  onChangeText={(text) => handleChange('name', text)}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <View style={styles.inputWrapper}>
                <Mail size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => handleChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <View style={styles.inputWrapper}>
                <Mail size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="CPF"
                  value={formData.cpf}
                  onChangeText={(text) => handleChange('cpf', text)}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}


              <View style={styles.inputWrapper}>
                <Phone size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Telefone"
                  value={formData.phone}
                  onChangeText={(text) => handleChange('phone', text)}
                  keyboardType="phone-pad"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

              <View style={styles.inputWrapper}>
                <Lock size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  value={formData.password}
                  onChangeText={(text) => handleChange('password', text)}
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <View style={styles.inputWrapper}>
                <Lock size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar senha"
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleChange('confirmPassword', text)}
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading
                ? <ActivityIndicator color="#FFFFFF" />
                : <Text style={styles.registerButtonText}>Criar Conta</Text>
              }
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 36,
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
  scrollContentContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  registerButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: -6,
    marginBottom: 22,
    marginLeft: 8,
  },
});