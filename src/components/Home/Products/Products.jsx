import React, { useEffect, useState } from "react";
import "./Products.css";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);  // Modal para adicionar produto
  const [showFindModal, setShowFindModal] = useState(false);  // Modal para buscar produto por código
  const [formData, setFormData] = useState({ code: '', name: '', price: 0, description: '', image: '' });
  const [searchCode, setSearchCode] = useState('');  // Para buscar produto por código
  const [foundProduct, setFoundProduct] = useState(null);  // Armazena o produto encontrado

  // Função para buscar todos os produtos no backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.0.13:3000/api/products');
      const data = await response.json();
      setProducts(data.content || []);  // Atualiza o estado com os produtos
    } catch (error) {
      toast.error('Erro ao buscar produtos');
    }
  };

  // Função para adicionar um novo produto
  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://192.168.0.13:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Produto adicionado com sucesso!');
        fetchProducts();  // Atualiza a lista de produtos
        setShowAddModal(false);  // Fecha o modal
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao adicionar produto');
      }
    } catch (error) {
      toast.error(`Erro ao adicionar produto: ${error.message}`);
    }
  };

  // Função para buscar produto por código
  const handleFindProduct = async () => {
    try {
      const response = await fetch(`http://192.168.0.13:3000/api/products/${searchCode}`);
      const data = await response.json();

      if (response.ok) {
        setFoundProduct(data.content);  // Armazena o produto encontrado
      } else {
        throw new Error('Produto não encontrado');
      }
    } catch (error) {
      toast.error(`Erro ao buscar produto: ${error.message}`);
      setFoundProduct(null);
    }
  };

  // Função para remover um produto
  const handleRemoveProduct = async (code) => {
    try {
      const response = await fetch(`http://192.168.0.13:3000/api/products/${code}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Produto removido com sucesso!');
        fetchProducts();  // Atualiza a lista de produtos
      } else {
        throw new Error('Erro ao remover produto');
      }
    } catch (error) {
      toast.error(`Erro ao remover produto: ${error.message}`);
    }
  };

  // Função para renderizar os cards dos produtos
  const getCards = () => {
    if (products.length === 0) {
      return <p>Nenhum produto disponível</p>;
    }

    return products.map((product, index) => {
      return (
        <Card className="cardProduct" key={index}>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text><strong>Preço: {product.price}</strong></Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="danger" onClick={() => handleRemoveProduct(product.code)}>Remover</Button>
          </Card.Footer>
        </Card>
      );
    });
  };

  // Função para lidar com a mudança de input do formulário de adição
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com a mudança do input de busca por código
  const handleCodeChange = (e) => {
    setSearchCode(e.target.value);
  };

  // Efeito para buscar produtos assim que o componente for montado
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Container className="cardContainer">
        <Button variant="success" onClick={() => setShowAddModal(true)} style={{ marginBottom: "20px", marginRight: "10px" }}>
          Adicionar Produto
        </Button>
        <Button variant="info" onClick={() => setShowFindModal(true)} style={{ marginBottom: "20px" }}>
          Listar por Código
        </Button>
        {getCards()}
      </Container>

      {/* Modal para adicionar produto */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o código"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o preço"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a descrição"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL da Imagem</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a URL da imagem"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Adicionar Produto
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para buscar produto por código */}
      <Modal show={showFindModal} onHide={() => setShowFindModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar Produto por Código</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Código do Produto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o código do produto"
                value={searchCode}
                onChange={handleCodeChange}
              />
            </Form.Group>
          </Form>
          {foundProduct && (
            <Card className="cardProduct">
              <Card.Img variant="top" src={foundProduct.image} />
              <Card.Body>
                <Card.Title>{foundProduct.name}</Card.Title>
                <Card.Text>{foundProduct.description}</Card.Text>
                <Card.Text><strong>Preço: {foundProduct.price}</strong></Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFindModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleFindProduct}>
            Buscar Produto
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Products;
