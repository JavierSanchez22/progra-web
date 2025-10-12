import redis
import secrets
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

try:
    redis_instance = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0, charset="utf-8", decode_responses=True)
except Exception:
    redis_instance = None

class SecretAPIView(APIView):
    def post(self, request):
        secret_value = request.data.get('secret')
        if not secret_value:
            return Response({"error": "El campo 'secret' es requerido."}, status=status.HTTP_400_BAD_REQUEST)
        if not redis_instance:
            return Response({"error": "No se pudo conectar a la base de datos."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        key = secrets.token_urlsafe(16)
        while redis_instance.exists(key):
            key = secrets.token_urlsafe(16)
        redis_instance.set(key, secret_value, ex=86400)
        return Response({"key": key}, status=status.HTTP_201_CREATED)

    def get(self, request, key):
        if not redis_instance:
            return Response({"error": "No se pudo conectar a la base de datos."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        secret_value = redis_instance.get(key)
        if secret_value:
            redis_instance.delete(key)
            return Response({"secret": secret_value}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Secreto no encontrado o ya fue revelado."}, status=status.HTTP_404_NOT_FOUND)