"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";

const TravelEditPage = () => {
  const params = useParams();
  const { id } = params;
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    destino: "",
    feedback: "",
    duracao: "",
    imagem: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/travels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          titulo: data.titulo || "",
          descricao: data.descricao || "",
          destino: data.destino || "",
          feedback: data.feedback || "",
          duracao: data.duracao ? String(data.duracao) : "",
          imagem: data.imagem || "",
        });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/travels/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, duracao: Number(form.duracao) }),
    })
      .then((res) => res.json())
      .then(() => router.push(`/travels/${id}`));
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>Editar Viagem</Typography>
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
          <Box display="flex" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
            <Button variant="outlined" onClick={() => router.push(`/travels/${id}`)}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TravelEditPage;
