import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Button } from 'native-base';
import useStores from "../hooks/useStores";

export default function HomeScreen() {
const { authStore } = useStores();
    return (
        <Container>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Button onPress={authStore.logout} title="Logout"><Text>Logout</Text></Button>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
