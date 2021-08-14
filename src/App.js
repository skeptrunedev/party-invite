import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react"; 
import { Container, Form, Button } from "react-bootstrap";

function App() {
  const [number, setNumber] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = async (e) => {
    await e.preventDefault();

    const res = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: number, body: body }),
    });

    const data = await res.json();

    if (data.success) {
      await setNumber("");
      await setBody("");
    } else {
      await setNumber("An Error has occurred.");
      await setBody("An Error has occurred.");
    }
  };

  return (
    <div> 
      <Container>
        <h2>Send SMS</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label htmlFor="to">To</Form.Label>
            <Form.Control value={number} onChange={(e) => setNumber(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="message">Body</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Container>
    </div> 
  )
}

export default App;
