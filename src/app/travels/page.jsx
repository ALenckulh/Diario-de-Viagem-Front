"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";

const TravelListPage = () => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/travels")
      .then((res) => res.json())
      .then(setTravels);
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Diário de Viagem
          </Typography>
          <Link href="/users" passHref>
            <Button color="inherit">Usuários</Button>
          </Link>
          <Link href="/login" passHref>
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
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
              <Link key={travel.id} href={`/travels/${travel.id}`}>
                <ListItem button divider>
                  <ListItemText
                    primary={travel.titulo}
                    secondary={travel.destino}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};

export default TravelListPage;
