"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  List,
  Button,
  Box,
  Paper,
} from "@mui/material";
import TravelListItem from "../components/TravelListItem";

const TravelListPage = () => {
  const [travels, setTravels] = useState([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetch("http://localhost:8080/api/travels")
      .then((res) => res.json())
      .then(setTravels);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Viagens</Typography>
            <Link href="/travels/new">
              <Button variant="contained" color="primary">
                Nova Viagem
              </Button>
            </Link>
          </Box>
          <List>
            {travels.map((travel) => (
              <TravelListItem key={travel.id} travel={travel} />
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};

export default TravelListPage;
