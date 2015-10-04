var BeneficiarioPanel = React.createClass({
	contextTypes: {
    	router: React.PropTypes.func
  	},
  	
    goToDonar: function(_address) {
        this.context.router.transitionTo('/donar/'+_address);
    },
    goToConfigBeneficiario: function(_address) {
        this.context.router.transitionTo('/beneficiario/'+_address);
    },


	render: function() {
		var header = (
			<span>Datos del beneficiario</span>
		);
		var causa = this.props.causa;
		if (causa == undefined){
			causa = {};
		}
		var beneficiario = causa.beneficiado;
		if (beneficiario == undefined) {
			return (
				<Panel header={ header }>
					<Button bsStyle='warning' onClick={this.goToConfigBeneficiario.bind(this,causa.address)}>
						Configurar datos de Beneficiario 
					</Button>
				</Panel>	
			)
		}

		return (
			<Panel header={ header }>
				<Table striped bordered condensed hover>
	     		<tbody>
					<tr>
			        	<td>Banco</td>
			        	<td>{beneficiario.banco}</td>
			    	</tr>
			    	<tr>
			        	<td>Cuenta</td>
			        	<td>{beneficiario.cuenta}</td>
			    	</tr>
			    	<tr>
			        	<td>Tipo Cuenta</td>
			        	<td>{beneficiario.tipo}</td>
			    	</tr>
			    	<tr>
			        	<td>RUT</td>
			        	<td>{beneficiario.rut}</td>
			    	</tr>
			    	<tr>
			        	<td>Titular</td>
			        	<td>{beneficiario.titular}</td>
			    	</tr>
			    	<tr>
			        	<td>Email</td>
			        	<td>{beneficiario.email}</td>
			    	</tr>
				</tbody>
			</Table>
			</Panel>		
		);
	}
});


window.BeneficiarioPanel = BeneficiarioPanel;