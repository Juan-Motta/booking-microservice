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

#### 1️⃣ Instalar los paquetes de node
```console
npm install
```

#### 2️⃣ Ejecutar el servidor
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

## ⚙️ API

La aplicacion esta formada por dos subsistemas, el subsistema de ciudades y el subsistemma de trayectos

#### 🟢 Obtener todas las reservas
Devuelve una lista de todas las ciudades almacenadas en la base de datos

```
http://localhost:3000/api/bookings/all
```

#### 🟢 Obtener reservas por id de usuario o trayecto
Devuelve una lista de todas las reservas almacenadas en la base de datos filtradas por id de usuario o trayecto

```
http://localhost:3000/api/bookings/all/ride/id/<id trayecto>
```

```
http://localhost:3000/api/bookings/all/user/id/<id usuaro>
```

#### 🟢 Obtener reserva por id
Devuelve la reserva que corresponda al id especificado

```
http://localhost:3000/api/bookings/id/<id reserva>
```

Ejemplo:
```
http://localhost:3000/api/bookings/id/61a65ee5f5ef51aa41435829
```
```json
{
    "_id": "61a6981b3b501b80762d3846",
    "passengers": [
        {
            "name": "Jhon",
            "last_name": "Doe",
            "document": "12345678",
            "birth": "1993-12-31",
            "phone": "12345678",
            "seat": 1,
            "_id": "61a6981b3b501b80762d3847"
        }
    ],
    "ride_id": 1,
    "user_id": 1,
    "date": "2021-11-30 16:31",
    "__v": 0
}
```

#### 🟢 Obtener sillas ocupadas por trayecto
Devuelve las sillas ocupadas por otras reservas con el mismo trayecto

```
http://localhost:3000/api/bookings/seats/ride/id/<id trayecto>
```

Ejemplo:
```
http://localhost:3000/api/bookings/seats/ride/id/1
```
```json
{
    "occupied_seats": [
        1,
        2
    ]
}
```

#### 🟢 Editar reserva por id
Modifica la reserva asociada al id proporcionado, solo es posible editar el campo ride_id

```
http://localhost:3000/api/bookings/id/<id reserva>
```

Ejemplo:
```
http://localhost:3000/api/bookings/id/61a65ee5f5ef51aa41435829
```
```json
{
    "ride_id": 2
}
```

#### 🟢 Editar pasajero de una reserva
Modifica el pasajero con el id del pasajero proporcionado asociado a la reserva con el id de la reserva proporcionado. Los campos a modificar son opcionales, solo se modificaran los campos proporcionados en el cuerpo de la peticion.

```
http://localhost:3000/api/bookings/id/<id reserva>/passenger/id/<id pasajero>
```

Ejemplo:
```
http://localhost:3000/api/bookings/id/61a65ee5f5ef51aa41435829/passenger/id/61a65ee5f5ef51aa4143582a
```
```json
{
  "name": "Jhon",
  "last_name": "Doe",
  "document": "12345678",
  "birth": "1993-12-31",
  "phone": "12345678",
  "seat": 1,
}
```

#### 🟢 Eliminar una reserva
Elimina la reserva con el id proporcionado

```
http://localhost:3000/api/bookings/id/<id reserva>
```


## 📝 Notas

#### 0.1.0

* Inicio del proyecto
* Creada configuración inicial del proyecto
* Instaladas dependencias
* Creada configuracion de babel
* Creada configuracion de Dcoker
* Creada configuracion de la base de datos

#### 0.2.0

* Creado enpoint para la creacion de reservas
* Creadas validaciones para la creacion de reservas

#### 0.3.0

* Creados endpoints para la obtencion, modificacion y eliminacion de reservas
* Creado endpoint para la obtencion de sillas ocupada
* Creado endpoint para la edicion de pasajeros