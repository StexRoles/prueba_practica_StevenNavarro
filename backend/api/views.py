from rest_framework import viewsets, filters
from .serializer import ChalecosSerializer, BeneficiariosSerializer, UsuariosSerializer
from .models import Chalecos, Beneficiarios, Usuarios
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Count, Q  # Import Q for filtering
from rest_framework.decorators import api_view

# Create your views here.
class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

class BeneficiariosViewSet(viewsets.ModelViewSet):
    queryset = Beneficiarios.objects.all()
    serializer_class = BeneficiariosSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']

class ChalecosViewSet(viewsets.ModelViewSet):
    queryset = Chalecos.objects.all()
    serializer_class = ChalecosSerializer

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            # Obtener los datos enviados en formato JSON
            data = json.loads(request.body)
            nombreusuario = data.get("nombreusuario")
            password = data.get("contraseña")  # Contraseña en texto plano

            # Verificar si el usuario existe
            try:
                user = Usuarios.objects.get(nombreusuario=nombreusuario)

                # Comparar la contraseña en texto plano
                if user.password == password:
                    return JsonResponse({"message": "Inicio de sesión exitoso", "token": "fake-jwt-token", "redirect": "/dashboard"}, status=200)
                else:
                    return JsonResponse({"error": "Credenciales incorrectas"}, status=400)

            except Usuarios.DoesNotExist:
                return JsonResponse({"error": "Usuario no encontrado"}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Datos inválidos"}, status=400)

    return JsonResponse({"error": "Método no permitido"}, status=405)

@api_view(['GET'])
def search_beneficiarios(request):
    query = request.GET.get('query', '')
    if not query:
        return JsonResponse({"error": "Query parameter is required"}, status=400)

    # Search for beneficiaries by name or cédula
    beneficiarios = Beneficiarios.objects.filter(
        Q(nombre__icontains=query) | Q(cedula__icontains=query)
    ).annotate(chalecos_count=Count('chalecos'))

    # Prepare the response data
    data = [
        {
            "cedula": beneficiario.cedula,
            "nombre": beneficiario.nombre,
            "chalecos_count": beneficiario.chalecos_count
        }
        for beneficiario in beneficiarios
    ]

    return JsonResponse(data, safe=False)