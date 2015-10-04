var NuevaCausaPanel = React.createClass({
	save: function(){
	  	console.log("Creando nueva causa");
	  	var newCausaNombre = this.refs.newCausaNombre.getValue().trim();
	    var newCausaMonto = this.refs.newCausaMonto.getValue().trim();
	    var newCausaPlazo = this.refs.newCausaPlazo.getValue().trim();
	    var newCausaURL = this.refs.newCausaURL.getValue().trim();

	  	var causaFactory = CausaFactory.at(CausaFactory.deployed_address);
	    causaFactory.create(newCausaNombre,newCausaMonto,newCausaPlazo,newCausaURL)
	    .then (function(tx){
			console.log("Context Created");
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
		<Panel header="Nueva Causa" footer={ footer }>
        	<form>
          	<Label>Nombre de la Causa</Label>
        		<Input type="text" placeholder="Nombre de la Causa" ref='newCausaNombre' />
          	<Label>Monto a Levantar</Label>
        		<Input type="text" placeholder="Monto a levantar" ref='newCausaMonto' />
          	<Label>Duracion (minutos)</Label>
        		<Input type="text" placeholder="Duracion" ref='newCausaPlazo' />
          	<Label>URL</Label>
        		<Input type="text" placeholder="http://...." ref='newCausaURL' />
        </form>
		</Panel>
		
    );
  }
});

window.PatrocinarApp = PatrocinarApp;