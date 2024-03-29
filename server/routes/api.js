const express = require('express');
const mysql = require('mysql');
const router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'mydb',
  port     : 3306
});

connection.connect(function(err) {
  if (err) throw err
  console.log('Estas conectado!')
})

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/materiales', function (req, res) {
   connection.query('select * from Material', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

router.post('/bodega', function (req, res) {
  query = "select material.Nombre, bodega.Cantidad, material.Descripcion from bodega, material, obra, `bodeguero de obra` where usuario_id = " + req.body.id;
  query += " and `bodeguero de obra_id` = id_bodeguero_obra  and material_id = id_material and id_obra = obra_id";
  connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send(JSON.stringify(results));
  });
});

router.post('/encontrar_bc', function (req, res) {
   query  = 'select * from `bodeguero de obra` where usuario_id = ' + req.body.id ;
   console.log(query);
   connection.query(query, function (error, results, fields) {
         if (error) throw error;
         return res.send(JSON.stringify(results));
   });
});

router.post('/encontrar_bc2', function (req, res) {
   query  = 'select * from `bodeguero central` where usuario_id = ' + req.body.id ;
   console.log(query);
   connection.query(query, function (error, results, fields) {
         if (error) throw error;
         return res.send(JSON.stringify(results));
   });
});


router.post('/encontrar_ec', function (req, res) {
   query  = 'select * from `encargado de compra` ' ;
   console.log(query);
   connection.query(query, function (error, results, fields) {
         if (error) throw error;
         return res.send(JSON.stringify(results));
   });
});


router.post('/encontrar_id', function (req, res) {
   query  = 'select * from `bodeguero central` where usuario_id = ' + req.body.id ;
   console.log(query);
   connection.query(query, function (error, results, fields) {
         if (error) throw error;
         return res.send(JSON.stringify(results));
   });
});

router.post('/encontrar_id2', function (req, res) {
   query  = 'select * from `encargado de compra` where usuario_id = ' + req.body.id ;
   console.log(query);
   connection.query(query, function (error, results, fields) {
         if (error) throw error;
         return res.send(JSON.stringify(results));
   });
});


router.post('/encontrar_solicitudes', function (req, res) {
   query  = 'SELECT id_solicitud_material, id_material, id_obra, Apellido, `material`.Cantidad AS cantidad_bodega,`material_solicitud`.Cantidad AS cantidad_solicitud, Fecha, `material_solicitud`.Nombre AS nombre_material, `usuario`.Nombre AS nombre_bodeguero, `obra`.Nombre as nombre_obra, Ubicacion from `solicitud de material`, `material_solicitud`, `bodeguero de obra`, `usuario`, `obra`,`material` where `bodeguero central_id` = ' + req.body.id;
   query += ' and `id_solicitud_material` = `solicitud de material_id` and `solicitud de material`.`bodeguero de obra_id` = `id_bodeguero_obra` and `usuario_id` = `id_usuario` and `id_bodeguero_obra` = `obra`.`bodeguero de obra_id` and `material_solicitud`.Nombre = `material`.Nombre';
   connection.query(query, function (error, results, fields) {
         if (error) throw error;
         return res.send(JSON.stringify(results));
   });
});



router.post('/encontrar_solicitudescompra', function (req, res) {
   query  = 'select Apellido, Cantidad, Fecha, `material_compra`.Nombre AS nombre_material, `usuario`.Nombre AS nombre_bodeguero from `solicitud de compra`, `material_compra`, `bodeguero central`, `usuario` where `encargado de compra_id` = ' + req.body.id;
   query += ' and `id_solicitud_compra` = `solicitud de compra_id` and `bodeguero central_id` = `id_bodeguero_central` and `usuario_id` = `id_usuario`';
   console.log(query);
   connection.query(query, function (error, results, fields) {
         if (error) throw error;
         return res.send(JSON.stringify(results));
   });
});

