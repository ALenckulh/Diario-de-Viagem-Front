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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedAlt from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const feedbackOptions = [
  {
    value: "Ruim",
    label: "Ruim",
    icon: <SentimentVeryDissatisfiedIcon sx={{ color: "red", mr: 1 }} />,
  },
  {
    value: "Mais ou menos",
    label: "Mais ou menos",
    icon: <SentimentNeutralIcon sx={{ color: "orange", mr: 1 }} />,
  },
  {
    value: "Bom",
    label: "Bom",
    icon: <SentimentSatisfiedAlt sx={{ color: "#66bb6a", mr: 1 }} />,
  },
  {
    value: "Excelente",
    label: "Excelente",
    icon: <SentimentVerySatisfiedIcon sx={{ color: "#388e3c", mr: 1 }} />,
  },
];

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
            inputProps={{ maxLength: 255 }}
            helperText={`${form.descricao.length}/255`}
          />
          <FormControl required>
            <InputLabel id="feedback-label">Feedback</InputLabel>
            <Select
              labelId="feedback-label"
              name="feedback"
              value={form.feedback}
              label="Feedback"
              onChange={handleChange}
              renderValue={(selected) => {
                const option = feedbackOptions.find(
                  (opt) => opt.value === selected
                );
                return (
                  <Box display="flex" alignItems="center">
                    {option?.icon}
                    <span>{option?.label}</span>
                  </Box>
                );
              }}
            >
              {feedbackOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box display="flex" alignItems="center">
                    {option.icon}
                    <span>{option.label}</span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Duração (dias)"
            name="duracao"
            type="number"
            value={form.duracao}
            onChange={handleChange}
          />
          <Box>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="imagem-upload"
              type="file"
              name="imagem"
              onChange={e => setForm({ ...form, imagem: e.target.files[0] })}
            />
            <label htmlFor="imagem-upload">
              <Button variant="outlined" component="span">
                Escolher Imagem
              </Button>
              <span style={{ marginLeft: 12, verticalAlign: "middle" }}>
                {form.imagem && form.imagem.name
                  ? form.imagem.name
                  : "Nenhum arquivo selecionado"}
              </span>
            </label>
          </Box>
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
