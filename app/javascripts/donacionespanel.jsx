var DonacionesPanel = React.createClass({
	getInitialState: function() {
		return {numDonaciones: 0, donaciones: []};
	},

	componentDidMount: function() {
		this.getDonacionesFromBlockchain()
	},

	

	getDonacionesFromBlockchain: function(){
		var causa = Causa.at(this.props.causaAddress);
		console.log("loading donaciones from causa at:" + this.props.causaAddress);
	    causa.numDonaciones.call()
	      .then (function(_numDonaciones){
	        var num=Number(_numDonaciones);
	        this.setState({numDonaciones: num});
	        console.log(num +" to go.");

	        this.setState({donaciones: []});
	        for(var i=0; i < num; i++){
	          this.getDonacion(i+1);
	        }
	      }.bind(this))
	      .catch(function(e) {
	        console.log(e);
	      })
	      .done();
	  },
	
	getDonacion: function(_id){
		var donacion = {
	      index: _id -1
	    };
    	
    	var c = Causa.at(this.props.causaAddress);
	    c.getDonacionMonto.call(_id)
	    .then ( function (_monto){
        	donacion.monto = Number(_monto);
        	//console.log("_monto");
        	//console.log(_monto);
        	return c.getDonacionTitular.call(_id);
    	})
		.then ( function (_titular){
        	//console.log("_titular");
        	//console.log(_titular);
        	donacion.titular = web3.toAscii(_titular);

	        var donaciones = this.state.donaciones;
    	    donaciones[_id-1] = donacion;
        	this.setState({ donaciones: donaciones });
    	}.bind(this))
    	.catch(function(e) {
        	console.log(e);
    	})
    	.done();
  	},

  	contextTypes: {
    	router: React.PropTypes.func
  	},
  	
    goToDonar: function(_address) {
        this.context.router.transitionTo('/donar/'+_address);
    },
    

  	render: function() {
  		var boton ;
  		if(!this.props.terminado){
  			boton = (
				<span className="pull-right">
            		<Button bsStyle='success' bsSize='xsmall' onClick={this.goToDonar.bind(this,this.props.causaAddress)}>
							Donar 
					</Button>
          		</span>
  			)
  		}
    	var header = (
        	<span>Donaciones recibidas
          		{boton}
        	</span>
    	);
			
		var rows = this.state.donaciones.map(function (donacion) {
			var donado = "$"+ (donacion.monto.formatMoney(0, ',', ' '));
			return (
	      		<tr key={donacion.index}>
		        	<td>{donacion.index}</td>
		        	<td>{donacion.titular}</td>
		        	<td  className="right">{ donado }</td>
		    	</tr>
	      );
	    }.bind(this));

    	return (
      		<Panel header={ header }>
        		<p>Donaciones recibidas: {this.state.numDonaciones}</p>
        		<Table striped bordered condensed hover>
				<thead>
					<tr>
					<th>#</th>
					<th>Donante</th>
					<th>Monto</th>
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

window.DonacionesPanel = DonacionesPanel;