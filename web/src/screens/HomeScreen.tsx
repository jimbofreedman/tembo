import React from 'react';
import { Typography, Button } from '@material-ui/core';

import useStores from '../hooks/useStores';
import Loading from '../components/Loading';
import { observer } from 'mobx-react';

function HomeScreen() {
    const { authStore, profileStore, bookingStore } = useStores();

    const { data } = profileStore;
    const { attributes } = data;

    return (
        <div>
            <Typography>Hi {attributes.email}</Typography>
        </div>
    );
}

export default observer(HomeScreen);
