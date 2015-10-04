//Causa Factory and Registry

import "Causa";

contract CausaFactory {
	
	address[] causas;

	event NuevaCausa(address causaAddress);

	function create(bytes32 _nombre, uint _montoObjetivo, uint _plazo, bytes32 _url){
		address causaAddress = address(new Causa(_nombre,_montoObjetivo,_plazo,_url));	
		causas[causas.length++] = causaAddress;
		NuevaCausa(causaAddress);
	}

	function numCausas() returns (uint){
		return causas.length;
	}

	function getCausa(uint i) returns (address){
		return causas[i];
	}

}