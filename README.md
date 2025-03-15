# Login con Django y React 

Este proyecto implementa una api con Django (backend) y React (frontend) para gestionar el acceso de usuarios y la gestion de beneficiarios.

## 🚀 Tecnologías utilizadas
- **Backend**: Django, Django REST Framework
- **Frontend**: React, React Router, Tailwindcss, SweetAlert
- **Base de datos**: PostgreSQL

---

## 🔧 Configuración del Backend (Django)

### 1️⃣ Instalar dependencias
```sh
pip install -r requirements.txt
```

### 2️⃣ Crear la base de datos en pgAdmin 4
1. Utilizar el archivo database.sql para crear baase de datos y tablas
2. Verificar las conexion con la base de datos de postgresql en settings.py



### 3️⃣ Migraciones y correr servidor
```sh
python manage.py migrate
python manage.py runserver
```

### 4️⃣ Documentación de la API 
La documentación de la API está disponible en:
📌 http://127.0.0.1:8000/docs/
Aquí se pueden visualizar y probar los endpoints de la API.

---

## 🖥️ Configuración del Frontend (React)

### 1️⃣ Instalar dependencias
```sh
npm install
```

### 2️⃣ Ejecutar el proyecto 
```sh
npm run dev
```
---

## 🛠 Pruebas QA

### ✅ Prueba con credenciales correctas
1. Iniciar sesión con un usuario válido.
2. Verificar que la API responde.
3. Confirmar que el token se almacena en `localStorage`.

### ❌ Prueba con credenciales incorrectas
1. Ingresar credenciales erróneas.
2. Confirmar que la API responde con `401` y muestra un mensaje de error.

### 🔒 Prueba de rutas protegidas
1. Intentar acceder a `/dashboard` sin iniciar sesión.
2. Verificar que redirige a `/login`.

### 🔄 Prueba de cierre de sesión
1. Iniciar sesión y luego cerrar sesión.
2. Confirmar que el token se elimina y redirige a `/login`.

### ⏳ Prueba de expiración del token
1. Eliminar el token manualmente desde `localStorage`.
2. Intentar acceder a `/dashboard` y verificar que redirige a `/login`.

### 🛠 Prueba con Postman
1. Enviar una peticiones a `http://127.0.0.1:8000/api/` con:

---