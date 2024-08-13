import React, { useState } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { getProductById, getProductByName } from '../../api/addStock';
import { useTheme } from '@mui/material';
import { tokens } from "../../theme";
import { generateExcel } from '../../components/ExcelGeneratorComponent'; // Update the import path if needed

const Commande = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [addedElements, setAddedElements] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setAddedElements([...addedElements, values]); // Add the form data to the list
      resetForm();
    } catch (error) {
      console.error('Error adding stock item:', error);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      // Generate the Excel file with the current list of added elements
      await generateExcel(addedElements);
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Ajouter un nouveau produit" subtitle="Ajouter un produit dans le stock" />
      <Box display="flex" flexDirection={isNonMobile ? 'row' : 'column'} gap="20px">
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
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit} style={{ flex: 1 }}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, 1fr)"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : 'span 2' },
                }}
              >
                <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Id produit"
                    onBlur={async (e) => {
                      await handleBlur(e);
                      const { value } = e.target;
                      if (value) {
                        try {
                          const product = await getProductById(value);
                          if (product) {
                            setFieldValue('nomproduit', product.nom);
                            setFieldValue('largeur', product.largeur);
                            setFieldValue('longeur', product.longeur);
                            setFieldValue('epaisseur', product.epaisseur);
                            setFieldValue('prix', product.prixunit);
                            
                          }
                        } catch (error) {
                          console.error('Error fetching product by ID:', error);
                        }
                      }
                    }}
                    onChange={handleChange}
                    value={values.idproduit}
                    name="idproduit"
                    error={!!touched.idproduit && !!errors.idproduit}
                    helperText={touched.idproduit && errors.idproduit}
                  />
                  <Typography align="center" sx={{ mt: 2, mx: 6 }}>
                    ou
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom produit"
                    onBlur={async (e) => {
                      await handleBlur(e);
                      const { value } = e.target;
                      if (value) {
                        try {
                          const product = await getProductByName(value);
                          if (product) {
                            setFieldValue('idproduit', product.idproduit);
                            setFieldValue('largeur', product.largeur);
                            setFieldValue('longeur', product.longeur);
                            setFieldValue('epaisseur', product.epaisseur);
                            setFieldValue('prix', product.prixunit);
                            
                          }
                        } catch (error) {
                          console.error('Error fetching product by name:', error);
                        }
                      }
                    }}
                    onChange={handleChange}
                    value={values.nomproduit}
                    name="nomproduit"
                    error={!!touched.nomproduit && !!errors.nomproduit}
                    helperText={touched.nomproduit && errors.nomproduit}
                  />
                </Box>

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
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Longueur"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.longeur}
                  name="longeur"
                  error={!!touched.longeur && !!errors.longeur}
                  helperText={touched.longeur && errors.longeur}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Épaisseur"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.epaisseur}
                  name="epaisseur"
                  error={!!touched.epaisseur && !!errors.epaisseur}
                  helperText={touched.epaisseur && errors.epaisseur}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Nombre de pièces"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nombrepieces}
                  name="nombrepieces"
                  error={!!touched.nombrepieces && !!errors.nombrepieces}
                  helperText={touched.nombrepieces && errors.nombrepieces}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Prix par métre carré"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.prix}
                  name="prix"
                  error={!!touched.prix && !!errors.prix}
                  helperText={touched.prix && errors.prix}
                  sx={{ gridColumn: 'span 2' }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Ajouter Article
                </Button>
              </Box>
            </form>
          )}
        </Formik>

        <Box
          flex={1}
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            height: '400px', // Set a fixed height
            overflowY: 'auto' // Enable vertical scrolling
          }}
        >
          <Typography variant="h6" gutterBottom>
            Liste des articles
          </Typography>
          <List>
            {addedElements.map((item, index) => (
              <Box key={index} sx={{ backgroundColor: colors.grey[600], borderRadius: '8px', mb: '8px', padding: '8px' }}>
                <ListItem>
                  <ListItemText
                    primary={`Nom: ${item.nomproduit} ____ Id: ${item.idproduit}`}
                    secondary={`Largeur: ${item.largeur}, Longueur: ${item.longeur}, Épaisseur: ${item.epaisseur}, Nombre de pièces: ${item.nombrepieces}, Prix: ${item.prix * (item.longeur * item.largeur) * item.nombrepieces} Dt`}
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          color="secondary"
          variant="contained"
          onClick={handleConfirmOrder}
        >
          Confirmer la commande
        </Button>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  idproduit: yup.string(),
  nomproduit: yup.string(),
  largeur: yup.number().typeError('Largeur must be a number').positive('Largeur must be a positive number').required("Largeur is required"),
  longeur: yup.number().typeError('Longueur must be a number').positive('Longueur must be a positive number').required("Longeur is required"),
  epaisseur: yup.number().typeError('Épaisseur must be a number').positive('Épaisseur must be a positive number').required("Épaisseur is required"),
  nombrepieces: yup.number().typeError('Nombre de pièces must be a number').positive('Nombre de pièces must be a positive number').integer('Nombre de pièces must be an integer').required("Nombre de pièces is required"),
  prix: yup.number().typeError('Prix must be a number').positive('Prix must be a positive number').required("Prix is required"),
});

const initialValues = {
  idproduit: '',
  nomproduit: '',
  largeur: '',
  longeur: '',
  epaisseur: '',
  nombrepieces: '',
  prix: '',
};

export default Commande;
