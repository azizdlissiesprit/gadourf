import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from '@mui/material';
import Header from "../../components/Header";
import { addStock } from '../../api/addStock'; 
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const result = await addStock(values);  
      resetForm();
      console.log('Stock item added successfully:', result);
    } catch (error) {
      console.error('Error adding stock item:', error);
    }
  };
  return (
    <Box m="0 20px">
      <Header title="Ajouter un nouvau produit" subtitle="ajouter un produit dans le stock" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue,resetForm}) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(1, 1fr)"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                autoComplete='off'
                fullWidth
                //variant="filled"
                type="text"
                label="ID Produit"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idproduit}
                name="idproduit"
                error={!!touched.idproduit && !!errors.idproduit}
                helperText={touched.idproduit && errors.idproduit}
                sx={{
                  gridColumn: "span 4",
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.2rem',
                    color: 'secondary',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    fontSize: '1rem',
                    color: '#0D7C66',
                  },
                  
                }}
              />
              <TextField
                autoComplete='off'
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
                sx={{ gridColumn: "span 4",
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.2rem',
                    color: 'secondary',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    fontSize: '1rem',
                    color: '#0D7C66',
                  },
                }}
              />
              <TextField autoComplete='off'
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
                sx={{ gridColumn: "span 4" ,
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.2rem',
                    color: 'secondary',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    fontSize: '1rem',
                    color: '#0D7C66',
                  },
                }}
              />
              <Box sx={{
                display: "flex",
                gridColumn : "span 4",
                gap:"16px",
                //flexDirection:"column"
              }}>
                <TextField
                  autoComplete='off'
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Largeur (cm)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.largeur}
                  name="largeur"
                  error={!!touched.largeur && !!errors.largeur}
                  helperText={touched.largeur && errors.largeur}
                  sx={{ 
                        '& .MuiInputBase-input': { fontSize: '1.2rem' },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.2rem',
                    color: 'secondary',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    fontSize: '1rem',
                    color: '#0D7C66',
                  },
                   }}
                />
                <TextField
                  autoComplete='off'
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Longeur (cm)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.longeur}
                  name="longeur"
                  error={!!touched.longeur && !!errors.longeur}
                  helperText={touched.longeur && errors.longeur}
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '1.2rem' },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.2rem',
                    color: 'secondary',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    fontSize: '1rem',
                    color: '#0D7C66',
                  },
                   }}
                />
                <TextField
                autoComplete='off'
                fullWidth
                variant="filled"
                type="text"
                label="Epaisseur (cm)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.epaisseur}
                name="epaisseur"
                error={!!touched.epaisseur && !!errors.epaisseur}
                helperText={touched.epaisseur && errors.epaisseur}
                sx={{//gridColumn: "span 4", marginLeft: "20px",
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.2rem',
                    color: 'secondary',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    fontSize: '1rem',
                    color: '#0D7C66',
                  },
                 }}
              />
              </Box>
              
              <TextField
                autoComplete='off'
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
                sx={{ gridColumn: "span 4",
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.2rem',
                    color: 'secondary',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    fontSize: '1rem',
                    color: '#0D7C66',
                  },
                 }}
              />
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained"
              sx={{ 
                fontWeight: "600",
                letterSpacing :".05em",
                fontSize : "18px",
                ":hover":{
                    color:"white",
                    backgroundColor:"#0D7C66"
                  }
              }}>
                Ajouter au stock
              </Button>

              <Button 
                type="button"
                color="secondary" 
                variant="outlined"
                sx={{ marginLeft: "20px",
                  fontWeight: "600",
                  letterSpacing :".05em",
                  fontSize : "18px", 
                  ":hover":{
                    color:"white",
                    backgroundColor:"#0D7C66"
                  }
                }}
                onClick={() => {
                  resetForm({ values: initialValues });
                }}>
                Réinitialiser
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
const checkoutSchema = yup.object().shape({
  idproduit: yup.string().required("required"),
  nomproduit: yup.string().required("required"),
  prix: yup
    .number()
    .typeError("Prix doit être un nombre")
    .positive("Prix doit être un nombre positif")
    .required("Entrer le prix"),
    largeur: yup
    .number()
    .typeError("Largeur doit être un nombre")
    .positive("Largeur doit être un nombre positif")
    .required("Entrer le Largeur"),
  longeur: yup
    .number()
    .typeError("Longueur doit être un nombre")
    .positive("Longueur doit être un nombre positif")
    .required("Entrer le Longueur"),
  epaisseur: yup
    .number()
    .typeError("Épaisseur doit être un nombre")
    .positive("Épaisseur doit être un nombre positif")
    .required("Entrer l'Épaisseur"),
    nbpieces: yup
    .number()
    .typeError("Nombre de piéces doit être un nombre")
    .positive("Nombre de piéces doit être un nombre positif")
    .required("Entrer le nombre de piéces"),
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