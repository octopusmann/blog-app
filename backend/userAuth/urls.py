from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import CookiesTokenObtainPairSerializer, CookiesTokenRefreshView, logout
from django.urls import path

urlpatterns = [
        path('token/', CookiesTokenObtainPairSerializer.as_view(), name='token_obtain_pair'),
        path('token/refresh/', CookiesTokenRefreshView.as_view(), name='token_refresh'),
        path('logout/', logout)
]
