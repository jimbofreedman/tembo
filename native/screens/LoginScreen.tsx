import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Form, Item, Label, Input, Button } from 'native-base';
import SnackBar from 'react-native-snackbar-component'

import useStores from "../hooks/useStores";

export default function LoginScreen() {
    const { authStore } = useStores();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const submit = () => {
        console.log(email, password);
        authStore
            .loginEmailPassword(email, password)
            .catch((message:string) => {
                console.log(message);
                setShowSnackbar(true);
            });
    }

    return (
        <Container>
            <Form>
                <Item floatingLabel>
                    <Label>E-mail address</Label>
                    <Input value={email} onChangeText={(text) => setEmail(text)}  />
                </Item>
                <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
                </Item>

                <Button primary onPress={submit}>
                    <Text>Login</Text>
                </Button>

                <SnackBar visible={showSnackbar} textMessage={snackbarMessage} />
            </Form>
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
