import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/auth/login", { email, senha })
            .then((response) => {
                alert("Login Bem-sucedido!");
                onLogin(response.data); // Passa os dados do usuário logado para o App
                // Redireciona com base no grupo do usuário
                if (response.data.grupo === "ADMINISTRADOR") {
                    navigate("/admin");
                } else if (response.data.grupo === "ESTOQUISTA") {
                    navigate("/estoquista");
                }
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error);
                alert("Erro ao fazer login");
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Senha:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;