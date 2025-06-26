import Link from "next/link";
import { ListItem, ListItemText } from "@mui/material";

const TravelListItem = ({ travel }) => (
  <ListItem divider component={Link} href={`/travels/${travel.id}`}>
    <ListItemText
      primary={travel.titulo}
      secondary={travel.destino}
    />
  </ListItem>
);

export default TravelListItem;
