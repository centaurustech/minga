var CausaPanel = React.createClass({
	render: function() {
		var header = (
			<span>Datos de la causa</span>
		);
		var causa = this.props.causa;
		var p = (causa.montoRecaudado / causa.montoObjetivo ) * 100; 
		var porcentaje = Math.round(p).toString() + "%";
		var meta = "$"+ (causa.montoObjetivo.formatMoney(0, ',', ' '));
		var recaudado = "$"+ (causa.montoRecaudado.formatMoney(0, ',', ' ')); 
		var deadline =  (new Date(causa.deadline*1000)).toString();
		//var deadline = causa.deadline;
		return (
			<Panel header={ header }>
				<Table striped bordered condensed hover>
	     		<tbody>
					<tr>
			        	<td>Nombre</td>
			        	<td>{causa.nombre}</td>
			    	</tr>
			    	<tr>
			        	<td>Monto a recaudar</td>
			        	<td>{meta}</td>
			    	</tr>
			    	<tr>
			        	<td>Monto recaudado</td>
			        	<td>{recaudado}</td>
			    	</tr>
			    	<tr>
			        	<td>Porcentaje recaudado</td>
			        	<td>{porcentaje}</td>
			    	</tr>
			    	<tr>
			        	<td>Fecha de Cierre</td>
			        	<td>{deadline}</td>
			    	</tr>
			    	<tr>
			        	<td>URL</td>
			        	<td>{causa.url}</td>
			    	</tr>
				</tbody>
			</Table>
			</Panel>		
		);
	}
});

window.CausaPanel = CausaPanel;