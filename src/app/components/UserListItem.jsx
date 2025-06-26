import { ListItem, ListItemText } from "@mui/material";

const UserListItem = ({ user }) => (
  <ListItem divider>
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
);

export default UserListItem;
