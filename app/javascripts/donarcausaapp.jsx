var DonarCausaApp = React.createClass({
	save: function(){
	  	console.log("Donando a la causa");
	  	var donanteBanco = this.refs.donanteBanco.getValue().trim();
	    var donanteCuenta = this.refs.donanteCuenta.getValue().trim();
	    var donanteRut = this.refs.donanteRut.getValue().trim();
	    var donanteTitular = this.refs.donanteTitular.getValue().trim();
	    var monto = this.refs.monto.getValue().trim();

	  	var causa = Causa.at(this.props.params.causaAddress);
	    causa.donar(monto,donanteBanco,donanteCuenta,donanteRut,donanteTitular)
	    .then (function(tx){
			console.log("Donacion realizada");
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
        this.context.router.transitionTo('/donar');
    },

  	render: function() {
	  	var footer = (
	        <span><Button bsStyle='primary' onClick={this.save}>Crear Causa</Button></span>
	    );
    return (
		<Panel header="Donar a la Causa" footer={ footer }>
        	<form>
          	<Label>Banco Donante</Label>
        		<Input type="text" placeholder="Banco" ref='donanteBanco' />
          	<Label>Cuenta Donante</Label>
        		<Input type="text" placeholder="Cuenta" ref='donanteCuenta' />
          	<Label>RUT Donante</Label>
        		<Input type="text" placeholder="RUT" ref='donanteRut' />
          	<Label>Titular Donante</Label>
        		<Input type="text" placeholder="Titular" ref='donanteTitular' />
        	<Label>Monto Donante</Label>
        		<Input type="text" placeholder="Monto" ref='monto' />
	        </form>
		</Panel>
		
    );
  }
});

window.DonarCausaApp = DonarCausaApp;