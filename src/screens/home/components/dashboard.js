import {View, Text, Dimensions, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import Authservice from '../../../services/auth_service';
import MapView, {Marker, MarkerAnimated} from 'react-native-maps';
import Geolocation, {
  watchPosition,
  getCurrentPosition,
} from 'react-native-geolocation-service';
//import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {setCoords, subLocation} from './firebaseCall';
//import MapView from 'react-native-maps';
//import MapView from 'react-native-maps'
const {width, height} = Dimensions.get('window');
export default function Dashboard() {
  var wat;
  const mapRef = React.useRef();
  const marker = React.useRef();

  const [LoactionData, setLocationData] = useState({
    latitude: 37.42342342342342,
    longitude: -122.08395287867832,
  });
  const succ = pos => {
    console.log(pos, 'aaaaaa');
    // setCoords({coords: {...pos.coords, At: new Date()}});
    // setLocationData({
    //   latitude: pos.coords.latitude,
    //   longitude: pos.coords.longitude,
    // });
  };

  useEffect(() => {
    if (!!LoactionData && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: LoactionData.latitude,
          longitude: LoactionData.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });

      // mapRef.current.
      if (marker) {
        marker?.current?.animateMarkerToCoordinate(LoactionData);
      }
      // setCoords({coords: LoactionData});
      // console.log(marker.current)
    }
  }, [LoactionData]);
  const err = pos => {
    console.log(pos, 'eeeeeeeeeee');
  };
  useEffect(() => {
    subLocation({setState: setLocationData});
  }, []);

  const callback = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    console.log(granted);
    wat = Geolocation.watchPosition(succ, err, {
      enableHighAccuracy: false,

      maximumAge: 1,
      distanceFilter: 4,
      // fastestInterval: 400,
      // interval: 500,
      forceRequestLocation: true,
    });
    // console.log(getCurrentPosition(succ));
  };
  useEffect(() => {
    console.log('RR');
    callback();
    // const WatchID = Geolocation.watchPosition(
    //   e => {
    //     console.log(e, '$$$$$$$$$$$$$$$$$$$$$$$$44');

    //     setLocationData({
    //       latitude: e.coords.latitude,
    //       longitude: e.coords.longitude,
    //     });
    //   },
    //   err => {
    //     console.log(err, '##################');
    //   },
    //   {nableHighAccuracy: false, timeout: 10000, maximumAge: 3000},
    // );
    // Geolocation.getCurrentPosition(e => {
    //   console.log(e, 'ss');

    //   setLocationData({
    //     latitude: e.coords.latitude,
    //     longitude: e.coords.longitude,
    //   });
    // });
    // console.log(WatchID, '00000000000000');

    return () => {
      Geolocation.clearWatch(wat);
    };
  }, []);

  console.log(LoactionData, 'ssaaa');

  return (
    <View>
      <Appbar style={{backgroundColor: '#ff9551'}}>
        <Appbar.Content title="Dashboard" color="white" />
        <Appbar.Action
          icon="logout"
          color="white"
          onPress={() => Authservice.signout()}
        />
      </Appbar>
      <Text style={{fontSize: 25}}>Google maps</Text>
      <MapView
        // followUserLocation
        loadingEnabled
        style={{width: width, height: 500}}
        ref={mapRef}
        initialCamera={{
          altitude: 15000,
          center: {
            latitude: 23.7603,
            longitude: 90.4125,
          },
          heading: 0,
          pitch: 0,
          zoom: 11,
        }}
        loadingBackgroundColor="white"
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={false}>
        <MarkerAnimated
          anchor={{x: 0.5, y: 0.5}}
          ref={marker}
          coordinate={{
            latitude: 37.42342342342342,
            longitude: -122.08395287867832,
          }}
          title={'title'}
          description={'description'}>
          <Icon name="bus" color={'blue'} size={35} />
        </MarkerAnimated>
        {/* <MapView.Marker

          coordinate={{
            latitude: LoactionData.latitude,
            longitude: LoactionData.longitude,
          }}
          title={'title'}
          description={'description'}>
        </MapView.Marker> */}
      </MapView>
    </View>
  );
}
