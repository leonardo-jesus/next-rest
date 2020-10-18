import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import api from './../services/api';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

interface Rest {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function RestsMap() {
  const [rests, setRests] = useState<Rest[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('rests').then(res => {
      setRests(res.data);
    });
  });

  function handleNavigateToRestDetails(id: number) {
    navigation.navigate('RestDetails', { id });
  };

  function handleNavigateToCreateRest() {
    navigation.navigate('SelectMapPosition');
  };

  return(
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -23.551339,
          longitude: -46.634372,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
      >
        {rests.map(rest => {
          return(
            <Marker
              key={rest.id} 
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: rest.latitude,
                longitude: rest.longitude,
              }} 
            >
              <Callout tooltip onPress={() => handleNavigateToRestDetails(rest.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{rest.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{rests.length} casas de repouso encontradas</Text>

        <RectButton style={styles.createRestButton} onPress={handleNavigateToCreateRest}>
          <Feather name="plus" size={20} color="#FFFFFF" />
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089A5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  footerText: {
    color: '#8FA7B3',
    fontFamily: 'Nunito_700Bold',
  },

  createRestButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

});