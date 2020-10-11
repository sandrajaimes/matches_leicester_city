# Partidos Leicester City

_Servicio construido con el objetivo de identificar los partidos del equipo leicester city_

_Se realiza el consumo de una Api, para la actualizacion de los datos referentes al equipo Leicester City, a traves de un cron que se ejecuta los primeros 30 minutos (del 1 al 30), todos los dias a las 23:00 hrs_

_Se disponibilizan un conjunto de endpoints que permitiran:_

_1) Creacion de usuario_

_2) Login_

_3) Obtener un listado de los ulimos x partidos del equipo (configurar cantidad de registros en el cron)_

_4) Obtener el ultimo partido_

_5) Obtener informacion de un partido por id_

_6) Obtener informacion de un partido por fecha_

_7) Obtener informacion de un conjunto de partidos por un rango de fechas_

_8) Obtener informacion de los puntos obtenidos por un rango de fechas_

_9) Creacion de un partido a mano_

## Comenzando 🚀

_Estas instrucciones te permiten configurar tu entorno y obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de pruebas._


### Pre-requisitos 📋

_1) Base de Datos MongoDB (configuracion a eleccion)_

_2) Gestor de Paquetes NPM_

_3) Configuracion de las variables de entorno:_

_3.1) KEY_JWT: Define la llave a usar para el uso de JWT (Obligatorio)_

_3.2) CRONJOB_CONFIG: Permite definir la configuracion en la que se desea corra el cron, tiene una por default_

_3.3) DB_NAME: Define el nombre de la BD, a la que se debe conectar el sistema (Obligatorio)_

_3.4) DB_USER: Define el nombre del usuario en la BD, a la que se debe conectar el sistema (Obligatorio)_

_3.5) DB_PASSWORD: Define la contraseña del usuario en la BD, a la que se debe conectar el sistema (Obligatorio)_

_4) Clonar el proyecto:_

```
git clone https://github.com/sandrajaimes/matches_leicester_city.git
```

Ubicarse a la rama **Develop**.


_Instalacion de paquetes requeridos con NPM_

```
cd ../matcheslester/ npm install
```

### Levantar el servidor 🔧

_Ejecucion de script de inicio del servidor_

```
cd ../matcheslester/ npm run start
```



