import { useEffect } from "react";
import AppNavigation from "./src/navigation";
import app from "@react-native-firebase/app";

export default function App() {
  useEffect(() => {
    if(!app.apps.length){
      console.log("Firebase conectado!");
    }
  }, []);

  return(
    <AppNavigation />
  );
}
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// export default function App() {
//   const [loading, setLoading] = useState(true);
//   const [dbStatus, setDbStatus] = useState('Tentando conectar...');

//   useEffect(() => {
//     // Função para testar a conexão
//     const testConnection = async () => {
//       try {
//         const document = await firestore()
//           .collection('config')
//           .doc('teste')
//           .get();

//         if (document.exists) {
//           setDbStatus(document.data().status);
//         } else {
//           setDbStatus('Documento não encontrado, mas conectou!');
//         }
//       } catch (error) {
//         setDbStatus('Erro na conexão: ' + error.message);
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     testConnection();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Academic Reader - Status Check</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <View style={styles.statusBox}>
//           <Text style={styles.statusText}>{dbStatus}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   statusBox: {
//     padding: 20,
//     backgroundColor: '#e8f5e9',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#4caf50',
//   },
//   statusText: {
//     fontSize: 18,
//     color: '#2e7d32',
//   },
// });