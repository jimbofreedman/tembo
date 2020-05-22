from rest_framework import authentication, exceptions
from oauth2_provider.models import AccessToken


class TokenAuthentication(authentication.TokenAuthentication):
    model = AccessToken

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(token=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed(_('Invalid token.'))

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

        return (token.user, token)
