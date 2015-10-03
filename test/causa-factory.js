contract('CausaFactory', function(accounts) {

  it("should create new Causa with all the parameters", function(done) {
  	var causaFactoryContract = CausaFactory.at(CausaFactory.deployed_address);
    causaFactoryContract.create("nombre Test",100000,10,"http://ipfs/")
    .then (function(_tx){
	   	  return causaFactoryContract.numCausas.call();
    })
	  .then (function(_numCausas){
		    var iNum=Number(_numCausas);
    	  //console.log("iNum");
        //console.log(iNum);
        assert.equal(1,iNum,"numCausas do not match");
	   	  return causaFactoryContract.getCausa.call(0);
    })
    .then (function(_causaAddress){
      //console.log("_causaAddress");
      //console.log(_causaAddress);
      var causaContract=Causa.at(_causaAddress);
      //console.log("causaContract");
      //console.log(causaContract);
      return causaContract.nombre.call();
    })
    .then (function(_nombre){
      var aNombre=web3.toAscii(_nombre).replace(/^\0+/, '').replace(/\0+$/, '');
      //console.log("aNombre");
      //console.log(aNombre);
      assert.equal("nombre Test",aNombre,"nombre do not match");
      done();
    })
    .catch(function(e) {
      	//console.log("catch!");
        //console.log(e);
        done(e);
    });
  });

  
});
