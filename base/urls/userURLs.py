from django.urls import path
from base.views import userViews as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_optain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name="user_profile"),
    path('profile/update/', views.updateUserProfile, name='user_update'),
    path('', views.getUser, name='user'),
    path('<str:pk>/', views.getUserById, name='update_user'),
    path('update/<str:pk>/', views.updateUser, name='update_user'),
    path('delete/<str:pk>/', views.deleteUser, name='user_delete'),
]