// This makes ReactRouter more consumable.
window.DefaultRoute = ReactRouter.DefaultRoute;
window.Link = ReactRouter.Link;
window.Route = ReactRouter.Route;
window.Router = ReactRouter.Router;
window.RouteHandler = ReactRouter.RouteHandler;


//Bootstap-react
window.Glyphicon = ReactBootstrap.Glyphicon;
window.Panel = ReactBootstrap.Panel;
window.ButtonToolbar = ReactBootstrap.ButtonToolbar;
window.Button = ReactBootstrap.Button;
window.Label = ReactBootstrap.Label;
window.Input = ReactBootstrap.Input;
window.Table = ReactBootstrap.Table;

//FOrmat money
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid"> 
        <RouteHandler/>
        </div>
      </div>
    );
  }
});


window.onload = function() {
  web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
  // TODO: How much of this is actually needed?
  web3.eth.getCoinbase(function(error, coinbase) {
    if (error != null) {
      alert("Couldn't get coinbase! Is your client running?");
      return;
    };

    Pudding.defaults({
      from: coinbase,
      gas: 3141592
    });

    // Routes are specified here.
    var routes = (
      <Route handler={Main} path="/">
        <DefaultRoute name="front-page" handler={FrontPage} />
        <Route name="donar" path="/donar" handler={DonarApp} />
        <Route name="donarCausa" path="/donar/:causaAddress" handler={DonarCausaApp} />
        <Route name="patrocinar" path="/patrocinar" handler={PatrocinarApp} />
        <Route name="beneficiario" path="/beneficiario/:causaAddress" handler={BeneficiarioApp} />

      </Route>
    );

    ReactRouter.run(routes, ReactRouter.HashLocation, function(Handler) {
      window.MainRouter = Handler;
      React.render(<Handler/>, document.body);
    });
  });
};