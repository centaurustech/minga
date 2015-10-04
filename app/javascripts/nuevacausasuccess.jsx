//NuevaCausaSuccess
var NuevaCausaSuccess = React.createClass({displayName: 'NuevaCausaSuccess',

  getInitialState(){
    return { showModal: false };
  },

  close(){
    this.setState({ showModal: false });
    this.props.closeParent();
  },

  open(){
    this.setState({ showModal: true });
  },

  render: function() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header>
        <Modal.Title>Causa Creada</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert bsStyle="warning">
        <h3>Tu causa a sido creada</h3>
        <span>Comparte tu nueva causa con tus amigos <br/> Id de la causa: {this.props.causaAddress}</span>
        </Alert>         
      </Modal.Body>

      <Modal.Footer>
        <Button bsStyle='primary' onClick={this.close}>Continuar</Button>
      </Modal.Footer>

    </Modal>
    );
  }
});

