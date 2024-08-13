import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { addStock } from '../../api/addStock'; 
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      // Send a request to add a new stock item
      const result = await addStock(values);
      
      // Reset the form fields after successful submission
      resetForm();
      
      // Optionally, you can handle the result or provide feedback to the user
      console.log('Stock item added successfully:', result);
    } catch (error) {
      console.error('Error adding stock item:', error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Ajouter un nouvau produit" subtitle="ajouter un produit dans le stock" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Id produit"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idproduit}
                name="idproduit"
                error={!!touched.idproduit && !!errors.idproduit}
                helperText={touched.idproduit && errors.idproduit}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom produit"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nomproduit}
                name="nomproduit"
                error={!!touched.nomproduit && !!errors.nomproduit}
                helperText={touched.nomproduit && errors.nomproduit}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Prix (par métre carré)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.prix}
                name="prix"
                error={!!touched.prix && !!errors.prix}
                helperText={touched.prix && errors.prix}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Largeur"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.largeur}
                name="largeur"
                error={!!touched.largeur && !!errors.largeur}
                helperText={touched.largeur && errors.largeur}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Longeur"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.longeur}
                name="longeur"
                error={!!touched.longeur && !!errors.longeur}
                helperText={touched.longeur && errors.longeur}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Epaisseur"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.epaisseur}
                name="epaisseur"
                error={!!touched.epaisseur && !!errors.epaisseur}
                helperText={touched.epaisseur && errors.epaisseur}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre des pieces"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nbpieces}
                name="nbpieces"
                error={!!touched.nbpieces && !!errors.nbpieces}
                helperText={touched.nbpieces && errors.nbpieces}
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  idproduit: yup.string().required("required"),
  nomproduit: yup.string().required("required"),
  prix: yup
    .number()
    .typeError("Largeur must be a number")
    .positive("Largeur must be a positive number")
    .required("Largeur is required"),
    largeur: yup
    .number()
    .typeError("Largeur must be a number")
    .positive("Largeur must be a positive number")
    .required("Largeur is required"),
  longeur: yup
    .number()
    .typeError("Longueur must be a number")
    .positive("Longueur must be a positive number")
    .required("Longueur is required"),
  epaisseur: yup
    .number()
    .typeError("Épaisseur must be a number")
    .positive("Épaisseur must be a positive number")
    .required("Épaisseur is required"),
    nbpieces: yup
    .number()
    .typeError("Épaisseur must be a number")
    .positive("Épaisseur must be a positive number")
    .required("Épaisseur is required"),
});

const initialValues = {
  idproduit: "",
  nomproduit: "",
  prix: "",
  largeur: "",
  longeur: "",
  epaisseur: "",
  nbpieces: "",
};

export default Form;
