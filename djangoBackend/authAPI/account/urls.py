from django.urls import path
from . import views
urlpatterns = [
    path('register/',views.UserRegistrationView.as_view(),name='register'),
    path('login/',views.UserLoginView.as_view(),name='login'),
    path('profile/',views.UserProfileView.as_view(),name='profile'),
    path('changePassword/',views.UserChangePassword.as_view(),name='changePassword'),
    path('send-reset-password-email/',views.SendPasswordResetEmailView.as_view(),name='send-reset-password-email'),
    path('reset-password/<uid>/<token>',views.UserPasswordResetView.as_view(),name='reset-password'),

]
