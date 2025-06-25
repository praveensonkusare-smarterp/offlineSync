import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import styles from './Style';
import RealmServices from '../../services/RealmServices';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/userReducers';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Initialize Realm when the component mounts
    const initializeRealm = async () => {
      await RealmServices.initialize();
    };

    initializeRealm();

    return () => {
      // Clean up when the component unmounts
      RealmServices.close();
    };
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setIsLoading(true);
    try {
      const user = await RealmServices.authenticateUser(username, password);
      if (user) {
        dispatch(setUser(user));
        navigation.navigate('MainDrawer', { user });

      } else {
        Alert.alert('Authentication Failed', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setIsLoading(true);
    try {
      const user = await RealmServices.registerUser(username, password, email);
      if (user) {
        Alert.alert('Success', 'Registration successful! You can now log in.', [
          { text: 'OK', onPress: () => setIsLoginScreen(true) }
        ]);
      } else {
        Alert.alert('Registration Failed', 'Username might already be taken');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleScreen = () => {
    setIsLoginScreen(!isLoginScreen);
    // Clear form fields
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>{isLoginScreen ? 'Login' : 'Register'}</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {!isLoginScreen && (
            <TextInput
              style={styles.input}
              placeholder="Email (optional)"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={isLoginScreen ? handleLogin : handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>
                {isLoginScreen ? 'Login' : 'Register'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleScreen} style={styles.switchButton}>
            <Text style={styles.switchText}>
              {isLoginScreen
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
