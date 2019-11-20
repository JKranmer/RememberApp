import React from 'react';
import Label from '../../Label';
import Input from '../../Input';
import Button from '../../Button';
import Header from '../../Header';
import 'purecss';
import '../../../css/style.css';

class FormCadastroCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: {
        nome: "",
        email: ""
      },
      mensagens:[]
    }
  }

  validateNome(nome) {
    return nome.length !== 0  && nome.length < 100;
  }
  validateEmail(email) {
    // regular expression
    let re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return re.test(email);
  }
  validade(clienteState){
    let errors = []
    if(!this.validateNome(clienteState.nome))
      errors.push("Nome Inválido")
    if(!this.validateEmail(clienteState.email))
      errors.push("Email Inválido")
    return errors;
  }
  resetClienteState(clienteState){
    clienteState.nome = "";
    clienteState.email = "";
    this.setState(
      {cliente:clienteState}
    )
  }


handlerInputChange = (e) => {
  let clienteState = this.state.cliente;
  clienteState[e.target.id] = e.target.value;
  this.setState({
    cliente: clienteState
  });
  console.log(e.target.id + " atualizado");
}
handleSubmit = (event) => {
  event.preventDefault();

  let clienteState = this.state.cliente;
  let mensagens = this.validade(clienteState);


  if (mensagens.length === 0) {
    mensagens.push("Sucesso")
    let storage = window.localStorage;
    let getStorage = JSON.parse(storage.getItem('cliente')) || [];
    getStorage.push(clienteState);
    storage.setItem("cliente", JSON.stringify(getStorage));
    console.log("ADD cliente");

    this.resetClienteState(clienteState)
  }
  this.setState(
    {mensagens:mensagens}
  )
}

render(){
  let mensagens = this.state.mensagens;
  return (
    <div className="card gp-ma-md">

      <Header class="gp-text-center" title="Cadastro de Cliente" />
      <form className="pure-form card" onSubmit={this.handleSubmit}>
        <div className="gp-mt-sm">
        <Label text="Nome: " class="gp-mr-sm"/>
        <Input id="nome" type="text" placeholder="..." onChange={this.handlerInputChange} value={this.state.cliente.nome} />
        </div>
        <br />
        <Label text="E-mail: " />
        <Input id="email" type="text" placeholder="..." onChange={this.handlerInputChange} value={this.state.cliente.email}/>
        <br />
        <Button class="pure-button gp-mt-sm gp-right" text="Gravar" />
        <br/>
      </form>
      {
        mensagens.map((mensagem,index) => (
          <p key={index}>{mensagem}</p>
        ))
      }
    </div>
  );
}
}

export default FormCadastroCliente;
