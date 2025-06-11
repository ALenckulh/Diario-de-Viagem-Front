"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";

const TravelCreatePage = () => {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    destino: "",
    feedback: "",
    duracao: "",
    imagem: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/travels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, duracao: Number(form.duracao) }),
    })
      .then((res) => res.json())
      .then(() => router.push("/travels"));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>Criar Viagem</Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Título"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
          <TextField
            label="Destino"
            name="destino"
            value={form.destino}
            onChange={handleChange}
            required
          />
          <TextField
            label="Descrição"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            label="Feedback"
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
          />
          <TextField
            label="Duração (dias)"
            name="duracao"
            type="number"
            value={form.duracao}
            onChange={handleChange}
          />
          <TextField
            label="URL da Imagem"
            name="imagem"
            value={form.imagem}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TravelCreatePage;
