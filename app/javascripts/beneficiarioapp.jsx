var BeneficiarioApp = React.createClass({
  save: function(){
	  	console.log("Actualizando datos del Beneficiario");
	  	var beneficiarioBanco = this.refs.beneficiarioBanco.getValue().trim();
	    var beneficiarioCuenta = this.refs.beneficiarioCuenta.getValue().trim();
	    var beneficiarioRut = this.refs.beneficiarioRut.getValue().trim();
	    var beneficiarioTitular = this.refs.beneficiarioTitular.getValue().trim();

	  	var causa = Causa.at(this.props.params.causaAddress);
	    causa.updateBeneficiario(beneficiarioBanco,beneficiarioCuenta,beneficiarioRut,beneficiarioTitular)
	    .then (function(tx){
			console.log("Beneficiario Actualizado");
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
	        <span><Button bsStyle='primary' onClick={this.save}>Actualizar datos</Button></span>
	    );
    return (
		<Panel header="Beneficiario de la Causa" footer={ footer }>
        	<form>
          	<Label>Banco</Label>
        		<Input type="text" placeholder="Banco" ref='beneficiarioBanco' />
          	<Label>Cuenta</Label>
        		<Input type="text" placeholder="Cuenta" ref='beneficiarioCuenta' />
          	<Label>RUT</Label>
        		<Input type="text" placeholder="RUT" ref='beneficiarioRut' />
          	<Label>Titular</Label>
        		<Input type="text" placeholder="Titular" ref='beneficiarioTitular' />
	        </form>
		</Panel>
		
    );
  }
});

window.BeneficiarioApp = BeneficiarioApp;