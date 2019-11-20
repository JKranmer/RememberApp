import React from 'react'
import Label from '../../Label';
import Input from '../../Input';
import Button from '../../Button';
import Header from '../../Header';

class FormCadastroUsuario extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usuario: {
				login: "",
				senha: ""
			},
			mensagens: []
		}
	}
	validateLogin(login) {
		return login.length !== 0 && login.length < 100;
	}
	validateSenha(senha) {
		return senha.length !== 0 && senha.length < 100;
	}
	validade(usuarioState) {
		let errors = []
		if (!this.validateLogin(usuarioState.login))
			errors.push("Login Inválido")
		if (!this.validateSenha(usuarioState.senha))
			errors.push("Senha Inválido")
		return errors;
	}
	resetUsuarioState(usuarioState) {
		usuarioState.nome = "";
		usuarioState.email = "";
		this.setState(
			{ usuaio: usuarioState }
		)
	}

	handlerInputChange = (e) => {
		let usuarioState = this.state.usuario;
		usuarioState[e.target.id] = e.target.value;
		this.setState({
			usuario: usuarioState
		});
		console.log(e.target.id + " atualizado");
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let usuarioState = this.state.usuario;
		let mensagens = this.validade(usuarioState);

		if (mensagens.length === 0) {
			mensagens.push("Sucesso")
			let storage = window.localStorage;
			let getStorage = JSON.parse(storage.getItem('usuario')) || [];
			getStorage.push(usuarioState);
			storage.setItem("usuario", JSON.stringify(getStorage));
			console.log("ADD usuario");

			this.resetUsuarioState(usuarioState)
		}
		this.setState(
			{ mensagens: mensagens }
		)
	}

	render() {
		let mensagens = this.state.mensagens;
		return (
			<div>

				<Header title="Cadastro de Usuário" />
				<form onSubmit={this.handleSubmit}>
					<Label text="Login:" />
					<Input id="login" type="text" placeholder="Digite o seu login..." onChange={this.handlerInputChange} value={this.state.usuario.login}/>
					<br />
					<Label text="Senha:" />
					<Input id="senha" type="password" placeholder="Digite sua senha..." onChange={this.handlerInputChange} value={this.state.usuario.senha} />
					<br />
					<Button text="Cadastrar" />
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

export default FormCadastroUsuario;
