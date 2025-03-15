from rest_framework import serializers
from .models import Chalecos, Beneficiarios, Usuarios

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class BeneficiariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiarios
        fields = '__all__'
    
class ChalecosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chalecos
        fields = '__all__'