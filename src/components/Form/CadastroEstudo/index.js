import React from 'react'
import Input from '../../Input';
import Button from '../../Button';
import Header from '../../Header';
import 'purecss';
import '../../../css/style.css';

class FormCadastroEstudo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			estudo: {
				nome: "",
				email: "",
				status: ""
			},
			mensagens: []
		}
	}
	validateNome(nome) {
		return nome.length !== 0 && nome.length < 100;
	}
	validateEmail(email) {
		let re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return re.test(email);
	}
	validateStatus(status) {
		return status.length !== 0 && status.length < 100;
	}
	validade(estudoState) {
		let errors = []
		if (!this.validateNome(estudoState.nome))
			errors.push("Nome Inválido")
		if (!this.validateEmail(estudoState.email))
			errors.push("Email Inválido")
		if (!this.validateStatus(estudoState.status))
			errors.push("Status Inválido")
		return errors;
	}
	resetEstudoState(estudoState) {
		estudoState.nome = "";
		estudoState.email = "";
		estudoState.status = "";
		this.setState(
			{ estudo: estudoState }
		)
	}

	handlerInputChange = (e) => {
		let estudoState = this.state.estudo;
		estudoState[e.target.id] = e.target.value;
		this.setState({
			estudo: estudoState
		});
		console.log(e.target.id + " atualizado");
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let estudoState = this.state.estudo;
		let mensagens = this.validade(estudoState);

		if (mensagens.length === 0) {
			mensagens.push("Sucesso")
			let storage = window.localStorage;
			let getStorage = JSON.parse(storage.getItem('estudo')) || [];
			getStorage.push(estudoState);
			storage.setItem("estudo", JSON.stringify(getStorage));
			console.log("ADD estudo");

			this.resetEstudoState(estudoState)
		}
		this.setState(
			{ mensagens: mensagens }
		)
	}

	render() {
		let mensagens = this.state.mensagens;
		return (
			<div className="card gp-ma-md">

				<Header class="gp-text-center" title="Cadastrar Grupo de Estudo" />
				<form className="pure-form card" onSubmit={this.handleSubmit}>
					<Input id="nome" type="text" placeholder="Nome" onChange={this.handlerInputChange} value={this.state.estudo.nome}/>
					<br />
					<Input id="email" type="text" placeholder="E-mail" onChange={this.handlerInputChange} value={this.state.estudo.email} />
					<br />
					<Input id="status" type="text" placeholder="Status" onChange={this.handlerInputChange} value={this.state.estudo.status} />
					<br />
					<Button class="pure-button gp-mt-sm gp-right" text="Cadastrar" />
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

export default FormCadastroEstudo;
