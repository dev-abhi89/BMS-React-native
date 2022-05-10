import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getLiveBus, getUserDetails} from '../firebaseCall';
import {Button} from 'react-native-paper';

export default function HomeDashboard() {
  const [userData, setUserData] = useState({});
  const [ongoingBusData, setOngoingBusData] = useState([]);

  useEffect(() => {
    SyncData();
  }, []);

  const SyncData = async () => {
    try {
      const data = await getUserDetails();
      setUserData(data.data());
      const res = await getLiveBus();
      console.log(res.docs);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Text>Dashboard</Text>
      <View>
        <Button
          mode="contained"
          onPress={() => {
            console.log('press');
          }}>
          Start Bus
        </Button>
      </View>
    </View>
  );
}
