import React from "react";
import { Box, Button, Popover, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserPopover = ({ anchorEl, open, onClose, user, onLogout }) => {
  const navigate = useNavigate();
  const email = user.email; 

  return (
    <Popover
      id={open ? "user-popover" : undefined}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box
        p={2}
        style={{
          minWidth: "200px",
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          {user.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          {user.email} 
        </Typography>
        <Box mt={2} display="flex" flexDirection="column" justifyContent="center">
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mt: 1, borderColor: "gray", color: "white" }} 
            onClick={() => {
              navigate(`/user-profile`);
              onClose();
            }}
          >
            Profile
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error" 
            sx={{ mt: 1 }} 
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default UserPopover;
