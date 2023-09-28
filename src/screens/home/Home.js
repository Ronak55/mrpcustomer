import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      console.log('Permission Result:', result);
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Position:', latitude, longitude);
            const region = {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            };
            setInitialRegion(region);
            console.log(initialRegion);
          },
          (error) => console.log(error),
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
        );
      }
    });
  }, []);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    const newMarker = {
      coordinate,
      title: `Marker ${markers.length + 1}`,
      description: `Lat: ${coordinate.latitude}, Long: ${coordinate.longitude}`,
    };

    setMarkers([...markers, newMarker]);
    setCoordinates([...coordinates, coordinate]);
    console.log(coordinates);
  };

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          zoomEnabled={true}
          zoomControlEnabled={true}
          onPress={handleMapPress}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Home;
