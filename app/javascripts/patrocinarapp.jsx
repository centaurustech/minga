var PatrocinarApp = React.createClass({
  render: function() {
    return (
		<ReactBootstrap.Row>
			<ReactBootstrap.Col md={6}>
			<NuevaCausaPanel />
			</ReactBootstrap.Col>
		</ReactBootstrap.Row>
    );
  }
});

window.PatrocinarApp = PatrocinarApp;