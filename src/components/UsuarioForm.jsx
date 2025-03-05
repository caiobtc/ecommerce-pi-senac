import React, { useState } from "react";
import axios from "axios";
import "../styles/UsuarioForm.css";

const UsuarioForm = () => {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [grupo, setGrupo] = useState("ADMINISTRADOR");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/usuarios", {
            nome,
            cpf,
            email,
            senha,
            grupo,
        })
        .then((response) => {
            alert("Usuário cadastrado com sucesso!");
            setNome("");
            setCpf("");
            setEmail("");
            setSenha("");
            setGrupo("ADMINISTRADOR");
        })
        .catch((error) => {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário")
        });
    };

    return (
        <div className="usuario-form">
            <h2>Cadastrar Usuário</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required/>
            </label>
            <label>
                CPF:
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required/>
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </label>
            <label>
                Senha:
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
            </label>
            <label>
                Grupo:
                <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
                    <option value="ADMINISTRADOR">Administrador</option>
                    <option value="ESTOQUISTA">Estoquista</option>
                </select>
            </label>
            <button type="submit">Cadastrar</button>
        </form>
        </div>
    );
};

export default UsuarioForm;