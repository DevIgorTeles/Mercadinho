import React from "react";
import "./Products.css";
import { Button, Card, CardGroup, Container } from "react-bootstrap";

const Products = () => {
  const products = [
    {
      name: "Jogos PS2",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "Jogos PS2",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "Jogos PS2",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "Jogos PS2",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "Jogos PS2",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "Jogos PS2",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
    {
      name: "Jogos PS2",
      description: "Jogo de um deus da guerra buscando vingança",
      price: "R$10",
      image:
        "https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg",
    },
  ];
  const getCards = () => {
    return products.map((products) => {
      return (
        <Card className="cardProduct">
          <Card.Img
            variant="top"
            src="https://acdn.mitiendanube.com/stores/001/626/035/products/829481c6ca2467390a06e4b3d71b8cf4-605bc96bd3e61cd98817246884791821-480-0.jpg"
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
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
