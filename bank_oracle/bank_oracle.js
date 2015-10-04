console.log("Bank Oracle Running");
var apiID="19_NKP";
var causaFactory = CausaFactory.at(CausaFactory.deployed_address);

console.log("loading causas from causaFactory:" + CausaFactory.deployed_address);
causaFactory.numCausas.call()
.then (function(_numCausas){
  var num=Number(_numCausas);
  console.log(num +" to go.");
    for(var i=0; i < num; i++){
      causaFactory.getCausa.call(i)
      .then ( function (_causaAddress){
          var causaAddress = _causaAddress;
          watchCausa(causaAddress);
          //monitorCausa(causaAddress);
      }.bind(this))
      .catch(function(e) {
          console.log(e);
      })
      .done();
    }
}.bind(this))
.catch(function(e) {
  console.log(e);
})
.done();


var nuevaCausaEvent = causaFactory.NuevaCausa();
nuevaCausaEvent.watch(function(error, result){
  //console.log("nuevaCausa event!");
  if (!error){
    //console.log(result);
    var causaAddress=result.args.causaAddress;
    console.log("nuevaCausa en:"+causaAddress);
    watchCausa(causaAddress);
  }else{
    console.log("Error en nuevaCausaEvent");
    console.log(error);
  }
});


function watchCausa(_causaAddress){
  console.log("watching causa in "+_causaAddress);
  var causa = Causa.at(_causaAddress);

  var transferirEvent = causa.Transferir();
  transferirEvent.watch(function(error, result){
    if (!error){
      console.log("transferirEvent!");
      //console.log(result);
      transferir(result.address,result.args.inDir, result.args.id);
    }else{
      console.log("Error en transferirEvent");
      console.log(error);
    }
  });
}

function monitorCausa(_causaAddress){
  console.log("monitoring causa in "+_causaAddress);
  var t = setInterval( function() { revisa(_causaAddress); }, 1000 );
}

function revisa(_causaAddress){  
  var causa = Causa.at(_causaAddress);
  causa.revisa()
  .then (function(_tx){
    console.log(".");
  })
  .catch(function(e) {
    console.log(e);
  })
  .done();    
}

function transferir(_causaAddress,_in,_id){
  //Buscamos datos en el factory;
  var c = Causa.at(_causaAddress);
  if(_in){ //Hacia el fondo comun
    transferIn(c, _id);
  }else{ //Desde el fondo comun
    transferOut(c,_id);
  }
}

function transferIn(c,_id){
  var t = {
    "apiID": apiID,
    "monto": 0,
    "rut": "rut donante",
    "idProductoOrigen": "cuenta donante",
    "datosDestinatario": {
      "rut": "129007907",
      "nombre": "Slaven Mihaljevic",
      "alias": "Slaven Mihaljevic",
      "mail": "slav.mihal@mail.cl",
      "producto": {
        "id": "19933387518753",
        "tipo": "CV",
        "institucion": "Banco de Chile/Edwards"
      }
    },
    "mensaje": "Donacion"
  };

  c.getDonacionMonto.call(_id)
  .then (function(_monto){
    var monto=Number(_monto);
    t.monto=monto;
    return c.getDonacionRut.call(_id);
  })
  .then (function(_rut){
    var rut=Number(_rut);
    t.rut=rut;
    return c.getDonacionCuenta.call(_id)
  })
  .then (function(_cuenta){
    var cuenta=Number(_cuenta);
    t.idProductoOrigen=cuenta;
    return c.nombre.call();
  })
  .then (function(_nombre){
    var nombre=web3.toAscii(_nombre).replace(/^\0+/, '').replace(/\0+$/, '');
    t.mensaje="Donacion a '"+nombre+"'";
    console.log(t);
    doTransfer(t);
  })
  .catch(function(e) {
    console.log(e);
  })
  .done();  
}

function transferOut(c,_id){
  var t = {
    "apiID": apiID,
    "monto": 0,
    "rut": "129007907",
    "idProductoOrigen": "19933387518753",
    "datosDestinatario": {
      "rut": "rut-benef",
      "nombre": "nom-benef",
      "alias": "nom-benef",
      "mail": "main-benef",
      "producto": {
        "id": "cuenta-benef",
        "tipo": "tipo-benef",
        "institucion": "banco-benef"
      }
    },
    "mensaje": "Entrega de Donacion"
  };

  c.getDonacionMonto.call(0)
  .then (function(_monto){
    var monto=Number(_monto);
    t.monto=monto;
    return c.getDonacionRut.call(0);
  })
  .then (function(_rut){
    var rut=Number(_rut);
    t.datosDestinatario.rut=rut;
    return c.getDonacionTitular.call(0);
  })
  .then (function(_titular){
    var titular=web3.toAscii(_titular).replace(/^\0+/, '').replace(/\0+$/, '');
    t.datosDestinatario.nombre=titular;
    t.datosDestinatario.alias=titular;
    return c.getDonacionEmail.call(0);
  })
  .then (function(_email){
    var email=web3.toAscii(_email).replace(/^\0+/, '').replace(/\0+$/, '');
    t.datosDestinatario.mail=email;
    return c.getDonacionCuenta.call(0)
  })
  .then (function(_cuenta){
    var cuenta=Number(_cuenta);
    t.datosDestinatario.producto.id=cuenta;
    return c.getDonacionTipo.call(0)
  })
  .then (function(_tipo){
    var tipo=web3.toAscii(_tipo).replace(/^\0+/, '').replace(/\0+$/, '');
    t.datosDestinatario.producto.tipo=tipo; 
    return c.getDonacionBanco.call(0)
  })
  .then (function(_banco){
    var banco=web3.toAscii(_banco).replace(/^\0+/, '').replace(/\0+$/, '');
    t.datosDestinatario.producto.institucion=banco; 
    return c.nombre.call();
  })
  .then (function(_nombre){
    var nombre=web3.toAscii(_nombre).replace(/^\0+/, '').replace(/\0+$/, '');
    t.mensaje="Entrega de recaudacion de donacion '"+nombre+"'";
    console.log(t);
    doTransfer(t);
  })
  .catch(function(e) {
    console.log(e);
  })
  .done();  
}

var Client = require('node-rest-client').Client;

function doTransfer(_t){
  var url="http://192.168.27.2:9001/BChHackatonAPI/webrest/operaciones/tef?api_key="+apiID;
  var client = new Client();
  var args = {
    data: _t,
    headers:{"Content-Type": "application/json"} 
  };
 
  client.post(url, args, function(data,response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    //console.log(response);
  });
 
}


