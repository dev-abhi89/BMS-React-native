import Firebase from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

export const subLocation = async ({channel = 'test', setState = () => {}}) => {
  Firebase()
    .collection('location')
    .doc('test')
    .collection('LiveLocation')
    .orderBy('At')
    .onSnapshot(e => {
      try {
        if (e && e.docs) {
          let temp = e.docs[e.docs.length - 1];
          console.log(temp);
          setState({
            latitude: temp._data.latitude,
            longitude: temp._data.longitude,
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
};

export const setCoords = async ({channel = 'test', coords}) => {
  try {
    Firebase()
      .collection('location')
      .doc('test')
      .collection('LiveLocation')
      .add(coords);
  } catch (e) {
    console.log(e);
  }
};

export const getUserDetails = async () => {
  try {
    const userData = await Firebase()
      .collection('user')
      .doc(Auth().currentUser.uid)
      .get();
    return userData;
  } catch (e) {
    console.log(e);
    return -1;
  }
};

export const setUserDetails = async ({uid, data}) => {
  try {
    await Firebase().collection('user').doc(uid).set(data);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const getLiveBus = async () => {
  try {
    const response = await Firebase()
      .collection('liveBusData')
      .where('onTheWay', '==', true)
      .get();
    return response;
  } catch (e) {
    console.log(e);
    return -1;
  }
};

export const SetLiveBus = async () => {
  try {
    await Firebase()
      .collection('liveBusData')
      .doc(Auth().currentUser.uid)
      .update({onTheWay: false});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const CreateLiveBusData = async () => {
  try {
    await Firebase()
      .collection('liveBusData')
      .doc(Auth().currentUser.uid)
      .set({onTheWay: false, title: 'Bus no 4'});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
