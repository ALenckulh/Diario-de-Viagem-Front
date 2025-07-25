"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedAlt from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const TravelDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const [travel, setTravel] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/travels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTravel(data);
      });
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja deletar esta viagem?")) {
      await fetch(`http://localhost:8080/api/travels/${id}`, {
        method: "DELETE",
      });
      router.push("/travels");
    }
  };

  const feedbackIcons = {
    "Ruim": <SentimentVeryDissatisfiedIcon sx={{ color: "red", mr: 1, verticalAlign: "middle" }} />,
    "Mais ou menos": <SentimentNeutralIcon sx={{ color: "orange", mr: 1, verticalAlign: "middle" }} />,
    "Bom": <SentimentSatisfiedAlt sx={{ color: "#66bb6a", mr: 1, verticalAlign: "middle" }} />,
    "Excelente": <SentimentVerySatisfiedIcon sx={{ color: "#388e3c", mr: 1, verticalAlign: "middle" }} />,
  };

  if (!travel) return <Container sx={{ mt: 4 }}><Typography>Carregando...</Typography></Container>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>{travel.titulo}</Typography>
        {travel.imagem && (
          <Box mb={2} display="flex" justifyContent="center">
            <img
              src={`http://localhost:8080${travel.imagem}`}
              alt={travel.titulo}
              style={{ maxWidth: "100%", maxHeight: 300 }}
            />
          </Box>
        )}
        <Typography variant="subtitle1"><b>Destino:</b> {travel.destino}</Typography>
        <Typography variant="body1" mb={1}><b>Descrição:</b> {travel.descricao}</Typography>
        <Typography variant="body2" mb={1}>
          <b>Feedback:</b>{" "}
          {travel.feedback && feedbackIcons[travel.feedback]}
          {travel.feedback}
        </Typography>
        <Typography variant="body2" mb={2}><b>Duração:</b> {travel.duracao} dias</Typography>
        <Box display="flex" gap={2} mt={2}>
          <Link href="/travels">
            <Button variant="outlined">
              Voltar
            </Button>
          </Link>
          <Link href={`/travels/${id}/edit`}>
            <Button variant="contained" color="primary">
              Editar
            </Button>
          </Link>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Deletar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TravelDetailPage;
