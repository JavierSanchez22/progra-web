from django.urls import path
from .views import SecretAPIView

urlpatterns = [
    path('secret', SecretAPIView.as_view(), name='create_secret'),
    path('secret/<str:key>', SecretAPIView.as_view(), name='reveal_secret'),
]