import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from "../constants/Colors";

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
        Permissions.CAMERA_ROLL, 
        Permissions.CAMERA
        );
    if(result.status !== 'granted'){
        Alert.alert(
            'Insufficient permissions' , 
            'You needt to grant camera permissions to use this app.', 
            [{test: 'OK'}]
        );
        return false;
    }
    return true;
};

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return ;
        }
    const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return <View style={styles.imagePicker}>
        <View style={styles.iamgePreview} >
          {!pickedImage ?  (
          <Text>No Image Selected Yet</Text>
          ) : (
            <Image style={styles.image} source={{ uri: pickedImage }} />
          )}
           </View>
        <Button 
        title="Take Image" 
        color={Colors.primary} 
        onPress={takeImageHandler} 
        />
    </View>
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    iamgePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
        image: {

    }
});

export default ImgPicker;