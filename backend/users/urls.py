from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, DashboardView, UserHomeView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenBlacklistView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('user-home/', UserHomeView.as_view(), name='user-home'),
]
