import React, { useEffect, useState } from "react";
import axios from "axios";

const ProdutoList = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/produtos")
            .then((response) => {
                setProdutos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error);
            });
    }, []);

    return (
        <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map((produto) => (
                    <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.quantidade}</td>
                        <td>R$ {produto.valor.toFixed(2)}</td>
                        <td>{produto.status}</td>
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

export default ProdutoList;