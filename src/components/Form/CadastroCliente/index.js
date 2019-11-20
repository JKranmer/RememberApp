import React from 'react';
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
        email: "",
        senha: ""
      },
      mensagens:[]
    }
  }

  validateNome(nome) {
    return nome.length !== 0  && nome.length < 100;
  }
  validateSenha(senha) {
    return senha.length !== 0  && senha.length < 100;
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
    if(!this.validateSenha(clienteState.senha))
      errors.push("Senha Inválido")
    if(!this.validateEmail(clienteState.email))
      errors.push("Email Inválido")
    return errors;
  }
  resetClienteState(clienteState){
    clienteState.nome = "";
    clienteState.email = "";
    clienteState.senha = "";
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
    <div className="card gp-ma-md pure-g">

      <Header class="gp-text-center gp-text-w pure-u-5-5" title="Cadastro de Cliente" />
      <form className="pure-form card pure-u-5-5" onSubmit={this.handleSubmit}>
        <div className="gp-mt-sm">
        <Input id="nome" type="text" placeholder="Nome" onChange={this.handlerInputChange} value={this.state.cliente.nome} />
        </div>
        <br />
        <Input id="email" type="text" placeholder="E-mail" onChange={this.handlerInputChange} value={this.state.cliente.email}/>
        <br />
        <Input id="senha" type="password" placeholder="Senha" onChange={this.handlerInputChange} value={this.state.cliente.senha} />
        <br />
        <Button class="pure-button gp-mt-sm gp-right gp-text-w" text="Gravar" />
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
