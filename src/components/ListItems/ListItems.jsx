import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import mq from "../../styling/mediaQueries";

const ListItemTextStyle = mq({
  "&.MuiListItemText-root": {
    display: ["none", "block"],
  },
});

const AlignItemsList = ({ userData, selectUser }) => {
  const [selectedIndex, setSelectedIndex] = useState();
  const onClickUser = (id) => {
    selectUser(id);
    setSelectedIndex(id);
  };

  return userData.map((item) => (
    <List key={item.id} onClick={() => onClickUser(item.id)}>
      <ListItem
        alignItems="flex-start"
        selected={selectedIndex === item.id}
        sx={{
          "&:hover": {
            backgroundColor: "#e8e8e8",
          },
          "&.Mui-selected": {
            backgroundColor: "#1b68b3",
            color: "white",
          },
        }}
      >
        <ListItemAvatar>
          <Avatar alt={item.name} src={item.photo} />
        </ListItemAvatar>
        <ListItemText
          sx={ListItemTextStyle}
          primary={item.name}
          secondary={<Typography color="gray">{item.email}</Typography>}
        />
      </ListItem>
    </List>
  ));
};

export default AlignItemsList;
