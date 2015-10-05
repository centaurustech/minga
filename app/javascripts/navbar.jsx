//navigationBar
var NavBar = React.createClass({displayName: 'NavBar',

  changeAccount: function() {
    console.log(this.props.accounts);
  },

  render: function() {
    return (
     <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand page-scroll" href="#">
                   Minga 
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="donar">Donar</Link></li>
              <li><Link to="patrocinar">Patrocinar</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

window.NavBar = NavBar;
