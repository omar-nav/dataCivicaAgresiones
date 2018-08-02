var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// --Url para conectarse a mongo
const url = "mongodb://localhost:27017";

// --Nombre de base de datos
const dbName = 'dashboards';

// --Nombre de colección en base de datos ('dash-tuto')
const collectionName = 'personas';


// --Variables globales para conexión a base de datos y colección
var db;
var collection;


/**
 * --GET obtener listado completo de registros
 * (http://localhost:3000/)
 */
router.get('/', function(req, res, next) {
  // --Iniciar conexión a cliente de mongo
  MongoClient.connect(url, function(err, client){
    if(err){  // --Si el servicio de mongo (mongod) esta apagado, regresar el error
      res.status(500).send(err);
    }else{
      // --Entrar a la base de datos "dash-tuto"
      db = client.db(dbName);

      // --Usar colección "personas" en "dash-tuto"
      collection = db.collection(collectionName);

      // --Método find de mongo (referencia http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#find)
      // --Se agrega un método "toArray" porque viendo la referencia "find()" no tiene un callback
      collection.find({}).toArray(function(err, result){
        if(err){  // --Si no fue posible realizar la consulta, regresar el error
          res.send(err);
        }else{
          res.send(result);
        }
      });
    }
  })
  // --Se cierra conexión a mongo
});

/**
 * --GET obtener un registro en especifico
 * (http://localhost:3000/2)
 * Para acceder al :id (e.g. 2) se emplea "req.params.id"
 */
router.get('/:id', function(req, res, next){
  // --Iniciar conexión a cliente de mongo
  MongoClient.connect(url, function(err, client){
    if(err){  // --Si el servicio de mongo (mongod) esta apagado, regresar el error
      res.status(500).send(err);
    }else{
      // --Entrar a la base de datos "dash-tuto"
      db = client.db(dbName);

      // --Usar colección "personas" en "dash-tuto"
      collection = db.collection(collectionName);

      // --Convertimos el parametro id, de tipo string a tipo int (integer || entero) porque así esta definido en nuestra base de datos
      var personaId = parseInt(req.params.id);

      // --Método findOne de mongo (referencia http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOne)
      // --FindOne acepta un callback como último de sus parametros por eso se agrega una función después del criterio de búsqueda (query)
      collection.findOne({ persona: personaId }, function(err, result){
        if(err){  // --Si no fue posible realizar la consulta, regresar el error
          res.status(500).send(err);
        }else{
          res.send(result);
        }
      })
    }
  })
  // --Se cierra conexión a mongo
});

/**
 * --POST crear un nuevo registro
 * (http://localhost:3000/)
 * Para acceder a los datos del nuevo registro emplear "req.body"
 */
router.post('/', function(req, res, next){
  // --Iniciar conexión a cliente de mongo
  MongoClient.connect(url, function(err, client){
    if(err){  // --Si el servicio de mongo (mongod) esta apagado, regresar el error
      res.status(500).send(err);
    }else{
      // --Entrar a la base de datos "dash-tuto"
      db = client.db(dbName);

      // --Usar colección "personas" en "dash-tuto"
      collection = db.collection(collectionName);

      // --Se debe asegurar que el contenido de req.body sea un objeto cumpliendo la sintaxis JSON
      var newPersona = req.body;

      // --Método insertOne de mongo (referencia http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#insertOne)
      // InsertOne acepta un callback como último de sus parametros, por eso se hagrega una función después de los datos del nuevo registro (docs)
      collection.insertOne(newPersona, function(err, result){
        if(err){  // --Si no fue posible realizar la consulta, regresar el error
          res.status(500).send(err);
        }else{
          res.send(result);
        }
      })
    }
  })
  // --Se cierra conexión a mongo
});

/**
 * --PUT actualizar un registro
 * (http://localhost:3000/2)
 * Para acceder al :id (e.g. 2) se emplea "req.params.id" y se emplea para identificar el registro a actualizar
 * Para acceder a los datos a actualizar emplear "req.body" y se emplea para identificar los campos a actualizar así como sus nuevos valores
 */
router.put('/:id', function(req, res, next){
  // --Iniciar conexión a cliente de mongo
  MongoClient.connect(url, function(err, client){
    if(err){  // --Si el servicio de mongo (mongod) esta apagado, regresar el error
      res.status(500).send(err);
    }else{
      // --Entrar a la base de datos "dash-tuto"
      db = client.db(dbName);

      // --Usar colección "personas" en "dash-tuto"
      collection = db.collection(collectionName);

      // --Convertimos el parametro id, de tipo string a tipo int (integer || entero) porque así esta definido en nuestra base de datos
      var personaId = parseInt(req.params.id);

      // --Recibimos un objeto JSON con los campos y valores a actualizar
      var updateData = req.body;

      // --Método findOneAndUpdate de mongo (referencia http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOneAndUpdate)
      // FindOneAndModify acepta un callback como último de sus parametros, siendo en este caso: {filter}, {update}, callback
      collection.findOneAndUpdate({persona: personaId}, {$set: updateData}, {upsert:true, returnOriginal:false}, function(err, result){
        if(err){  // --Si no fue posible realizar la consulta, regresar el error
          res.status(500).send(err);
        }else{
          res.send(result);
        }
      })
    }
  })
  // --Se cierra conexión a mongo
});

/* DELETE erase person */
/**
 * --DELETE borrar de la base de datos (borrado físico)
 * (http://localhost:3000/2)
 * Para acceder al :id (e.g. 2) se emplea "req.params.id"
 */
router.delete('/:id', function(req, res, next){
  // --Iniciar conexión a cliente de mongo
  MongoClient.connect(url, function(err, client){
    if(err){  // --Si el servicio de mongo (mongod) esta apagado, regresar el error
      res.status(500).send(err);
    }else{
      // --Entrar a la base de datos "dash-tuto"
      db = client.db(dbName);

      // --Usar colección "personas" en "dash-tuto"
      collection = db.collection(collectionName);

      // --Convertimos el parametro id, de tipo string a tipo int (integer || entero) porque así esta definido en nuestra base de datos
      var personaId = parseInt(req.params.id);

      // --Método deleteOne (referencia http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#deleteOne)
      // --DeleteOne acepta un callback como último de sus parametros por eso se agrega una función después del criterio de busqueda (filter)
      collection.deleteOne({persona: personaId }, function(err, result){
        if(err){  // --Si no fue posible realizar la consulta, regresar el error
          res.status(500).send(err);
        }else{
          res.send(result);
        }
      });
    }
  })
});

module.exports = router;
