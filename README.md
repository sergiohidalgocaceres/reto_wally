# Reto Wally: Sergio Hidalgo Cáceres

### Instalación

```
npm install
```

### Ejecución local

```
npm run start:dev
```

_El puerto por defecto es el 80_

### Creación de imagen y contenedor

```
docker build -t imagen_app_reto_wally:latest .
docker run -d --name app_reto_wally -p 4000:80 imagen_app_reto_wally
```

_El puerto por defecto es el 4000_

### Ejecutar desde Postman (local, contenedor, AWS)

- Cargar en Postman el archivo postman/Wally.postman_collection.json
- Hay tres carpetas: local, docker y aws. Todas tienen los endpoints para los 3 ambientes.
- En cualquiera de los ambientes, se debe hacer primero la llamada del login para obtener el token
- Usar el token en la sección de Authorization de la carpeta que contiene a las carpetas local, docker y aws. Luego elegir el tipo "Bearer Token" y copiar el token del paso anterior
- Ahora sí se podrán hacer el resto de llamadas
- El token tiene un tiempo de vida de 1 día

### Testing

- Existen 4 pruebas unitarias configuradas. Ejecutar "npm run test"

### Integración y despliegue contínuo

- Ambas acciones se hacen a través de CodePipeline
- El despliegue se realiza sobre una instancia de Elastic Beanstalk en AWS
- En la raíz del proyecto se encuentra el script builspec.yml usado por CodeBuild y el json Dockerrun.aws.json usando por Beanstalk

### Swagger

- El Swagger está en la ruta /api
