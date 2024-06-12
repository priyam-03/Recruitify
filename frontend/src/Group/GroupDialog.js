import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent, DialogContentText, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import CustomPrimaryButton from "../shared/components/CustomPrimaryButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useSelector } from "react-redux";
import InputWithLabel from "../shared/components/InputWithLabel";
import { addGroup } from "../api";
const GroupDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [name, setName] = useState("");
  const { friends } = useSelector((state) => state.friends);

  const handleFrinedSelected = async () => {
    console.log(selectedFields);
    await addGroup({
      name: name,
      newCluster: selectedFields,
    });

    handleCloseDialog();
  };
  const handleFieldChange = (field) => {
    setSelectedFields((prevSelectedFields) => {
      if (prevSelectedFields.includes(field)) {
        return prevSelectedFields.filter(
          (selectedField) => selectedField !== field
        );
      } else {
        return [...prevSelectedFields, field];
      }
    });
  };
  const handleCloseDialog = () => {
    closeDialogHandler();
    setName("");
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText>
            <Typography>Enter name of the group</Typography>
          </DialogContentText>
          <InputWithLabel
            label="name"
            type="text"
            setValue={setName}
            placeholder="Enter name"
          />
        </DialogContent>
        <DialogTitle>
          <Typography>Add Friends</Typography>
        </DialogTitle>
        <DialogContent>
          {friends.length > 0 &&
            friends.map((f) => (
              <FormControlLabel
                key={f.id}
                control={
                  <Checkbox
                    checked={selectedFields.includes(f.id)}
                    onChange={() => handleFieldChange(f.id)}
                  />
                }
                label={f.username}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <CustomPrimaryButton
            onClick={handleFrinedSelected}
            label="Add"
            additionalStyles={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "10px",
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GroupDialog;
