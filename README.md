# OVERIDE - Microservicio de trayectos

<p align="center">
  <img src="https://user-images.githubusercontent.com/78517969/143524803-79349663-f003-4be6-96b6-eacec147c07b.png" alt="DB_Model" />
  
</p>

Microservicio de manejo de reservas de la applicacion OVERIDE, contiene toda la logica para el manejo de reservas mediante el uso de una API Rest.

## 💻 Requisitos

* NodeJS
* Docker
* MongoDB

## 🛠️ Guia de configuracion

El proyecto se encuentra corriendo bajo un host de docker, es posible utilizar el proyecto de manera local utilizando NodeJS o utilizando docker

### Creacion de variable de entorno
En la raiz del proyecto se debe crear un archivo con el nombre **.env**, con la siguiente informacion

```
MONGODB_URI=<URI proporcionada por mongo>
```

### Configuracion tradicional
La guia de configuracion esta creada bajo comandos Windows. Todos los comandos se deben ejecutar en la raiz del proyecto a la altura del package.json.

#### 1️⃣ Ejecutar el servidor
```console
npm run dev
```

### Configuracion via Docker
La guia de configuracion esta creada bajo comandos Windows. Todos los comandos se deben ejecutar en la raiz del proyecto a la altura del package.json.

#### 1️⃣ Inicio del servidor Docker
```console
docker-compose up
```

#### ⏹️ Cerrar servidor Docker
```console
docker-compose down -v
```

## 📝 Notas

#### 0.1.0

* Inicio del proyecto
* Creada configuración inicial del proyecto
* Instaladas dependencias
* Creada configuracion de babel
* Creada configuracion de Dcoker
* Creada configuracion de la base de datos
