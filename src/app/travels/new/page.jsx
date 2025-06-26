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

const TravelCreatePage = () => {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    destino: "",
    feedback: "",
    duracao: "",
    imagem: null,
  });
  const [imageName, setImageName] = useState("");
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, imagem: file });
    setImageName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.imagem) {
      alert("Selecione uma imagem para a viagem.");
      return;
    }

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
        const errorText = await res.text();
        alert("Erro ao salvar viagem:\n" + errorText);
        console.error("Erro ao salvar viagem:", errorText);
      }
    } catch (err) {
      alert("Erro de conexão com servidor.");
      console.error("Erro de conexão com servidor:", err);
    }
  };

  if (!mounted) {
    return null;
  }

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
              onChange={handleFileChange}
              required
            />
            <label htmlFor="imagem-upload">
              <Button variant="outlined" component="span">
                Escolher Imagem
              </Button>
              <span style={{ marginLeft: 12, verticalAlign: "middle" }}>
                {imageName || "Nenhum arquivo selecionado"}
              </span>
            </label>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TravelCreatePage;
