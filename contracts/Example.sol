contract Example {
  function Example() {
    // constructor
    x=0;
  }

  event Incremented(bool indexed odd, uint x); 

  function inc() { 
       ++x; 
       Incremented(x % 2 == 1, x); 
   }

   function get() returns (uint){
	return x;
   }

   uint x;

}
