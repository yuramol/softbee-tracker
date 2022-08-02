import React from "react";
import {
  Avatar,
  Box,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { MainWrapper } from "../components";
import { PhotoCamera } from "@mui/icons-material";
import { ModalSelect } from "legos";
import { useFormik, FormikProps } from "formik";
import { ItemType } from "legos/ModalSelect";
type inintialValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
};

type profileInfoType = {
  label: string;
  fieldName: string;
  component: string;
  type: string;
  init: string;
  items?: ItemType[];
};
const profileInfo: profileInfoType[] = [
  {
    label: "FirstName *",
    fieldName: "firstName ",
    component: "input",
    type: "text",
    init: "qweqweqwe",
  },
  {
    label: "LastName *",
    fieldName: "lastName",
    component: "input",
    type: "text",
    init: "qweqweqwe",
  },
  {
    label: "Email *",
    fieldName: "email",
    component: "input",
    type: "email",
    init: "qweqweqwe",
  },
  {
    label: "Position *",
    fieldName: "position",
    component: "select",
    items: [{ label: "dev" }, { label: "manager" }],
    type: "text",
    init: "",
  },
  {
    label: "Link *",
    fieldName: "link",
    component: "input",
    type: "text",
    init: "",
  },
];

const ProfilePage = () => {
  const initialValues: inintialValuesType = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  // const renderProfileInput = (profileInfo: profileInfoType[]) => {

  // };
  return (
    <MainWrapper>
      <h1>Profile</h1>
      <Grid container spacing={3}>
        <Grid item xs alignContent="center">
          <Avatar
            sx={{ width: "250px", height: "250px" }}
            alt="User avatar"
            src="https://i.pravatar.cc/300
"
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <Typography>Upload new photo</Typography>
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Grid>
        <Grid direction="row" item xs={6}>
          {profileInfo.map(
            ({ fieldName, component, items, label, type, init }) => {
              if (component === "select") {
                return (
                  <Box>
                    {items?.length && (
                      <ModalSelect items={items} label={label} />
                    )}
                  </Box>
                );
              }
              if (component === "input") {
                return (
                  <Box>
                    <TextField
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      value={(formik.values as any)[fieldName]}
                      label={init}
                      type={type}
                      variant="standard"
                      onChange={(e) =>
                        formik.setFieldValue(fieldName, e.target.value)
                      }
                    />
                  </Box>
                );
              }
            },
          )}
        </Grid>
        <Grid item xs>
          ?
        </Grid>
      </Grid>
    </MainWrapper>
  );
};

export default ProfilePage;
