import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Button } from 'native-base';
import useStores from "../hooks/useStores";
import Loading from '../components/Loading';
import {observer} from "mobx-react";

function HomeScreen() {
    const { authStore, profileStore } = useStores();

    React.useEffect(() => {
        if (!profileStore.loaded) {
            profileStore.load();
        }
    });

    if (!profileStore.loaded) {
        console.log(profileStore.loaded, profileStore.loading, profileStore.error);
        return <Container><Loading /></Container>
    }

    return (
        <Container>
            <Text>Hi {profileStore.data.attributes.email}</Text>
            <Button onPress={authStore.logout} title="Logout"><Text>Logout</Text></Button>
        </Container>
    );
}

export default observer(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
