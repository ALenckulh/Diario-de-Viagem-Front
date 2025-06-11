"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
} from "@mui/material";

const RegisterPage = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    idade: "",
    senha: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, idade: Number(form.idade) }),
      });
      if (res.ok) {
        setSuccess("Cadastro realizado com sucesso!");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setError("Erro ao cadastrar. Verifique os dados e tente novamente.");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>
          Cadastro
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Idade"
            name="idade"
            type="number"
            value={form.idade}
            onChange={handleChange}
            required
          />
          <TextField
            label="Senha"
            name="senha"
            type="password"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Cadastrar
          </Button>
        </Box>
        <Button
          variant="text"
          sx={{ mt: 2 }}
          onClick={() => router.push("/login")}
        >
          Já tem conta? Entrar
        </Button>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
