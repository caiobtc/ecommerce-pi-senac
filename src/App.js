import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard"
import EstoquistaDashboard from "./components/EstoquistaDashboard";
import ProdutoList from "./components/ProdutoList";
import UsuarioList from "./components/UsuarioList";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [usuario, setUsuario] = useState(null);

    const handleLogin = (usuarioLogado) => {
        setUsuario(usuarioLogado); // Atualiza o estado do usuário logado
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                <Route
                    path="/admin"
                    element={
                        usuario?.grupo === "ADMINISTRADOR" ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/estoquista"
                    element={
                        usuario?.grupo === "ESTOQUISTA" ? (
                            <EstoquistaDashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route path="/produtos" element={<ProdutoList />} />
                <Route path="/usuarios" element={<UsuarioList />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;