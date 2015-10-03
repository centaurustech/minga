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


var Main = React.createClass({
  render: function() {
    return (
      <div className="dapp-store">
        <NavBar />
        <div className="container">

        </div>
        <RouteHandler/>
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
        <Route name="patrocinar" path="/patrocinar" handler={PatrocinarApp} />
      </Route>
    );

    ReactRouter.run(routes, ReactRouter.HashLocation, function(Handler) {
      window.MainRouter = Handler;
      React.render(<Handler/>, document.body);
    });
  });
};