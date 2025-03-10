// src/components/ProductFormModal.js
import axios from "axios"; // Importa o Axios diretamente
import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ProductFormModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 3,
    description: "",
    price: 0,
    stock: 0,
    status: "ATIVO", // Estado inicial para o status
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  // Limpa o formulário sempre que a modal for aberta
  useEffect(() => {
    if (show) {
      setFormData({
        name: "",
        rating: 3,
        description: "",
        price: 0,
        stock: 0,
        status: "ATIVO", // Reinicia o status ao abrir a modal
      });
      setImages([]);
      setError("");
    }
  }, [show]);

  // Função para lidar com o upload de imagens
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;

        newImages.push({
          filename: `${Date.now()}-${file.name}`,
          base64,
          isDefault: false,
        });

        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Função para definir a imagem padrão
  const handleSetDefaultImage = (filename) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isDefault: img.filename === filename,
      }))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado!"); // Log para depuração

    setError("");

    // Validação básica
    if (!formData.name || formData.price <= 0 || formData.stock < 0) {
      setError("Preencha todos os campos obrigatórios.");
      console.log("Erro: Campos obrigatórios não preenchidos."); // Log para depuração
      return;
    }

    if (!images.some((img) => img.isDefault)) {
      setError("Selecione uma imagem padrão.");
      console.log("Erro: Nenhuma imagem padrão selecionada."); // Log para depuração
      return;
    }

    const productData = {
      nome: formData.name,
      preco: formData.price,
      quantidade: formData.stock,
      status: formData.status, // Agora usa o status selecionado pelo usuário
      imagens: images.map((img) => ({
        nomeArquivo: img.filename,
        caminho: img.base64,
        principal: img.isDefault,
      })),
    };

    console.log("Dados enviados para o backend:", productData); // Log para depuração

    try {
      const response = await axios.post("http://localhost:8080/api/produtos", productData);
      console.log("Resposta do backend:", response.data); // Log para depuração

      // Fecha a modal após o salvamento
      onHide();
    } catch (err) {
      console.error("Erro ao salvar o produto:", err.response ? err.response.data : err.message);
      setError("Erro ao salvar o produto. Tente novamente.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}

        <Form onSubmit={handleSubmit}>
          {/* Nome do Produto */}
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              type="text"
              maxLength={200}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Group>

          {/* Avaliação */}
          <Form.Group className="mb-3">
            <Form.Label>Avaliação (1 a 5)</Form.Label>
            <Form.Control
              type="number"
              step="0.5"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setFormData({ ...formData, rating: isNaN(value) ? 3 : value });
              }}
              required
            />
          </Form.Group>

          {/* Descrição */}
          <Form.Group className="mb-3">
            <Form.Label>Descrição Detalhada</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={2000}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>

          {/* Preço */}
          <Form.Group className="mb-3">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setFormData({ ...formData, price: isNaN(value) ? 0 : value });
              }}
              required
            />
          </Form.Group>

          {/* Estoque */}
          <Form.Group className="mb-3">
            <Form.Label>Quantidade em Estoque</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setFormData({ ...formData, stock: isNaN(value) ? 0 : value });
              }}
              required
            />
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status do Produto</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            >
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
              <option value="EM_ESPERA">Em Espera</option>
            </Form.Select>
          </Form.Group>

          {/* Imagens */}
          <Form.Group className="mb-3">
            <Form.Label>Imagens</Form.Label>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {images.map((img) => (
                <div key={img.filename} className="position-relative">
                  <img
                    src={img.base64}
                    alt={img.filename}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    className="rounded"
                  />
                  <div className="position-absolute top-0 end-0 p-1">
                    <Form.Check
                      type="radio"
                      checked={img.isDefault}
                      onChange={() => handleSetDefaultImage(img.filename)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current.click()}
            >
              Adicionar Imagens
            </Button>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              hidden
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFormModal;