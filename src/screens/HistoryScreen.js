import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  ActivityIndicator, 
  SafeAreaView 
} from 'react-native';

import app from '@react-native-firebase/app'; 
import firestore from '@react-native-firebase/firestore';
import OpenArticleButton from '../components/OpenArticleButton';

export default function HistoryScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('articles')
        .get();

      const articlesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArticles(articlesData);
    } catch (error) {
      console.error("Erro ao buscar artigos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Dados dos Artigos (Firestore)</Text>
      
      {articles.map((item) => (
        <View key={item.id} style={styles.card}>
          <OpenArticleButton props={item} />
        </View>
      ))}

      {articles.length === 0 && <Text>Nenhum artigo encontrado.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingTop: 50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  card: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    marginTop: 5,
  },
  value: {
    fontWeight: 'normal',
    color: '#000',
  },
  urlText: {
    fontSize: 12,
    color: '#007bff',
    fontStyle: 'italic',
    marginTop: 2,
  }
});