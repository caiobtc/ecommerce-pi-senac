import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina] = useState(10);

    useEffect(() => {
        axios.get("http://localhost:8080/api/usuarios")
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error);
            });
    }, []);

    const handleBusca = (event) => {
        setTermoBusca(event.target.value);
        setPaginaAtual(1); // Volta para a primeira página ao realizar uma nova busca
    };

    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    const indiceDoUltimoItem = paginaAtual * itensPorPagina;
    const indiceDoPrimeiroItem = indiceDoUltimoItem - itensPorPagina;
    const itensAtuais = usuariosFiltrados.slice(indiceDoPrimeiroItem, indiceDoUltimoItem);

    const paginar = (numeroPagina) => setPaginaAtual(numeroPagina);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    placeholder="Buscar usuário..."
                    value={termoBusca}
                    onChange={handleBusca}
                />
                <button className="btn btn-primary" onClick={() => {/* Navegação para cadastro */}}>
                    <i className="fas fa-plus"></i> Cadastrar Usuário
                </button>
            </div>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th className="text-center">Id</th>
                        <th className="text-center">Nome</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Grupo</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {itensAtuais.map((usuario) => (
                        <tr key={usuario.id}>
                            <td className="text-center">{usuario.id}</td>
                            <td className="text-center">{usuario.nome}</td>
                            <td className="text-center">{usuario.email}</td>
                            <td className="text-center">{usuario.grupo}</td>
                            <td className="text-center">{usuario.habilitado ? "Habilitado" : "Desabilitado"}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2">
                                    <i className="fas fa-edit"></i> Alterar
                                </button>
                                <button className="btn btn-info btn-sm me-2">
                                    <i className="fas fa-eye"></i> Visualizar
                                </button>
                                <button className="btn btn-success btn-sm">
                                    <i className="fas fa-power-off"></i> {usuario.habilitado ? 'Desabilitar' : 'Habilitar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <Pagination>
                    {[...Array(Math.ceil(usuariosFiltrados.length / itensPorPagina)).keys()].map(numero => (
                        <Pagination.Item key={numero + 1} active={numero + 1 === paginaAtual} onClick={() => paginar(numero + 1)}>
                            {numero + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div>
    );
};

export default UsuarioList;