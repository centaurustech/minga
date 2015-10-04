var SelectorProductos = React.createClass({
	seleccionaProducto: function(p){
    	this.props.seleccionaProducto(p);
    },

  	render: function() {
  		var rows = this.props.productos.map(function (p) {
			//console.log(p);
			var montoDisponible = "$"+ (p.montoDisponible.formatMoney(0, ',', ' '));
			var tipo;
			switch (p.producto.tipo) {
			    case 'CC':
			        tipo = "Cuenta Corriente";
			        break;
			    case 'CV':
			        tipo = "Cuenta Vista";
			        break;
			    case 'LC':
			        tipo = "Linea Credito";
			        break;
			    case 'TC':
			        tipo = "Tarjeta Credito";
			        break;
			    default:
			        tipo = "tipo desconocido("+p.producto.tipo+")";
			} 

			return (
	      		<tr key={p.producto.id}>
		        	<td>{tipo}</td>
		        	<td>{p.producto.id}</td>
		        	<td className="right">{montoDisponible}</td>
		        	<td>
		        		<ButtonToolbar>
							<Button bsStyle='info' bsSize='xsmall'  onClick={this.seleccionaProducto.bind(this,p)}>
								Usar este 
							</Button>
		  					</ButtonToolbar>
						</td>
		    	</tr>
	      	);
	    }.bind(this));

	    return (
	     <div>
	     	<Label>Seleccionar Producto con el cual desea donar</Label>
	     	<Table striped bordered condensed hover>
	     		<thead>
					<tr>
					<th>Tipo</th>
					<th>Numero</th>
					<th>Monto Disponible</th>
					<th></th>
					</tr>
				</thead>
				<tbody>
				{rows}
				</tbody>
			</Table>
	     </div>
	    );
  	}
});

window.SelectorProductos = SelectorProductos;