import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Painel do Administrador</h1>
            
            <div className="d-grid gap-2">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate("/produtos")}
                >
                    <i className="fas fa-box"></i> Listar Produtos
                </button>
                <button
                    className="btn btn-success btn-lg"
                    onClick={() => navigate("/usuarios")}
                >
                    <i className="fas fa-users"></i> Listar Usuários
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;