var CausaApp = React.createClass({
	getCausa: function(_addr){
		var causa = {
			address: _addr
		};
		
		var c = Causa.at(_addr);
		c.nombre.call()
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
        	return c.terminado.call();
        })
        .then ( function (_terminado){
        	//console.log("_terminado");
        	//console.log(_terminado);
        	causa.terminado = _terminado;
        	return c.url.call();
        })
        .then ( function (_url){
        	//console.log(_terminado);
        	causa.url =web3.toAscii(_url);
        	return c.hasBeneficiado.call();
        })
        .then ( function (_hasBeneficiado){
			//console.log(_hasBeneficiado);
        	causa.hasBeneficiado = _hasBeneficiado;
        	return c.deadline.call();
        })
        .then ( function (_deadline){
			//console.log(_deadline);
        	causa.deadline = _deadline;

	        this.setState({ causa: causa });
	        if(causa.hasBeneficiado){
	        	this.getBeneficiado(_addr); 
	        }
    	}.bind(this))
    	.catch(function(e) {
        	console.log(e);
    	})
    	.done();

    },

    getBeneficiado: function(_addr){
    	var beneficiado = {
			
		};
		
		var c = Causa.at(_addr);
		c.getDonacionBanco.call(0)
		.then ( function (_banco){
        	//console.log(_banco);
        	beneficiado.banco = web3.toAscii(_banco);
        	return c.getDonacionCuenta.call(0);
    	})
    	.then ( function (_cuenta){
        	//console.log(_cuenta);
        	beneficiado.cuenta = Number(_cuenta);
        	return c.getDonacionTipo.call(0);
    	})
    	.then ( function (_tipo){
        	//console.log(_tipo);
        	beneficiado.tipo = web3.toAscii(_tipo);
        	return c.getDonacionRut.call(0);
        })
        .then ( function (_rut){
        	//console.log(_rut);
        	beneficiado.rut = Number(_rut);
        	return c.getDonacionTitular.call(0);
        })
        .then ( function (_titular){
        	//console.log(_titular);
        	beneficiado.titular =web3.toAscii(_titular);
        	return c.getDonacionEmail.call(0);
        })
        .then ( function (_email){
			//console.log(_email);
        	beneficiado.email = web3.toAscii(_email);
        
        	causa= this.state.causa;
        	causa.beneficiado = beneficiado;
	        this.setState({ causa: causa});
    	}.bind(this))
    	.catch(function(e) {
        	console.log(e);
    	})
    	.done();
    },
	componentDidMount: function() {
	    this.getCausa(this.props.params.causaAddress)
	},
	getInitialState: function(){
		return {causa: { montoObjetivo: 0, montoRecaudado:0 } };
	},
	render: function() {
		return (
			<div>
			<ReactBootstrap.Row>
	            <ReactBootstrap.Col md={6}>
	         		<CausaPanel causa={this.state.causa}/>
	         	</ReactBootstrap.Col>
				<ReactBootstrap.Col md={6}>
	         		<BeneficiarioPanel causa={this.state.causa}/>
				</ReactBootstrap.Col>
			</ReactBootstrap.Row>
			<ReactBootstrap.Row>
	            <ReactBootstrap.Col md={12}>
	         		<DonacionesPanel causaAddress={this.props.params.causaAddress} terminado={this.state.causa.terminado}/>
	         	</ReactBootstrap.Col>
			</ReactBootstrap.Row>
			</div>
		);
	}
});

window.CausaApp = CausaApp;