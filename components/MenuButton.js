import React from 'react';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

function MenuButton({changeMenuIndex, index, menuIndex, text}) {
    return (
        <Button onPress={() => changeMenuIndex(index)} bordered={menuIndex != index} style={menuIndex == index ? styles.menuButtonActive : styles.menuButton}>
            <Text uppercase={false} style={menuIndex == index ? styles.menuTextButtonActive : styles.menuTextButton}> {text} </Text>
        </Button>
    );
}

const styles = StyleSheet.create({
    menuTextButton: {
        color: '#D6D3D3'
    },
    menuTextButtonActive: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    menuButtonActive: {
        backgroundColor: '#0AD8FD',
        marginRight: 7,
        height: 38
    },
    menuButton: {
        backgroundColor: '#FFF',
        borderColor: '#D6D3D3',
        marginBottom: 7,
        marginRight: 7,
        height: 38
    }
});

export default MenuButton;