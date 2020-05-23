module.exports = ({ config }) => {
    return {
        ...config,
        extra: {
            apiUrl: process.env.API_HOST,
            facebook: {
                appId: process.env.FACEBOOK_APP_ID,
                clientId: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            },
            'google-oauth2': {
                clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID,
                clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
            },
        },
    };
};
