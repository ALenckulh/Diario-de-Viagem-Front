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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      if (res.ok) {
        // Você pode salvar o usuário no localStorage ou context se desejar
        // const user = await res.json();
        router.push("/travels");
      } else {
        setError("Email ou senha inválidos.");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </Box>
        <Button
          variant="text"
          sx={{ mt: 2 }}
          onClick={() => router.push("/register")}
        >
          Não tem conta? Cadastre-se
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
