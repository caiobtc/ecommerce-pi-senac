// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useEffect, useState } from "react";
// import { Pagination } from "react-bootstrap";

// const ListaProdutos = () => {
//     const [produtos, setProdutos] = useState([]);
//     const [termoBusca, setTermoBusca] = useState("");
//     const [paginaAtual, setPaginaAtual] = useState(1);
//     const [itensPorPagina] = useState(10);

//     useEffect(() => {
//         axios.get("http://localhost:8080/api/produtos")
//             .then((response) => {
//                 setProdutos(response.data);
//             })
//             .catch((error) => {
//                 console.error("Erro ao buscar produtos:", error);
//             })
//     }, []);

//     const handleBusca = (event) => {
//         setTermoBusca(event.target.value);
//         setPaginaAtual(1); // Volta para a primeira página ao realizar uma nova busca
//     };

//     const produtosFiltrados = produtos.filter((produto) =>
//         produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
//     );

//     const indiceDoUltimoItem = paginaAtual * itensPorPagina;
//     const indiceDoPrimeiroItem = indiceDoUltimoItem - itensPorPagina;
//     const itensAtuais = produtosFiltrados.slice(indiceDoPrimeiroItem, indiceDoUltimoItem);

//     const paginar = (numeroPagina) => setPaginaAtual(numeroPagina);

//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between mb-3">
//                 <input
//                     type="text"
//                     placeholder="Buscar produto..."
//                     value={termoBusca}
//                     onChange={handleBusca}
//                     className="form-control w-50"
//                 />
//                 <button className="btn btn-primary" onClick={() => {/* Implementar navegação para cadastro */}}>
//                     <i className="fas fa-plus"></i> Cadastrar Produto
//                 </button>
//             </div>
//             <table className="table table-striped table-hover">
//                 <thead className="table-dark">
//                     <tr>
//                         <th className="text-center">Código</th>
//                         <th className="text-center">Nome</th>
//                         <th className="text-center">Quantidade</th>
//                         <th className="text-center">Valor</th>
//                         <th className="text-center">Status</th>
//                         <th className="text-center">Opções</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {itensAtuais.map((produto) => {
//                         const valorFormatado = produto && typeof produto.preco === 'number' 
//                             ? produto.preco.toFixed(2) 
//                             : '0.00';

//                         return (
//                             <tr key={produto.id}>
//                                 <td className="text-center">{produto.id}</td>
//                                 <td className="text-center">{produto.nome}</td>
//                                 <td className="text-center">{produto.quantidade}</td>
//                                 <td className="text-center">R$ {valorFormatado}</td>
//                                 <td className="text-center">{produto.status}</td>
//                                 <td className="text-center">
//                                     <button className="btn btn-warning btn-sm me-2">
//                                         <i className="fas fa-edit"></i> Alterar
//                                     </button>
//                                     <button className="btn btn-info btn-sm me-2">
//                                         <i className="fas fa-eye"></i> Visualizar
//                                     </button>
//                                     <button className="btn btn-success btn-sm">
//                                         <i className="fas fa-power-off"></i> {produto.status === 'Ativo' ? 'Desativar' : 'Reativar'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//             <div className="d-flex justify-content-center">
//                 <Pagination>
//                     {[...Array(Math.ceil(produtosFiltrados.length / itensPorPagina)).keys()].map(numero => (
//                         <Pagination.Item key={numero + 1} active={numero + 1 === paginaAtual} onClick={() => paginar(numero + 1)}>
//                             {numero + 1}
//                         </Pagination.Item>
//                     ))}
//                 </Pagination>
//             </div>
//         </div>
//     );
// };

// export default ListaProdutos;

import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ProductFormModal from "./ProductFormModal";

const ListaProdutos = () => {
    const [products, setProducts] = useState([]); // Lista de produtos
    const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade da modal

    // Função para adicionar um novo produto à lista
    const handleProductCreated = (newProduct) => {
        console.log("Produto recebido no ProductList:", newProduct); // Log para depuração
        setProducts((prev) => [newProduct, ...prev]); // Adiciona o novo produto ao início da lista
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Listagem de Produtos</h2>

            {/* Botão para abrir a modal */}
            <Button
                variant="primary"
                onClick={() => setShowModal(true)} // Define showModal como true para exibir a modal
                className="mb-4"
            >
                <i className="bi bi-plus-lg"></i> Novo Produto
            </Button>

            {/* Tabela de produtos */}
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Avaliação</th>
                            <th>Imagem Principal</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Nenhum produto cadastrado.
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>R$ {product.price.toFixed(2)}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.rating}</td>
                                    <td>
                                        {product.images.find((img) => img.isDefault) ? (
                                            <img
                                                src={product.images.find((img) => img.isDefault).base64}
                                                alt="Principal"
                                                style={{ width: "50px", height: "50px" }}
                                                className="rounded"
                                            />
                                        ) : (
                                            "Nenhuma imagem padrão"
                                        )}
                                    </td>
                                    <td>
                                        <Button variant="info" size="sm" className="me-2">
                                            Visualizar
                                        </Button>
                                        <Button variant="warning" size="sm">
                                            Editar
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Modal de cadastro */}
            <ProductFormModal
                show={showModal} // Controla a visibilidade da modal
                onHide={() => setShowModal(false)} // Fecha a modal quando necessário
                onProductCreated={handleProductCreated} // Callback para adicionar o produto à lista
            />
        </div>
    );
};

export default ListaProdutos;
