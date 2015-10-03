contract Ayuda {
	
	struct Donacion {
		uint banco;
		uint cuenta;
		uint rut;
		bytes32 nombre;
		uint monto;
	}

	Donacion public beneficiario;
	uint public montoObjetivo;
	string public ipfsHash;
	uint public plazo;

	uint public montoRecaudado;
	Donacion[] public donaciones;

	bool terminado;

	event Transferir(bool alFondo, uint banco);

	/* constructor */
	function Ayuda(uint _bancoBeneficiario, uint _cuentaBeneficiario, uint _rutBeneficiario, bytes32 _nombreBeneficiario, uint _montoObjetivo ){
		beneficiario = Donacion({banco: _bancoBeneficiario, cuenta: _cuentaBeneficiario, rut: _rutBeneficiario, nombre: _nombreBeneficiario, monto: _montoObjetivo});
		montoObjetivo = _montoObjetivo;
		plazo = now + 10 days;
		terminado = false;
	}

	function setIpfsHash(string _ipfsHash){
		ipfsHash= _ipfsHash;
	}

	modifier activo { if (!terminado) _ }	

	function donar(uint _bancoDonante, uint _cuentaDonante, uint _rutDonante, bytes32 _nombreDonante, uint _montoDonado ) activo{
		montoRecaudado += _montoDonado;
		donaciones[donaciones.length++] = Donacion({banco: _bancoDonante, cuenta: _cuentaDonante, rut: _rutDonante, nombre: _nombreDonante, monto: _montoDonado});
		Transferir(true,_bancoDonante);
	}

	modifier seCumplioElPlazo() { if (now >= plazo) _ }

	function revisaMontoAlcanzado() seCumplioElPlazo {
		terminado = true;
		if(montoRecaudado >= montoObjetivo){
			/* Se junto el monto */
			beneficiario.monto = montoRecaudado;
			Transferir(false,beneficiario.banco);
		}else{
			/* No se junto el monto */
			for (uint i = 0; i < donaciones.length; ++i) {
				Transferir(false,donaciones[i].banco);
            }   
		}
	}
}