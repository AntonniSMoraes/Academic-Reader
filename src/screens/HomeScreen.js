import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { ScanSearch } from 'lucide-react-native';
import api from '../services/api';
import PageView from '../components/PageView';

export default function HomeScreen() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await api.get('/testar-github');
      setPages(response.data.data);
    } catch (error) {
      console.error("Erro ao processar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {pages.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <ScanSearch size={80} color="#333" />
          <Text style={styles.text}>Nenhum documento carregado</Text>
          <TouchableOpacity style={styles.button} onPress={handleScan}>
            <Text style={styles.buttonText}>Escanear PDF de Teste</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={pages}
          keyExtractor={(item) => item.page.toString()}
          renderItem={({ item }) => <PageView pageData={item} baseUrl={api.defaults.baseURL} />}
          ListHeaderComponent={() => (
             <TouchableOpacity style={styles.miniButton} onPress={handleScan}>
                <Text style={styles.buttonText}>Atualizar / Novo Scan</Text>
             </TouchableOpacity>
          )}
        />
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>O Python está processando as páginas no Render...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { color: '#888', marginTop: 20, fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, marginTop: 30, width: '80%', alignItems: 'center' },
  miniButton: { backgroundColor: '#007AFF', padding: 10, margin: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loadingOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#fff', marginTop: 15 }
});