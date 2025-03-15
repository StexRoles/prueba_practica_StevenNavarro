from django.urls import path, include
from rest_framework import routers
from .views import ChalecosViewSet, BeneficiariosViewSet, UsuariosViewSet, search_beneficiarios, login_view

router = routers.DefaultRouter()
router.register(r'usuarios', UsuariosViewSet)
router.register(r'beneficiarios', BeneficiariosViewSet)
router.register(r'chalecos', ChalecosViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search_beneficiarios/', search_beneficiarios, name='search_beneficiarios'),
    path("login/", login_view, name="login")
]