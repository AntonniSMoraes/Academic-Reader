import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

const PageView = ({ pageData, baseUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${baseUrl}${pageData.image_url}` }}
        style={styles.image}
        contentFit="contain"
        transition={300}
      />
      
      {/* Camada de QR Codes */}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {pageData.qrcodes.map((qr, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.qrBox, {
              left: `${qr.x_pct}%`,
              top: `${qr.y_pct}%`,
              width: `${qr.w_pct}%`,
              height: `${qr.h_pct}%`,
            }]}
            onPress={() => Alert.alert("Link Encontrado", qr.url)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width * 1.41,
    position: 'relative',
    backgroundColor: '#000',
    marginBottom: 10,
  },
  image: { flex: 1 },
  qrBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#00ff00',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    borderRadius: 2,
  }
});

export default PageView;