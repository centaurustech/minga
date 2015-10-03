contract Causa {
	
	bytes32 public nombre;
	CuentaBanco public beneficiado;
	address public patrocinador;
	uint public montoObjetivo;
	uint public plazo;
	bytes32 public url;

	struct CuentaBanco {
		uint banco;
		uint cuenta;
		uint rut;
		bytes32 titular;
	}

	struct Donacion {
		uint monto;
		CuentaBanco donante;
	}

	Donacion[] donaciones;
	bool public terminado;



	uint public montoRecaudado;
	
	// Acctiones patrocinador;
	/* constructor */
	function Causa(bytes32 _nombre, uint _montoObjetivo, uint _plazo, bytes32 _url){
		nombre=_nombre;
		montoObjetivo = _montoObjetivo;
		plazo = _plazo;
		url = _url;
		patrocinador = msg.sender;
		terminado = true;
	}


	function updateBeneficiario(uint _banco, uint _cuenta, uint _rut, bytes32 _titular){
		if(msg.sender == patrocinador){
			beneficiado = CuentaBanco({banco: _banco, cuenta: _cuenta, rut: _rut, titular: _titular});
			terminado = false;
		}
	}

	//Donaciones
	event Transferir(bool _cargo, uint _idNext, uint monto);
	modifier activo { if (!terminado) _ }	
	

	function donar(uint _monto, uint _banco, uint _cuenta, uint _rut, bytes32 _titular) activo {
		montoRecaudado += _monto;
		uint i=donaciones.length++;
		donaciones[i]=Donacion({donante: CuentaBanco({banco: _banco, cuenta: _cuenta, rut: _rut, titular: _titular}), monto: _monto});
		Transferir(true,i+1,_monto);

	}

	function numDonaciones() returns (uint){
		return donaciones.length;
	}

	function getDonacionMonto(uint id) returns (uint){
		if(id==0) return montoRecaudado;
		return donaciones[id-1].monto;
	}
	function getDonacionBanco(uint id) returns (uint){
		if(id==0) return beneficiado.banco;
		return donaciones[id-1].donante.banco;
	}
	function getDonacionCuenta(uint id) returns (uint){
		if(id==0) return beneficiado.cuenta;
		return donaciones[id-1].donante.cuenta;
	}
	function getDonacionRut(uint id) returns (uint){
		if(id==0) return beneficiado.rut;
		return donaciones[id-1].donante.rut;
	}
	function getDonacionTitular(uint id) returns (bytes32){
		if(id==0) return beneficiado.titular;
		return donaciones[id-1].donante.titular;
	}

	//Final del crowdfunding
	modifier seCumplioElPlazo() { if (now >= plazo) _ }

	function revisa() seCumplioElPlazo {
		terminado = true;
		if(montoRecaudado >= montoObjetivo){
			// Se junto el monto 
			Transferir(false,0,montoRecaudado);
		}else{
			// No se junto el monto
			for (uint i = 0; i < donaciones.length; ++i) {
				Transferir(false,i+1, donaciones[i].monto);
            }   
		}
	}
}