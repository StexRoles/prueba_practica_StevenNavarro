from django.contrib import admin
from .models import Usuarios, Chalecos, Beneficiarios

# Register your models here.
admin.site.register(Usuarios)
admin.site.register(Chalecos)
admin.site.register(Beneficiarios)