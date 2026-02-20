from django.http import HttpResponse
from django.urls import path
from django import urls
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path("", lambda request: HttpResponse("Backend is running")),
    path('register/',views.register,name='register'),
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('protected/',views.protected,name='protected'),
    path('preference/',views.user_preference,name='preference'),
    path('register/',views.RegisterView.as_view(),name='register'),
    path('send_test_email/',views.send_test_email,name='send_test_email'),
    path('send_my_email/',views.send_my_email,name='send_my_email'),
    path('update_email/',views.update_email,name='update_email'),
    path('change_password/',views.change_password,name='change_password'),
]