router.get('/bc', function (req, res) {
   connection.query('select * from `bodeguero central`, usuario where id_usuario = usuario_id', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

router.post('/usuario', function (req, res) {
  consulta = 'select * from usuario where Nombre = "' + req.body.nombre + '" and Contrasena = "' + req.body.contrasena + '"';
  connection.query(consulta, function (error, results, fields) {
        if (error) throw error;
        return res.send(JSON.stringify(results));
      });
});

router.post('/materiales', function (req, res) {
  consulta = 'insert into `mydb`.material (Nombre, Cantidad, Descripcion) values ("' + req.body.nombre + '" ,' + req.body.cantidad + ' ,"' + req.body.descripcion +'" )';
  console.log(consulta);
  connection.query(consulta, function (error, results, fields) {
  if (error) throw error;
  return res.send("¡Material creado exitosamente!");
  });
});

router.post('/agregar', function (req, res) {
  consulta = 'insert into Usuario (Nombre, Cargo, Contrasena, Apellido, Mail) values ("' + req.body.nombre + '" ,' + req.body.cargo + ' ,"' + req.body.password +'", "' + req.body.apellido +'", "' + req.body.email +'")';
  connection.query(consulta, function (error, results, fields) {
  if (error) throw error;
  return res.send("¡Usuario creado exitosamente!");
  });
});

router.post('/bodega/borrar', function (req, res) {
  consulta = 'DELETE from  `mydb`.material where id_material = ' + req.body.ID;
  connection.query(consulta, function (error, results, fields) {
  if (error) throw error;
  return res.send("¡Material eliminado exitosamente!");
  });
});


router.post('/crearobra', function (req, res) {
  consulta = 'insert into Obra (Nombre, Descripcion, Ubicacion) values (';
  consulta += '"' + req.body.nombre   +'" ,';
  consulta += '"' + req.body.descripcion   +'" ,';
  consulta += '"' + req.body.ubicacion    +'" )';
  connection.query(consulta, function (error, results, fields) {
  if (error) throw error;
  return res.send("¡Obra creada exitosamente!");
  });
});

router.get('/obra', function (req, res) {
   connection.query('select * from obra where `bodeguero de obra_id` is NULL', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

router.get('/obras_asignadas', function (req, res) {
   connection.query('select `obra`.Nombre AS nombre_obra, `usuario`.Nombre AS nombre_bodeguero, Apellido, Descripcion, Ubicacion from obra, `bodeguero de obra`, usuario where id_obra = id_bodeguero_obra and usuario_id = id_usuario and `obra`.`bodeguero de obra_id` is not null', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

router.get('/usuario/bodeguero_obra', function (req, res) {
   connection.query('select * from `bodeguero de obra`, usuario where id_usuario = usuario_id', function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});

router.post('/asignar_bodeguero', function(req, res) {
  query = "UPDATE obra SET `bodeguero de obra_id` = " + req.body.id_bodeguero + " WHERE id_obra = " + req.body.id_obra;
  console.log(query);
  connection.query(query, function (error, results, fields) {
  if (error) throw error;
  });

  query2 = "UPDATE `bodeguero de obra` SET `bc_id` = " + req.body.id_bodeguero_central + " WHERE id_bodeguero_obra = " + req.body.id_bodeguero;
  console.log(query2);
  connection.query(query2, function (error, results, fields) {
  if (error) throw error;
  });

  return res.send("¡Obra asignada!");
});

router.post('/agregar_usuario', function(req, res) {
  query_user = 'INSERT INTO usuario (Nombre, Apellido, Contrasena, Cargo, Mail) VALUES (';
  query_user += '"' + req.body.nombre   +'" ,';
  query_user += '"' + req.body.apellido +'" ,';
  query_user += '"' + req.body.password +'" ,';
  query_user +=       req.body.cargo    +'  ,';
  query_user += '"' + req.body.email    +'" )';
  connection.query(query_user, function (error, results, fields) {
    if (error) throw error;
    if (results) {
      if(req.body.cargo == 2) {
        query_bc = 'INSERT INTO `mydb`.`bodeguero central` (usuario_id) VALUES (';
        query_bc +=  results.insertId + ')';
        connection.query(query_bc, function (error, results, fields) {
          if (error) throw error;
          if (results) return res.send("¡Usuario creado satisfactoriamente!");
        });
      }

      if(req.body.cargo == 3) {
        query_bo = 'INSERT INTO `mydb`.`bodeguero de obra` (usuario_id) VALUES (';
        query_bo+=  results.insertId + ')';
        connection.query(query_bo, function (error, results, fields) {
          if (error) throw error;
          if (results) return res.send("¡Usuario creado satisfactoriamente!");
        });
      }

      if(req.body.cargo == 4) {
        query_ec = 'INSERT INTO `mydb`.`encargado de compra` (usuario_id) VALUES (';
        query_ec += results.insertId + ')';
        connection.query(query_ec, function (error, results, fields) {
          if (error) throw error;
          if (results) return res.send("¡Usuario creado satisfactoriamente!");
        });
      }
    }
  });
});

router.post('/solicitud_material', function(req, res) {
  query = "INSERT INTO `mydb`.`solicitud de material` (`bodeguero de obra_id`, `bodeguero central_id`, Fecha) VALUES (";
  query += req.body.id_bo  + ', ';
  query += req.body.id_bc  + ', ';
  query += '"' + req.body.fecha + '")';
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    query2 = "INSERT INTO `mydb`.`material_solicitud` (`solicitud de material_id`, `Nombre`, `Cantidad`,`Descripcion`) VALUES (";
    query2 += results.insertId + ', ';
    query2 += '"' + req.body.nombre + '", ';
    query2 +=  req.body.cantidad + ', ';
    query2 += '"' + req.body.descripcion + '")';
    console.log(query2);
    connection.query(query2, function (error, results, fields) {
      if (error) throw error;
      if (results) return res.send("¡Material solicitado correctamente!");
    });
  });
});

router.post('/solicitud_compra', function(req, res) {
  query = "INSERT INTO `mydb`.`solicitud de compra` (`bodeguero central_id`, `encargado de compra_id`, Fecha) VALUES (";
  query += req.body.id_bc  + ', ';
  query += req.body.id_ec  + ', ';
  query += '"' + req.body.fecha + '")';
  console.log(query)
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    query2 = "INSERT INTO `mydb`.`material_compra` (`solicitud de compra_id`, `Nombre`, `Cantidad`, `Descripcion`) VALUES (";
    query2 += results.insertId + ', ';
    query2 += '"' + req.body.nombre + '", ';
    query2 += req.body.cantidad + ', ';
    query2 += '"' + req.body.descripcion + '")';
    console.log(query2)
    connection.query(query2, function (error, results, fields) {
      if (error) throw error;
      if (results) return res.send("¡Material solicitado correctamente!");
    });
  });
});

router.post('/asignar_material', function(req, res) {
  query = "INSERT into `mydb`.`bodega` (`obra_id`,`material_id`,`cantidad`) VALUES (";
  query += req.body.obra_id  + ', ';
  query += req.body.material_id  + ', ';
  query += req.body.cantidad_asignada  + ')';
  console.log(query);
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    if (results) {
      query2 = "UPDATE `mydb`.`material` set Cantidad = " + req.body.update_material + " where id_material = " + req.body.material_id;
      console.log(query2);
      connection.query(query2, function (error, results, fields) {
        if (error) throw error;
        if (results){
          query3 = "UPDATE `mydb`.`material_solicitud` set Cantidad = " + req.body.update_solicitud + " where `solicitud de material_id` = " + req.body.id_solicitud_material;
          console.log(query3);
          connection.query(query3, function (error, results, fields) {
            if (error) throw error;
            if (results) return res.send("¡Material asignado correctamente!");
          });
        }
      });
    }
  });
});
module.exports = router;
