import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from "@expo/vector-icons"
import mapMarker from '../images/mapMarker.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useFonts} from  'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage  {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap(){
const [orphanages, setOrphanages]= useState<Orphanage[]>([])
  const navigation = useNavigation()

    useFocusEffect(()=>{
      api.get('orphanages').then(response=>{
        setOrphanages(response.data)
      })
    })

function handleNavigateToOrphanageDetails(id:number){
 navigation.navigate('OrphanageDetails',{ id })
}
function handleNavigatoToCreateOrphanage(){
  navigation.navigate('SelectMapPosition')
 }
 const fontsLoaded = useFonts({
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold
});

if(!fontsLoaded){
  return null;
}

    return(
        <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -23.6420983,
            longitude: -46.6029821,
            latitudeDelta: 0.888,
            longitudeDelta: 0.888,
          }}
        >
         
         {orphanages.map(orphanage => {
           return (
            <Marker
            key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.callowtContainer}>
          <Text style={styles.callowtText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
           )
         })}

        </MapView>
        <View style={styles.footer}>
        <Text style={styles.footerText}> { orphanages.length } orfanatos encontrados</Text>
          <RectButton style={styles.createOrphanageButton} onPress={handleNavigatoToCreateOrphanage}>
            <Feather name="plus" size={28} Color="#fff" />
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
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height+75,
    },
    callowtContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 16,
      justifyContent: 'center',
  
    },
    callowtText: {
      color: '#8889a5',
      fontSize: 14,
      elevation:3,
      fontFamily: 'Nunito_700Bold',
  
    },
    footer: {
      position: 'absolute',
      left: 32,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation:3,
    },
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 52,
    }
  
  
  });
  