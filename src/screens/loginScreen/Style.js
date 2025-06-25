import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    formContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#333',
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#4287f5',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    switchButton: {
      marginTop: 20,
    },
    switchText: {
      color: '#4287f5',
      fontSize: 16,
    },
  });

  export default styles;