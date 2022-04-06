import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import mq from "../../styling/mediaQueries";

const FormContainer = styled("form")(
  mq({
    margin: ["0 10px", "0 30px"],
  })
);

const Input = styled("input")({
  display: "block",
  boxSizing: "border-box",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #ececec",
  padding: "10px 15px",
  marginBottom: "10px",
  fontSize: "14px",
});

const Label = styled("label")({
  lineHeight: 2,
  textAlign: "left",
  display: "block",
  marginBottom: "13px",
  marginTop: "20px",
  color: "gray",
  fontSize: "14px",
  fontWeight: 600,
});

const Error = styled("p")({
  textAlign: "start",
  color: "red",
  "&:before": {
    display: "inline",
    content: '"⚠"',
  },
});

const SaveButtonStyle = {
  backgroundColor: "#1b68b3",
};

const CancelButtonStyle = {
  backgroundColor: "#f7f7f7",
  color: "black",
  "&:hover": {
    backgroundColor: "#f7f7f7",
  },
};

const HideCancelButtonStyle = {
  display: "none",
  backgroundColor: "#f7f7f7",
  color: "black",
  "&:hover": {
    backgroundColor: "#f7f7f7",
  },
};

const Form = ({ formUserData, updateUserData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [saveDisable, setSaveDisable] = useState(false);
  const [cancelVisibility, setCancelVisibility] = useState(true);

  const onSubmit = (data) => {
    setCancelVisibility(false);
    setSaveDisable(true);
    updateUserData(formUserData.id, data);
  };

  const onCancel = () => {
    reset();
    setSaveDisable(true);
    setCancelVisibility(false);
  };

  const onHandleChange = (e) => {
    e.target.value.length > 0 && setSaveDisable(false);
    e.target.value.length > 0 && setCancelVisibility(true);
  };

  useEffect(() => {
    setSaveDisable(false);
    setCancelVisibility(true);
  }, []);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Label>Name</Label>
      <Input
        type="text"
        placeholder="Enter name"
        defaultValue={formUserData?.name}
        {...register("name", {
          required: true,
          onChange: (e) => {
            onHandleChange(e);
          },
        })}
      />
      {errors.name && <Error>This is required</Error>}

      <Label>Email address</Label>
      <Input
        type="text"
        placeholder="Enter email address"
        defaultValue={formUserData?.email}
        {...register("email", {
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          onChange: (e) => {
            onHandleChange(e);
          },
        })}
      />
      {errors.email && <Error>Invalid email address</Error>}

      <Label>Phone</Label>
      <Input
        type="text"
        placeholder="Enter phone"
        defaultValue={formUserData?.phone}
        {...register("phone", {
          required: true,
          onChange: (e) => {
            onHandleChange(e);
          },
        })}
      />
      {errors.phone && <Error>This is required</Error>}

      <Label>Address</Label>
      <Input
        type="text"
        placeholder="Enter address"
        defaultValue={formUserData?.address}
        {...register("address", {
          onChange: (e) => {
            onHandleChange(e);
          },
        })}
      />

      <Label>Company</Label>
      <Input
        type="text"
        placeholder="Enter Company"
        defaultValue={formUserData?.company}
        onChange={onHandleChange}
        {...register("company", {
          onChange: (e) => {
            onHandleChange(e);
          },
        })}
      />

      <Input
        type="text"
        style={{ display: "none" }}
        defaultValue={formUserData?.photo}
        onChange={onHandleChange}
        {...register("photo", {
          onChange: (e) => {
            onHandleChange(e);
          },
        })}
      />

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          sx={cancelVisibility ? CancelButtonStyle : HideCancelButtonStyle}
          onClick={onCancel}
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          sx={SaveButtonStyle}
          disabled={saveDisable}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Stack>
    </FormContainer>
  );
};

export default Form;
