import React, { useEffect, useState } from "react";
import axios from "axios";

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/usuarios")
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error);
            });
    }, []);

    return (
        <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Grupo</th>
                    <th>Status</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.grupo}</td>
                        <td>{usuario.habilitado ? "Habilitado" : "Desabilitado"}</td>
                        <td>
                            <button className="btn btn-warning btn-sm me-2">
                                <i className="fas fa-edit"></i> Alterar
                            </button>
                            <button className="btn btn-info btn-sm me-2">
                                <i className="fas fa-eye"></i> Visualizar
                            </button>
                            <button className="btn btn-success btn-sm">
                                <i className="fas fa-power-off"></i> Ativar/Desativar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsuarioList;