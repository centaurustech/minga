var DonarCausaApp = React.createClass({
	save: function(){
	  	console.log("Donando a la causa");
	  	var p = this.state.selectedProducto;
	  	var donanteBanco = p.producto.institucion;
	    var donanteCuenta = p.producto.id;
	    var donanteTipo = p.producto.tipo;
	    var donanteRut = this.state.donanteRut;
	    var donanteTitular = this.state.titular
	    var donanteEmail = this.state.cliente.contacto.email;
	    var monto = this.refs.monto.getValue().trim();

      this.refs.bl.open();
	  	var causa = Causa.at(this.props.params.causaAddress);
	    causa.donar(monto,donanteBanco,donanteCuenta,donanteTipo,donanteRut,donanteTitular,donanteEmail)
	    .then (function(tx){
        console.log("Donacion realizada");
        return causa.revisa();
      }.bind(this))
      .then (function(tx){
        console.log("revisado");
        this.refs.bl.close();
        this.close();
      }.bind(this))
		  .catch(function(e) {
			 console.log("catch!");
			 console.log(e);
		  })
		.done();
	},

	contextTypes: {
    	router: React.PropTypes.func
  	},

    close: function() {
        this.context.router.transitionTo('/causa/'+this.props.params.causaAddress);
    },

    procesaBoton: function(){
    	console.log("procesa boton");
    	if(this.state.estado == 'inicio'){
        var donanteRut = this.refs.donanteRut.getValue().trim();
        this.setState({donanteRut: donanteRut});
      
        this.buscarDatosCliente();
  			this.buscarProductosPorRut();
  		}
  		if(this.state.estado == 'donar'){
  			this.save();
  			//console.log(this.state.selectedProducto);
  		}
    },

    buscarDatosCliente: function(){
      var donanteRut = this.refs.donanteRut.getValue().trim();
      console.log("buscarDatosCliente : "+donanteRut);
    	var uri="http://192.168.27.2:9001/BChHackatonAPI/webrest/cliente/datos?api_key="+this.state.apiId;
    	$.ajax({
  			url:uri,
  			type:"POST",
  			data:JSON.stringify({apiID: this.state.apiId, rut: donanteRut}),
  			contentType:"application/json; charset=utf-8",
  			dataType:"json",
  			success: function(result) {
  	      		console.log(result);
              var titular = result.body.nombre + " " + result.body.apellidoPaterno + " "+ result.body.apellidoMaterno;
      	  		this.setState({cliente: result.body, clienteStatus: result.header, titular: titular});
  		   	}.bind(this),
  		   	error: function(){
  		  		console.log("fallo");
  		  		this.setState({data: 'error'});
  		  	}.bind(this),
		  });
    },

    buscarProductosPorRut: function(){
      var donanteRut = this.refs.donanteRut.getValue().trim();
      console.log("buscarProductosPorRut : "+donanteRut);
      var uri="http://192.168.27.2:9001/BChHackatonAPI/webrest/cliente/productos?api_key="+this.state.apiId;
      $.ajax({
        url:uri,
        type:"POST",
        data:JSON.stringify({apiID: this.state.apiId, rut: donanteRut}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(result) {
              //console.log(result);
              this.setState({estado: 'productos', productos: result.body, productosStatus: result.header});
          }.bind(this),
          error: function(){
            console.log("fallo");
            this.setState({data: 'error'});
          }.bind(this),
      });
    },

    seleccionaProducto: function(p){
		this.setState({ estado: "donar", selectedProducto: p });
    },

    getInitialState: function(){
    	return { estado: 'inicio', apiId: '19_NKP'}
    },

  	render: function() {
  		var textoBoton;
  		var donar;
  		if(this.state.estado == 'inicio'){
  			textoBoton = "Buscar Datos";
  			donar = (
  				<div>
  					<Label>RUT Donante</Label>
        			<Input type="text" placeholder="RUT" ref='donanteRut' />
        		</div>
  			);
  		}
  		if(this.state.estado == 'productos'){
  			textoBoton = "";
  			donar = (
  				<div>
  					<Label>RUT Donante</Label>
        			<Input type="text" disabled="true" defaultValue={this.state.donanteRut} />
        			<SelectorProductos 
  						productos={this.state.productos} 
  						seleccionaProducto={this.seleccionaProducto}/>
        		</div>
  			);
  		}
  		if(this.state.estado == 'donar'){
  			textoBoton = "Donar";
  			var p = this.state.selectedProducto;
  			var descProducto = p.producto.tipo + " " + p.producto.id
  			donar = (
  				<div>
  					<Label>RUT Donante</Label>
        				<Input type="text" disabled="true" defaultValue={this.state.donanteRut} />
        			<Label>Producto </Label>
        				<Input type="text" disabled="true" defaultValue={descProducto} />
        			<Label>Monto </Label>
        				<Input type="text" placeholder="Monto" ref='monto' />
        		</div>
  			);
  		}

	  	var footer;
	  	if(textoBoton!="") {
		  	footer = (
		        <span><Button bsStyle='primary' onClick={this.procesaBoton}>{ textoBoton }</Button></span>
		    );
		}
    return (
		<Panel header="Donar a la Causa" footer={ footer }>
        	<form>
          	
        	{ donar }
          <Blockchaineando ref={'bl'}/>
          	</form>
		</Panel>
		
    );
  }
});

window.DonarCausaApp = DonarCausaApp;