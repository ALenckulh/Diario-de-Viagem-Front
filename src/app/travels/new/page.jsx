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
    imagem: null,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagem: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", form.titulo);
    formData.append("descricao", form.descricao);
    formData.append("destino", form.destino);
    formData.append("feedback", form.feedback);
    formData.append("duracao", form.duracao);
    formData.append("imagem", form.imagem);

    try {
      const res = await fetch("http://localhost:8080/api/travels", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/travels");
      } else {
        console.error("Erro ao salvar viagem.");
      }
    } catch (err) {
      console.error("Erro de conexão com servidor:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>
          Criar Viagem
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
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
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
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
