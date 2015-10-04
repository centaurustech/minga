//blockchaineando
var Blockchaineando = React.createClass({displayName: 'Blockchaineando',

  getInitialState(){
    return { showModal: false };
  },

  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  },

  render: function() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header>
        <Modal.Title>Asegurando datos</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert bsStyle="warning">
        <h3>Asegurando los datos criptograficamente </h3>
        <span>Los datos estan siendo asegurados en el <strong>Blockchain Ethereum</strong>. 
        Esta tecnología permite que los datos que acabas de ingresar no puedan ser modificados
        por nadie, realmente nadie.</span>
        </Alert>         
      </Modal.Body>

      <Modal.Footer>
        Nakamoto Corp.
      </Modal.Footer>

    </Modal>
    );
  }
});



