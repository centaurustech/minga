var Causas = React.createClass({
	getInitialState: function() {
		return {numCausas: 0, causas: []};
	},

	componentDidMount: function() {
		this.getCausasFromBlockchain()
	},

	getCausasFromBlockchain: function(){
		var causaFactory = CausaFactory.at(CausaFactory.deployed_address);
		console.log("loading contexts from causaFactory:" + CausaFactory.deployed_address);
	    causaFactory.numCausas.call()
	      .then (function(_numCausas){
	        var num=Number(_numCausas);
	        this.setState({numCausas: num});
	        console.log(num +" to go.");

	        this.setState({causas: []});
	        for(var i=0; i < num; i++){
	          this.getCausa(i);
	        }
	      }.bind(this))
	      .catch(function(e) {
	        console.log(e);
	      })
	      .done();
	  },
	
	getCausa: function(_index){
    	var causaFactory = CausaFactory.at(CausaFactory.deployed_address);
		var causa = {
	      index: _index
	    };
    	
    	var c;
	    //console.log(causaFactory);
		causaFactory.getCausa.call(_index)
	    .then ( function (_causaAddress){
        	causa.address = _causaAddress;
        	c = Causa.at(causa.address)
        	//console.log("c");
        	//console.log(c);
        	return c.nombre.call();
    	})
		.then ( function (_causaNombre){
        	//console.log(_causaNombre);
        	causa.nombre = web3.toAscii(_causaNombre);
        	return c.montoObjetivo.call();
    	})
    	.then ( function (_montoObjetivo){
        	//console.log(_montoObjetivo);
        	causa.montoObjetivo = Number(_montoObjetivo);

        	return c.montoRecaudado.call();
    	})
    	.then ( function (_montoRecaudado){
        	//console.log(_montoRecaudado);
        	causa.montoRecaudado = Number(_montoRecaudado);

	        var causas = this.state.causas;
    	    causas[_index] = causa;
        	this.setState({ causas: causas });
    	}.bind(this))
    	.catch(function(e) {
        	console.log(e);
    	})
    	.done();
  	},

  	render: function() {
    	var header = (
        	<span>Causas
          		<span className="pull-right">
            		<Glyphicon glyph='info-sign' onClick={this.openSettingsModal} /> 
          		</span>
        	</span>
    	);
		
		var rows = this.state.causas.map(function (causa) {
			var p = (causa.montoRecaudado / causa.montoObjetivo ) * 100; 
			var porcentaje = p.toString() + "% de $"+causa.montoObjetivo;
			return (
	      		<tr key={causa.index}>
		        	<td>{causa.index}</td>
		        	<td>{causa.nombre}</td>
		        	<td>{ porcentaje }</td>
		        	<td>
		        		<ButtonToolbar>
		        			<Link to={"/causa/" + causa.address}>
				        		<Button bsStyle='success' bsSize='xsmall'>
			  	  					<Glyphicon glyph='arrow-right' /> Ir 
		  	  					</Button>
	  	  					</Link>
  	  					</ButtonToolbar>
  					</td>
		    	</tr>
	      );
	    }.bind(this));

    	return (
      		<Panel header={ header }>
        		<p>Causas creadas: {this.state.numCausas}</p>
        		<Table striped bordered condensed hover>
				<thead>
					<tr>
					<th>#</th>
					<th>Nombre</th>
					<th>%</th>
					<th></th>
					</tr>
				</thead>
			    <tbody>
			      {rows}
			    </tbody>
			  </Table>
				</Panel>

    );
   }	
});

window.Causas = Causas;