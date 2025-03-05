import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EstoquistaDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Painel do Estoquista</h1>
            
            <div className="d-grid gap-2">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate("/produtos")}
                >
                    <i className="fas fa-box"></i> Listar Produtos
                </button>
            </div>
        </div>
    );
};

export default EstoquistaDashboard;