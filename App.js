import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import api from './src/services/api';
import PageView from './src/components/PageView';
import Header from './src/components/Header';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await api.get('/testar-github');
      setData(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onScan={handleScan} isLoading={loading} />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.page.toString()}
          renderItem={({ item }) => (
            <PageView pageData={item} baseUrl={api.defaults.baseURL} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});