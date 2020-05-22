import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Sentry from 'sentry-expo';

Sentry.init({
    dsn: 'https://b09775658d1147bdac9f7eb190030070@o396764.ingest.sentry.io/5250612',
    enableInExpoDevelopment: true,
    debug: true
});

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
        </View>
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
