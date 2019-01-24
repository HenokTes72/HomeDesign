import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

function BedButton({ changeBeds, myIndex, isBedSelected, text}) {
    return(
        <Button onPress={() => changeBeds(myIndex)} style={isBedSelected == 1 ? styles.buttonCircleActive : styles.buttonCircle}>
            <Text style={isBedSelected == 1 ? styles.buttonTextCircleActive : styles.buttonTextCircle}>{text}</Text>
        </Button>
    );
}

const styles = StyleSheet.create({
    buttonTextCircleActive: {
        color: 'white'
    },
    buttonTextCircle: {
        color: '#D6D3D3'
    },
    buttonCircle: {
        backgroundColor: '#FFF',
        borderRadius: 50,
        height: 38,
        width: 40,
        marginRight: 7
    },
    buttonCircleActive: {
        backgroundColor: '#FF0059',
        borderRadius: 50,
        height: 38,
        width: 40,
        marginRight: 7,
        marginBottom: 7
    }
});

export default BedButton;