import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import * as Sharing from "expo-sharing";


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
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Permissão para acessar a camera</Text>
        <Button onPress={requestPermission} title='grantpermission'></Button>
      </View>
    );
  }

  function toggleCameraType() {

    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  async function sharePic() {
    if (!photo) {
      alert("tire uma foto antes de compartilhar");
      return;
    }

    if(!(await Sharing.isAvailableAsync())){
      alert("Compartilhamento não está disponivel");
      return;
    }

    await Sharing.shareAsync(photo);
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref => {setCameraRef(ref)}}>
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
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (cameraRef) {
                    let photo = await cameraRef.takePictureAsync();
                    console.log('photo', photo);
                    setPhoto(photo.uri);
                  }
                }}>
              <Entypo
                name="camera"
                size={24}
                color="white"
              />
              <Text style={styles.text}>mano</Text>
            </TouchableOpacity>
              {photo&&<View>
                <TouchableOpacity
                style={styles.button}
                onPress={sharePic}>
                <Entypo
                name="share"
                size={24}
                color="white"
                />
                <Text style={styles.text}>Compartilhar a sua mãe</Text>
                </TouchableOpacity>
                </View>}
            
          </View>
        </View>
      </Camera>
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:'column'
  },

  camera: {
    flex: 1
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 5,
    gap: 10
  },
  button: {
    flex: 1,
    alignItems: "center",
    flexDirection: 'row',
    textAlign: "left",
    flexWrap: "wrap",
    gap: 20
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  },
  rodape: {
    position: 'absolute',
    top: "80%",
    left: '30%',
    marginBottom: 35
  }
});
