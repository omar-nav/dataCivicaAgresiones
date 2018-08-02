var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;

// --Url para conectarse a mongo
const url = "mongodb://localhost:27017";

// --Nombre de base de datos
const dbName = "dashboards";

// --Nombre de colección en base de datos ('dash-tuto')
const collectionName = "agresiones";

// --Variables globales para conexión a base de datos y colección
var db;
var collection;

/**
 * --GET obtener listado completo de registros
 * (http://localhost:3000/)
 */
router.get("/", function(req, res, next) {
  // --Iniciar conexión a cliente de mongo
  MongoClient.connect(
    url,
    function(err, client) {
      if (err) {
        // --Si el servicio de mongo (mongod) esta apagado, regresar el error
        res.status(500).send(err);
      } else {
        // --Entrar a la base de datos "dash-tuto"
        db = client.db(dbName);

        // --Usar colección "reportes" en "dash-tuto"
        collection = db.collection(collectionName);

        // --Método find de mongo (referencia http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#find)
        // --Se agrega un método "toArray" porque viendo la referencia "find()" no tiene un callback
        collection.find({}).toArray(function(err, result) {
          if (err) {
            // --Si no fue posible realizar la consulta, regresar el error
            res.send(err);
          } else {
            res.send(result);
          }
        });
      }
    }
  );
  // --Se cierra conexión a mongo
});

module.exports = router;
