contract Causa {
	
	bytes32 public nombre;
	CuentaBanco public beneficiado;
	address public patrocinador;
	uint public montoObjetivo;
	uint public plazo;
	bytes32 public url;

	struct CuentaBanco {
		bytes32 banco;
		uint cuenta;
		bytes32 tipo;
		uint rut;
		bytes32 titular;
		bytes32 email;
	}

	struct Donacion {
		uint monto;
		CuentaBanco donante;
	}

	Donacion[] donaciones;
	bool public terminado;

	uint public montoRecaudado;
	uint public deadline;
	
	// Acctiones patrocinador;
	/* constructor */
	function Causa(bytes32 _nombre, uint _montoObjetivo, uint _plazo, bytes32 _url){
		nombre=_nombre;
		montoObjetivo = _montoObjetivo;
		plazo = _plazo;
		deadline = now + _plazo * 1 minutes;
		url = _url;
		patrocinador = tx.origin;
		terminado = true;
	}


	function updateBeneficiario(bytes32 _banco, uint _cuenta, bytes32 _tipo, uint _rut, bytes32 _titular, bytes32 _email){
		if(tx.origin == patrocinador){
			beneficiado = CuentaBanco({banco: _banco, cuenta: _cuenta, tipo: _tipo, rut: _rut, titular: _titular, email: _email});
			terminado = false;
		}
	}

	//Donaciones
	event Transferir(bool inDir, uint id);
	modifier activo { if (!terminado) _ }	
	

	function donar(uint _monto, bytes32 _banco, uint _cuenta, bytes32 _tipo, uint _rut, bytes32 _titular, bytes32 _email) activo {
		montoRecaudado += _monto;
		uint i=donaciones.length++;
		donaciones[i]=Donacion({donante: CuentaBanco({banco: _banco, cuenta: _cuenta, tipo: _tipo, rut: _rut, titular: _titular, email: _email}), monto: _monto});
		Transferir(true, i+1);

	}

	function numDonaciones() returns (uint){
		return donaciones.length;
	}

	function getDonacionMonto(uint id) returns (uint){
		if(id==0) return montoRecaudado;
		return donaciones[id-1].monto;
	}

	function hasBeneficiado() returns (bool){
		return (beneficiado.rut != 0);
	}

	function getDonacionBanco(uint id) returns (bytes32){
		if(id==0) return beneficiado.banco;
		return donaciones[id-1].donante.banco;
	}
	function getDonacionCuenta(uint id) returns (uint){
		if(id==0) return beneficiado.cuenta;
		return donaciones[id-1].donante.cuenta;
	}
	function getDonacionTipo(uint id) returns (bytes32){
		if(id==0) return beneficiado.tipo;
		return donaciones[id-1].donante.tipo;
	}
	function getDonacionRut(uint id) returns (uint){
		if(id==0) return beneficiado.rut;
		return donaciones[id-1].donante.rut;
	}
	function getDonacionTitular(uint id) returns (bytes32){
		if(id==0) return beneficiado.titular;
		return donaciones[id-1].donante.titular;
	}
	function getDonacionEmail(uint id) returns (bytes32){
		if(id==0) return beneficiado.email;
		return donaciones[id-1].donante.email;
	}

	//Final del crowdfunding
	function getNow() returns (uint){
		return now;
	}
	

	function revisa() {
		if(montoRecaudado >= montoObjetivo){
			terminado = true;
			Transferir(false,0);
		}else{
			if ( now >= deadline ){
				for (uint i = 0; i < donaciones.length; ++i) {
					Transferir(false,i+1);
            	}   
			}
		}
	}
}