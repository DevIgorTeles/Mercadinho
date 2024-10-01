import React, { useEffect, useState } from "react";
import "./Products.css";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { URL } from '../../../Utils'; // Importando constantes de URL
import { Bolacha } from '../../../Cookies'; // Importando o módulo Bolacha

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFindModal, setShowFindModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [formData, setFormData] = useState({ code: '', name: '', price: 0, description: '', image: '' });
  const [searchCode, setSearchCode] = useState('');
  const [foundProduct, setFoundProduct] = useState(null);
  const [promotionData, setPromotionData] = useState({ code: '', promotionPrice: 0 });

  // Função para obter o token do Bolacha
  const getToken = () => {
    return Bolacha.get('token'); // Ajuste conforme a implementação real do Bolacha
  };

  // Função para buscar todos os produtos no backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${URL.SERVER}:${URL.PORT}/api/products`);
      const data = await response.json();
      setProducts(data.content || []);
    } catch (error) {
      toast.error('Erro ao buscar produtos');
    }
  };

  // Função para adicionar um novo produto
  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${URL.SERVER}:${URL.PORT}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Produto adicionado com sucesso!');
        fetchProducts();
        setShowAddModal(false);
        setFormData({ code: '', name: '', price: 0, description: '', image: '' });
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
      const response = await fetch(`${URL.SERVER}:${URL.PORT}/api/products/${searchCode}`);
      const data = await response.json();

      if (response.ok) {
        setFoundProduct(data.content);
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
      const token = getToken();
      if (!token) {
        throw new Error('Token não encontrado. Por favor, faça login novamente.');
      }

      const response = await fetch(`${URL.SERVER}:${URL.PORT}/api/products/${code}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Produto removido com sucesso!');
        fetchProducts();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao remover produto');
      }
    } catch (error) {
      toast.error(`Erro ao remover produto: ${error.message}`);
    }
  };

  // Função para abrir o modal de promoção
  const handleOpenPromotionModal = (code) => {
    setPromotionData({ code, promotionPrice: 0 });
    setShowPromotionModal(true);
  };

  // Função para adicionar promoção a um produto
  const handleAddPromotion = async () => {
    const { code, promotionPrice } = promotionData;
    if (promotionPrice >= 0) {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('Token não encontrado. Por favor, faça login novamente.');
        }

        const response = await fetch(`${URL.SERVER}:${URL.PORT}/api/products/${code}/promotion`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ promotionPrice }),
        });

        if (response.ok) {
          toast.success('Promoção adicionada com sucesso!');
          fetchProducts();
          setShowPromotionModal(false);
          setPromotionData({ code: '', promotionPrice: 0 });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao adicionar promoção');
        }
      } catch (error) {
        toast.error(`Erro ao adicionar promoção: ${error.message}`);
      }
    } else {
      toast.error('O preço da promoção deve ser um número positivo');
    }
  };

  // Função para remover a promoção de um produto
  const handleRemovePromotion = async (code) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Token não encontrado. Por favor, faça login novamente.');
      }

      const response = await fetch(`${URL.SERVER}:${URL.PORT}/api/products/${code}/promotion`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Promoção removida com sucesso!');
        fetchProducts();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao remover promoção');
      }
    } catch (error) {
      toast.error(`Erro ao remover promoção: ${error.message}`);
    }
  };

  // Função para renderizar os cards dos produtos
  const getCards = () => {
    if (products.length === 0) {
      return <p>Nenhum produto disponível</p>;
    }

    return products.map((product) => {
      return (
        <Card className="cardProduct" key={product.code}>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            {product.promotionPrice ? (
              <>
                <Card.Text><strong>Preço Antigo: <span className="oldPrice">R$ {product.price.toFixed(2)}</span></strong></Card.Text>
                <Card.Text><strong>Preço com Promoção: R$ {product.promotionPrice.toFixed(2)}</strong></Card.Text>
              </>
            ) : (
              <Card.Text><strong>Preço: R$ {product.price.toFixed(2)}</strong></Card.Text>
            )}
          </Card.Body>
          <Card.Footer className="cardFooter">
            <Button variant="danger" onClick={() => handleRemoveProduct(product.code)}>Remover</Button>
            <Button variant="warning" onClick={() => handleOpenPromotionModal(product.code)}>Adicionar Promoção</Button>
            {product.promotionPrice && (
              <Button variant="secondary" onClick={() => handleRemovePromotion(product.code)} style={{ marginLeft: '5px' }}>
                Remover Promoção
              </Button>
            )}
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

  // Função para lidar com a mudança do input de promoção
  const handlePromotionChange = (e) => {
    const { value } = e.target;
    setPromotionData((prevData) => ({
      ...prevData,
      promotionPrice: parseFloat(value),
    }));
  };

  // Efeito para buscar produtos assim que o componente for montado
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Container className="cardContainer">
        <div className="buttonGroup">
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            Adicionar Produto
          </Button>
          <Button variant="info" onClick={() => setShowFindModal(true)}>
            Listar por Código
          </Button>
        </div>
        <div className="cardsGrid">
          {getCards()}
        </div>
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
                {foundProduct.promotionPrice ? (
                  <>
                    <Card.Text><strong>Preço Antigo: <span className="oldPrice">R$ {foundProduct.price.toFixed(2)}</span></strong></Card.Text>
                    <Card.Text><strong>Preço com Promoção: R$ {foundProduct.promotionPrice.toFixed(2)}</strong></Card.Text>
                  </>
                ) : (
                  <Card.Text><strong>Preço: R$ {foundProduct.price.toFixed(2)}</strong></Card.Text>
                )}
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

      {/* Modal para adicionar promoção */}
      <Modal show={showPromotionModal} onHide={() => setShowPromotionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Promoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Preço da Promoção</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o preço promocional"
                value={promotionData.promotionPrice}
                onChange={handlePromotionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPromotionModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddPromotion}>
            Adicionar Promoção
          </Button>
        </Modal.Footer>
      </Modal>

      
    </>
  );
};

export default Products;
