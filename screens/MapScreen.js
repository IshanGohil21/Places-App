import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors'

const MapScreen = props => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');

  const[selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation : 37.78,
    longitude: initialLocation ? initialLocation : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectedLocationHandler = event => {
    if(readonly){
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  }

const savePickedLocationHandler = useCallback(() => {
  if(!selectedLocation){
    //Could Show an Alert
    return;
  }
  props.navigation.navigate('NewPlace', {pickedLocation: selectedLocation});
}, [selectedLocation]);

    useEffect(() => {
      props.navigation.setParams({saveLocation : savePickedLocationHandler})
}, [savePickedLocationHandler]);

  let markerCoordinates;

  if(selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  };

  return (
  <MapView style={styles.map} 
  region={mapRegion} 
  onPress={selectedLocationHandler} 
  >
  {markerCoordinates && <Marker title='Picked LOcation' coordinate={markerCoordinates}></Marker>}
  </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam('saveLocation');
  const readonly = navData.navigation.getParam('readonly');
  if(readonly){
    return{};
  }
  return {
    headerRight: ()=>  <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
      <Text style={styles.headerButtonText}>Save</Text>
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;