import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';


export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  if (!permission) {
    return <View />
  }
  if (!permission.granted) {

    return (
      <View style={container}>
        <Text style={{ textAlign: "center" }}>Permissão para acessar a camera</Text>
        <Button onPress={requestPermission} title='grantpermission'></Button>
      </View>
    );
  }

  function toggleCameraType() {

    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref => (setCameraRef(ref))}>
        <View style={styles.rodape}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Entypo
              name="cw"
              size={24}
              color="white"
              
              />
              <Text style={styles.text}>
                Flip camera
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.button}
              onPress={ async()=> {if(cameraRef){
                let photo =await cameraRef.takePictureAsync();
                console.log('photo',photo);
                setPhoto(photo.uri);
              }}}/>
              <Entypo
              name="camera"
              size={24}
              color="white"
              />
              <Text style={styles.text}>tirar piktur</Text>
            </View>
          </View>
        </View>
      </Camera>
      {photo && <Image source={{uri: photo}} style={{width: 200, height: 200}}/>}
    </View>
)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
