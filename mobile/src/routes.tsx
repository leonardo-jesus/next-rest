import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import RestsMap from './pages/RestsMap';
import RestDetails from './pages/RestDetails';

import SelectMapPosition from './pages/CreateRest/SelectMapPosition';
import RestData from './pages/CreateRest/RestData';
import Header from './components/header';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false , cardStyle: { backgroundColor: '#f2f3f5'} }}>
        <Screen 
          name="RestsMap" 
          component={RestsMap} 
        />

        <Screen 
          name="RestDetails"
          component={RestDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Casa de Repouso" />
          }}
        />

        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition} 
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        />

        <Screen 
          name="RestData" 
          component={RestData} 
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}