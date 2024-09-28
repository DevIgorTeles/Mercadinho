import React from "react";
import "./Products.css";
import { Button, Card, Container } from "react-bootstrap";

const Products = () => {
  const products = [
    {
      name: "GOD OF WAR",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "GOD OF WAR",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "GOD OF WAR",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "GOD OF WAR",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "GOD OF WAR",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "GOD OF WAR",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    
  ];

  const getCards = () => {
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
            <Button variant="primary">Ver</Button>
          </Card.Footer>
        </Card>
      );
    });
  };

  return <Container className="cardContainer">{getCards()}</Container>;
};

export default Products;
