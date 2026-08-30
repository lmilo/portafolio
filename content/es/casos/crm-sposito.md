---
titulo: CRM Sposito
cliente: Sposito · vía Estrateclab
resumen: Calendario editorial y gestión de contenido para una agencia. Llegué a un sistema ya en producción que iba lento, lo medí y lo arreglé.
gancho: Seis peticiones simultáneas tardaban 6,18 segundos. Después, 0,022. La causa no era la base de datos.
orden: 5
estado: produccion
desde: '2026-08'
evidencia:
  - 6,18 s → 0,022 s
  - 100 de 244 commits
  - de 2 pruebas a 14
  - 7 columnas fantasma
  - free tier de 512 MB
stack:
  - Laravel 12
  - PHP-FPM
  - nginx
  - PostgreSQL
  - React
  - TypeScript
  - Google Drive API
  - Docker
# Sin enlace público: el sistema tiene datos reales de los clientes de la
# agencia. Se enseña en entrevista, no se deja indexado.
enlaces: []
capturas:
  - archivo: crm-sposito-dashboard.jpg
    alt: Panel del CRM con seis tarjetas de métricas — usuarios, clientes, ideas, pilares, formatos y comentarios — sobre una tabla de usuarios con sus roles
    pie: El panel de administración. Los datos personales de la tabla están reemplazados por ficticios; la interfaz es la real.
    url: crm interno · agencia de contenidos
    ratio: 1559 / 784
---

Este no es un proyecto que empecé. Es uno al que llegué.

El CRM de Sposito gestiona el calendario editorial de una agencia de contenidos:
ideas, clientes, pilares, videos, aprobaciones del cliente y archivos en Google Drive.
Lo construyó un equipo de tres, y de sus 244 commits **100 son míos**. Desde agosto de
2026 soy el responsable del sistema.

Lo interesante no es lo que construí desde cero. Es lo que encontré.

## El problema

El sistema iba lento y nadie sabía por qué. "Va lento" no es un diagnóstico, así que
lo primero fue medirlo desde fuera, porque la aplicación no contaba nada de sí misma.

Seis peticiones simultáneas a `/up` — un endpoint que no tiene lógica de negocio, solo
responde que está vivo — dieron esto en producción:

```
1,34s · 2,34s · 3,32s · 4,28s · 5,22s · 6,21s
```

::margen
Medido con `curl` desde fuera y la Performance API del navegador.

La aplicación no exponía ninguna métrica propia: por eso lo primero que se agregó después fue `Server-Timing`.
::

Una escalera perfecta de un segundo. Ese patrón no es una consulta lenta ni un índice
que falta: es **una sola petición a la vez**, cada una pagando un segundo de arranque.
Dos problemas apilados, no uno.

## La decisión difícil

Lo tentador era optimizar consultas, que es donde uno mira primero. Habría sido tiempo
perdido: el endpoint medido no toca la base de datos.

**Problema uno: el servidor.** Corría con `php artisan serve`, el servidor embebido de
desarrollo, que atiende una petición a la vez. Se reemplazó por php-fpm y nginx bajo
supervisor, con 4 workers y 256 MB de límite — dimensionado a mano para los 512 MB del
plan gratuito, y verificado en un contenedor limitado a 512 MB: usa 129 MiB.

**Problema dos: el peaje.** En `AppServiceProvider::boot()` había un `runMigrations()`
que corría en **cada petición HTTP**: unas 13 consultas al catálogo de Postgres más un
backfill de clientes, contra una base que además está en otro proveedor. Se sacó de
ahí.

Sacarlo destapó lo que ese arranque venía tapando: seis migraciones marcadas como
pendientes que en realidad ya se habían aplicado en caliente, así que `migrate --force`
fallaba con "already exists". Hubo que hacerlas idempotentes.

Y el guard que debía evitar eso, `hasIndex()`, usaba `getDoctrineSchemaManager()`,
eliminado en Laravel 11: lanzaba siempre, devolvía `false`, y los guards no guardaban
nada.

**Resultado medido:** las mismas 6 peticiones paralelas bajaron de 6,18 s a **0,022 s**
de tiempo total.

## Cómo quedó

Al abrir el capó aparecieron tres cosas más que fallaban en silencio:

**La caché nunca cacheó.** El código usaba `Cache::tags(['ideas'])`, pero el store real
era `file`, que no soporta tags. Lanzaba una excepción, un `try/catch` se la comía, y
`/ideas/all` —el endpoint más caro del sistema— pasaba de largo por la caché en cada
petición. Se cambió a versionado de clave.

**La cola despachaba al vacío.** `QUEUE_CONNECTION=redis` sin Redis instalado: los jobs
de extracción de metadatos de video y borrado en Drive se encolaban a ninguna parte. Se
pasó a driver de base de datos.

**El frontend filtraba en memoria.** Descargaba las 3.382 ideas y filtraba en el
navegador. Los filtros y el orden se movieron a SQL, con lista blanca de columnas
ordenables.

Después vino lo que hace medible el rendimiento de aquí en adelante: un middleware que
expone en cada respuesta cuánto tardó la aplicación, cuánto se fue en base de datos y
cuántas consultas hizo, en la cabecera estándar `Server-Timing` que los navegadores
grafican solos. Además registra las peticiones que pasan de 30 consultas —casi siempre
un N+1— y las consultas de más de 500 ms.

**Y una bomba de tiempo.** Comparando el esquema real de producción contra el que
producen las migraciones sobre una base vacía aparecieron **siete columnas que existían
en producción y que ninguna migración creaba**. El código depende de las siete: sin
`estados_idea.color` falla *cualquier* listado de ideas. Levantar un entorno nuevo, un
staging o una recuperación desde cero producía una aplicación inservible, y nadie lo
sabía porque nadie había reconstruido la base desde cero.

Las pruebas pasaron de 2 pasando y 2 fallando a **14 pasando**. Las dos que fallaban lo
hacían por el auto-migrador del arranque.

## Estado

En producción y en uso diario, y sigo a cargo del sistema.

El siguiente frente es el de seguridad, que se está trabajando con el cliente. Los
detalles no van aquí: un portafolio no es sitio para publicar el estado de
protección de un sistema ajeno, ni siquiera el propio.
