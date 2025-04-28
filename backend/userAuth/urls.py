from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import CookiesTokenObtainPairView, CookiesTokenRefreshView, logout, is_authenticated, register
from django.urls import path

urlpatterns = [
        path('token/', CookiesTokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('token/refresh/', CookiesTokenRefreshView.as_view(), name='token_refresh'),
        path('logout/', logout),
        path('authenticated/', is_authenticated),
        path('register/', register)

]
