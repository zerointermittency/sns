# Bienvenido

Este modulo es el encargado de proporcionar las funcionalidades para utilizar las características del servicio [SNS][sns] de Amazon Web Services.

## Instalación

```bash
yarn add @zerointermittency/sns
# npm i --save @zerointermittency/sns
```

## Errores

código | nivel    | nombre      | mensaje
-------|----------|-------------|-----------
100    |fatal     |internal     |Internal error
101    |warning   |alreadyExist |Already exist
102    |warning   |notFound     |Not found

## Api

El modulo utiliza **[aws-sdk][aws-sdk]**, para poder utilizar todas las funcionalidades de [sns][sns] que están descritas en su [documentación][aws-sdk-sns].

##### Iniciar

Se instancia un objeto como se hace a continuación:

```javascript
const ZISns = require('@zerointermittency/sns'),
    sns = new ZISns(sns, platforms);
```

**Argumentos**:

- sns \(*Object*\) **required**: es el objeto que recibe todas las [opciones del constructor de SNS del sdk de amazon][aws-sdk-sns-constructor-property]
- platforms \(*Object*\) **required**: diccionario de las plataformas que son soportadas, ejemplo: ```{ios: 'arn'}```

> arn [Amazon Resource Name][Amazon Resource Name]: es un nombre utilizado por amazon para identificar sus recursos.

**Retorna**:

- \(*ZISns*\): Retorna la instancia de la clase **ZISns**.

#### endpoint

Así es como llama amazon a el punto donde enviá la notificación, en este caso es para el dispositivo registrado

##### Método **endpoint.create**

```javascript
sns.endpoint.create(opts)
    .then((arn) => {})
    .catch((error) => {});
```

**Argumentos**:

- opts \(*Object*\) **required**:
    - platform \(*String*\) **required**: identifica a que plataforma pertenece el **endpoint**
    - token \(*String*\) **required**: token con el cual se enviá la notificación al **endpoint** (token de android (GCM) o ios (APNS))
    - data \(*Object*\): es para guardar información que permita identificar el endpoint

**Retorna**:

- \(*Promise*\):
    - then(arn \[*String*\]):
        - arn \(*String*\): identificador para el endpoint

##### Método **endpoint.read**

```javascript
sns.endpoint.read(arn)
    .then((data) => {})
    .catch((error) => {});
```

**Argumentos**:

- arn \(*String*\) **required**: identifica el **endpoint** a obtener

**Retorna**:

- \(*Promise*\):
    - then(data \[*Object*\]):
        - enabled \(*Boolean*\): identifica si esta activo o no el endpoint
        - token \(*String*\): token con el cual se enviá la notificación al **endpoint** (token de android (GCM) o ios (APNS))
        - data \(*Object*\): información que permite identificar el endpoint

##### Método **endpoint.update**

```javascript
sns.endpoint.update(arn, opts)
    .then(() => {})
    .catch((error) => {});
```

**Argumentos**:

- arn \(*String*\) **required**: identifica el **endpoint** a actualizar
- opts \(*Boolean*\) **required**:
    - enabled \(*Boolean*\): identifica si esta activo o no el endpoint
    - token \(*String*\): token con el cual se enviá la notificación al **endpoint** (token de android (GCM) o ios (APNS))
    - data \(*Object*\): información que permite identificar el endpoint

**Retorna**:

- \(*Promise*\):
    - then(): cuando se termina de actualizar correctamente


##### Método **endpoint.delete**

```javascript
sns.endpoint.delete(arn)
    .then(() => {})
    .catch((error) => {});
```

**Argumentos**:

- arn \(*String*\) **required**: identifica el **endpoint** a eliminar

**Retorna**:

- \(*Promise*\):
    - then(): cuando se termina de eliminar correctamente

#### topic

Este es un termino para agrupar los endpoint, es utilizado para enviar notificaciones a todos los endpoint registrados en el

##### Método **topic.create**

```javascript
sns.topic.create(name)
    .then((arn) => {})
    .catch((error) => {});
```

**Argumentos**:

- name \(*String*\) **required**: identifica el topic (tener presente que de ser único)

**Retorna**:

- \(*Promise*\):
    - then(arn \[*String*\]):
        - arn \(*String*\): identificador para el topic

##### Método **topic.read**

```javascript
sns.topic.read(arn)
    .then((data) => {})
    .catch((error) => {});
```

**Argumentos**:

- arn \(*String*\) **required**: identifica el **topic** a obtener

**Retorna**:

- \(*Promise*\):
    - then(data \[*Object*\]):
        - displayName \(*String*\): nombre que es enviado en la notificación para identificar  el topic desde que se envió
        - pending \(*Number*\): numero de suscripciones pendientes
        - confirmed \(*Number*\): numero de suscripciones confirmadas
        - deleted \(*Number*\): numero de suscripciones eliminadas

