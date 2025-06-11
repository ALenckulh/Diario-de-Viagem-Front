"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>Usuários</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id} divider>
              <ListItemText
                primary={user.nome}
                secondary={
                  <>
                    <span>Email: {user.email}</span>
                    <br />
                    <span>Idade: {user.idade}</span>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        {users.length === 0 && (
          <Box mt={2}>
            <Typography>Nenhum usuário encontrado.</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default UsersPage;
