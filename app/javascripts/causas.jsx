var Causas = React.createClass({
	getInitialState: function() {
		return {numCausas: 0};
	},


  	render: function() {
    	var header = (
        	<span>Causas
          		<span className="pull-right">
            	<Glyphicon glyph='info-sign' onClick={this.openSettingsModal} /> 
          	</span>
        	</span>
    	);
    	return (
      		<Panel header={ header }>
        		<p>Causas creadas: {this.state.numCausas}</p>
        

		    	<ButtonToolbar>
					<Button bsStyle='primary' onClick={this.openNewReputationContextModal}>Nueva Causa</Button>
				</ButtonToolbar>
			</Panel>

    );
   }	
});

window.Causas = Causas;