##### Método **topic.update**

```javascript
sns.topic.update(arn, displayName)
    .then((data) => {})
    .catch((error) => {});
```

**Argumentos**:

- arn \(*String*\) **required**: identifica el **topic** a obtener
- displayName \(*String*\) **required**: nombre que es enviado en la notificación para identificar  el topic desde que se envió

> **displayName**: solo se permite modificar este atributo

**Retorna**:

- \(*Promise*\):
    - then(): cuando se ha actualizado correctamente

##### Método **topic.delete**

```javascript
sns.topic.delete(arn)
    .then(() => {})
    .catch((error) => {});
```

**Argumentos**:

- arn \(*String*\) **required**: identifica el **topic** a eliminar

**Retorna**:

- \(*Promise*\):
    - then(): cuando se termina de eliminar correctamente

##### Método **topic.subscribe**

suscribe un endpoint a un topic

```javascript
sns.topic.subscribe(topic, endpoint)
    .then((subscriptionArn) => {})
    .catch((error) => {});
```

**Argumentos**:

- topic \(*String*\) **required**: identifica el **topic** donde se suscribirá el endpoint
- endpoint \(*String*\) **required**: identifica el **endpoint** a suscribir

**Retorna**:

- \(*Promise*\):
    - then(subscriptionArn \[*String*\]):
        - subscriptionArn \(*String*\): identificador para la suscripción del endpoint en el topic

##### Método **topic.unsubscribe**

de-suscribe un endpoint de un topic

```javascript
sns.topic.unsubscribe(subscriptionArn)
    .then(() => {})
    .catch((error) => {});
```

**Argumentos**:

- subscriptionArn \(*String*\) **required**: identifica la suscripción a eliminar

**Retorna**:

- \(*Promise*\):
    - then(): cuando de-suscribe correctamente el endpoint del topic

#### Método **send**

Es el método que enviá la notificación a un endpoint o topic especifico

ejemplo:

```javascript
const ZISns = require('npm-sns'),
    sns = new ZISns(opts),
sns.send(opts)
    .then(() => {})
    .catch((error) => {});
```

**Argumentos**:

- opts \(*String*\) **required**:
    - topic \(*String*\) **required/endpoint**: identifica el topic que se utilizara para el envió de notificaciones a todos sus endpoint registrados, si no define **endpoint** es requerido
    - endpoint \(*String*\) **required/topic**: identifica el endpoint al que se le enviara la notificación, si no define **topic** es requerido
    - alert \(*Objet*\) **required**:
        - title \(*String*\) **required**: titulo que tendrá la notificación
        - body \(*String*\) **required**: cuerpo de la notificación
    - deepLink \(*String*\) **required**: enlace al elemento que esta relacionado a la notificación dentro de la aplicación
    - ttl \(*Number*\): tiempo maximo antes de cancelar una notificación enviada a un **endpoint**, si es que este no la recibe, por defecto **60**
    - sound \(*String*\): nombre que identifica el sonido de la notificación, por defecto **default**

**Retorna**:

- \(*Promise*\):
    - then(): cuando la notificación se envió exitosamente


## Pruebas funcionales (Unit Testing)

Se llevaron a cabo las pruebas funcionales para validar el funcionamiento de sus método y opciones por defecto:

> IMPORTANTE: para hacer la prueba de envió de notificación es necesario tener **arns** activos a los cuales poder enviar notificaciones y se debe agregar el archivo las credenciales ```/test/config.js``` basándose en ```/test/config-sample.js```

```bash
yarn test
```

## Changelog

Todos los cambios importantes son escritos aquí. El Formato esta basado en [Keep a Changelog](http://keepachangelog.com/es-ES/1.0.0/)

### [Unreleased]

### [1.0.0] - 2018-01-08
#### Added
- Se agregan pruebas funcionales con el objetivo de tener probado todo el código, usando [istanbul js][istanbul] para saber cuanto
- CRUD para manipulación de **[endpoint][sns]** (token de dispositivo)
- CRUD para manipulación de **[topic][sns]**
- (de)subscribir un **[endpoint][sns]** a un **[topic][sns]**
- metodo **send** para enviar una notificación a todos los **[endpoint][sns]** de un **[topic][sns]** o a un **[endpoint][sns]** específico

[sns]: http://docs.aws.amazon.com/sns/latest/dg/SNSMobilePush.html
[aws-sdk]: https://www.npmjs.com/package/aws-sdk
[aws-sdk-sns]: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html
[aws-sdk-sns-constructor-property]:http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html#constructor-property
[Amazon Resource Name]:http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[npm-error]: https://bitbucket.org/smartbox_way/npm-error
[istanbul]: https://istanbul.js.org/