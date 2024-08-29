import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, Autocomplete, IconButton } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {fetchProduct} from '../../api/fetchProducts';
import { useTheme } from '@mui/material';
import { tokens } from "../../theme";

import { generateExcel } from '../../components/ExcelGeneratorComponent';
import { GeneratedExcelBL } from '../../components/ExcelGeneratorComponentBL';
import { generateExcelfact } from '../../components/ExcelGenratorComponentFACT';
import {incrementDevisByYear,getDevisByYear} from '../../api/devis';

const checkoutSchema = yup.object().shape({
  idproduit: yup.string(),
  nomproduit: yup.string(),
  largeur: yup.number().typeError('Largeur must be a number').positive('Largeur must be a positive number').required("Largeur is required"),
  longeur: yup.number().typeError('Longueur must be a number').positive('Longueur must be a positive number').required("Longeur is required"),
  epaisseur: yup.number().typeError('Épaisseur must be a number').positive('Épaisseur must be a positive number').required("Épaisseur is required"),
  nombrepieces: yup.number().typeError('Le nombre de pièces doit être un nombre').positive('Le nombre de pièces doit être un nombre positif').integer('Le nombre de pièces doit être un entier').required("Le nombre de pièces est requis"),
  prix: yup.number().typeError('Prix must be a number').positive('Prix must be a positive number').required("Prix is required"),
  surface: yup.number().typeError("Surface doit être un nombre").positive("Surface doit être un nombre positif").required("Surface est requise"),
});
const initialValues = {
  idproduit: '',
  nomproduit: '',
  largeur: '',
  longeur: '',
  epaisseur: '',
  nombrepieces: '',
  prix: '',
  surface: '',
  prixPlaque: '',
};
 
const Facture = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [addedElements, setAddedElements] = useState([]);
  const [clientName, setClientName] = useState('');
  const [clientAdresse, setClientAdresse] = useState('');
  const [clientMF_Cin, setClientMF_Cin] = useState('');
  var [inputValue, setInputValue] = useState('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [products, setProducts] = useState([]);
  const [choixDBF, setchoixDBF] = useState('D');
  
  const [devisCompteur, setDevisCompteur] = useState('');
  const [buttonColor, setButtonColor] = useState('primary');
  const [buttonColor2, setButtonColor2] = useState('primary');
  const [buttonColor3, setButtonColor3] = useState('primary');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentYear = new Date().getFullYear();
  const yearString = currentYear.toString();

  const [itemsPerPage, setitemsPerPage] = useState(8);
  const [startIndex, setstartIndex] = useState(0);
  const [endIndex, setendIndex] = useState(7);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedElements, setdisplayedElements] = useState(addedElements.slice(startIndex, endIndex));
  
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < addedElements.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
      try {
        setstartIndex(currentPage * itemsPerPage);
        setendIndex(startIndex + itemsPerPage);
        setdisplayedElements(addedElements.slice(startIndex, endIndex));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
  }, [currentPage,startIndex,itemsPerPage,addedElements,endIndex]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const document = await getDevisByYear(yearString);
        setDevisCompteur(document.deviscompteur);

        const result = await fetchProduct();
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    if (choixDBF === 'D') {
      setButtonColor('secondary');
      setButtonColor2('primary');
      setButtonColor3('primary');
      setitemsPerPage(8)
    }
    if (choixDBF === 'B') {
      setButtonColor('primary');
      setButtonColor2('secondary');
      setButtonColor3('primary');
      setitemsPerPage(27)
    }
    if (choixDBF === 'F') {
      setButtonColor('primary');
      setButtonColor2('primary');
      setButtonColor3('secondary');
      setitemsPerPage(11)
    }
  }, [choixDBF]);
  
  
  const handleFormSubmit = async (values, { resetForm ,setFieldValue,inputValue }) => {
    try {
      setAddedElements([...addedElements, values]);
      setInputValue('')
      resetForm();
    } catch (error) {
      console.error('Error adding stock item:', error);
    }
  };
  const handleDeleteItem = (index) => {
    setAddedElements(addedElements.filter((item, i) => i !== index));
  };
  const validateForm = (values) => {
    const errors = {};
  
    if (!values.largeur || isNaN(values.largeur) || values.largeur <= 0) {
      errors.largeur = 'Largeur must be a positive number';
    }
    if (!values.longeur || isNaN(values.longeur) || values.longeur <= 0) {
      errors.longeur = 'Longueur must be a positive number';
    }
    if (!values.epaisseur || isNaN(values.epaisseur) || values.epaisseur <= 0) {
      errors.epaisseur = 'Épaisseur must be a positive number';
    }
    if (!values.nombrepieces || isNaN(values.nombrepieces) || values.nombrepieces <= 0) {
      errors.nombrepieces = 'Le nombre de pièces doit être un nombre positif';
    }
    if (!values.prix || isNaN(values.prix) || values.prix <= 0) {
      errors.prix = 'Prix must be a positive number';
    }
    if (!values.surface || isNaN(values.surface) || values.surface <= 0) {
      errors.surface = 'Surface must be a positive number';
    }
  
    return errors;
  };
  const handleConfirmOrder = async (values) => {
    try {
      if((addedElements.length!==0)&&(clientName)&&(orderDate)){
        if(choixDBF==='D'){
          await incrementDevisByYear(yearString);
          await generateExcel(displayedElements,clientName,orderDate,devisCompteur,currentYear);
          setClientName('');
        }
        if((choixDBF==='B')&&(clientMF_Cin)&&(clientAdresse)){
          await GeneratedExcelBL(displayedElements,clientName,clientMF_Cin,clientAdresse,orderDate );
          setClientAdresse('')
          setClientMF_Cin('')
          setClientName('');
        }
        if(choixDBF==='F'){
          await generateExcelfact(displayedElements,clientName,orderDate );
          setClientName('');
        }
      }
      
    } catch (error) {
      console.error('Error generating Excel file:', error);
      if (error.name === 'ValidationError') {
        console.error('Validation errors:', error.errors);
      } 
    }
  };
  const calculateSurface = (longeur, largeur) => {
    return (parseFloat(longeur/ 100) ) * (parseFloat(largeur/ 100) );
  };
  const calculatePrixPlaque = (surface, prixUnit) => {
    return parseFloat(surface) * parseFloat(prixUnit);
  };
  return (
    <Box m="0 20px">
      <Header title="Devis / Bon livraison / Facture" />
      <Box gap={"20px"}
      sx={{display:"flex"}}
      >
      <Button color={buttonColor} variant="contained" onClick={() => setchoixDBF('D')}
        sx={{width:"250px", height:"40px", marginBottom:"30px",
          fontWeight: "600",
          }}>
          Préparer un devis
        </Button>
        <Button color={buttonColor2} variant="contained" onClick={() => setchoixDBF('B')}
        sx={{width:"300px", height:"40px", marginBottom:"30px",
          fontWeight: "600",
          }}>
          Préparer un bon de livraison
        </Button>
        <Button color={buttonColor3} variant="contained" onClick={() => setchoixDBF('F')}
        sx={{width:"250px", height:"40px", marginBottom:"30px",
          fontWeight: "600",
          }}>
          Préparer une facture
        </Button>



      </Box>
      <Box display="flex" flexDirection={isNonMobile ? 'row' : 'column'} gap="20px">
        <Formik  onSubmit={handleFormSubmit}  initialValues={initialValues}  validationSchema={checkoutSchema}>
          {({values,errors,touched,handleBlur,handleChange,handleSubmit,setFieldValue,resetForm}) => (
            <form onSubmit={handleSubmit} style={{ flex: 1 }}>
              <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, 1fr)"
                sx={{"& > div": { gridColumn: isNonMobile ? undefined : 'span 2' },}}>
                <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center' }}>
                <Autocomplete fullWidth
                  freeSolo
                  inputValue={inputValue}
                  options={products}
                  getOptionLabel={(option) => option.idproduit}
                  onChange={(event, newValue) => {
                    setInputValue(newValue?newValue.idproduit:'' );
                    if (newValue) {
                      setFieldValue('idproduit', newValue.idproduit);
                      setInputValue(newValue.idproduit);
                      setFieldValue('nomproduit', newValue.nom);
                      setFieldValue('largeur', newValue.largeur);
                      setFieldValue('longeur', newValue.longeur);
                      setFieldValue('epaisseur', newValue.epaisseur);
                      setFieldValue('prix', newValue.prixunit);
                      setFieldValue('nombrepieces', newValue.nbpieces);

                      // Calculate surface when product is selected
                      const largeurValue = parseInt(newValue.largeur);
                      const longeurValue = parseInt(newValue.longeur);
                      const surfaceValue = calculateSurface(largeurValue, longeurValue);
                      setFieldValue('surface', surfaceValue);
                      // Calculate price of one plaque
                      const prixValue = parseFloat(newValue.prixunit) || 0;
                      const prixPlaque = calculatePrixPlaque(surfaceValue, parseFloat(prixValue) || 0);
                      setFieldValue('prixPlaque', prixPlaque.toFixed(3) + 'DT');
                    }
                    else {
                      setFieldValue('idproduit', '');
                      setInputValue('');
                    }
                  }}
                  onInputChange={(event, newInputValue,reason) => {
                    setInputValue(newInputValue)  ;
                    setFieldValue('idproduit', newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="idproduit"
                      label="Id produit"
                      variant="outlined"
                      onBlur={handleBlur}
                      error={!!touched.idproduit && !!errors.idproduit}
                      helperText={touched.idproduit && errors.idproduit}
                      fullWidth
                      sx={{ width:"500px",
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
                  )}
                />
                </Box>
                <TextField fullWidth
                  autoComplete="off"
                  variant="filled"
                  type="text"
                  label="Nom produit"
                  onChange={handleChange}
                  value={values.nomproduit}
                  name="nomproduit"
                  error={!!touched.nomproduit && !!errors.nomproduit}
                  helperText={touched.nomproduit && errors.nomproduit}
                  sx={{ gridColumn: 'span 2',width:"500px",
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

                <TextField autoComplete='off' variant="filled" type="text"
                  label="Largeur" onBlur={handleBlur} 
                  //onChange={handleChange} 
                  onChange={(e) => {
                    handleChange(e);
                    const largeurValue = parseFloat(e.target.value) || 0;
                    const longeurValue = parseFloat(values.longeur) || 0;
                    const surfaceValue = calculateSurface(longeurValue, largeurValue);
                    setFieldValue('surface', surfaceValue.toFixed(3));
                    values.surface = surfaceValue
                    const prixPlaque = calculatePrixPlaque(values.surface, values.prix || 0);
                    values.prixPlaque = prixPlaque;
                    setFieldValue('prixPlaque', values.prixPlaque + 'DT');

                  }}
                  value={values.largeur} name="largeur"
                  error={!!touched.largeur && !!errors.largeur} helperText={touched.largeur && errors.largeur}
                  sx={{ marginRight: "10px", width:"230px",
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
                <TextField autoComplete='off'  variant="filled"
                  type="text" label="longeur" onBlur={handleBlur} 
                  //onChange={handleChange}
                  onChange={(e) => {
                    handleChange(e);
                    const largeurValue = parseFloat(values.largeur) || 0;
                    const longeurValue = parseFloat(e.target.value) || 0;
                    const surfaceValue = calculateSurface(longeurValue, largeurValue);
                    setFieldValue('surface', surfaceValue.toFixed(3));
                    values.surface = surfaceValue
                    const prixPlaque = calculatePrixPlaque(values.surface, values.prix || 0);
                    values.prixPlaque = prixPlaque;
                    setFieldValue('prixPlaque', values.prixPlaque + 'DT');
                  }}
                  value={values.longeur} name="longeur" 
                  error={!!touched.longeur && !!errors.longeur} helperText={touched.longeur && errors.longeur}
                  sx={{ width:"230px",
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

                <TextField autoComplete='off'  variant="filled" type="text"
                  label="Épaisseur" onBlur={handleBlur} onChange={handleChange} 
                  value={values.epaisseur} name="epaisseur"
                  error={!!touched.epaisseur && !!errors.epaisseur}
                  helperText={touched.epaisseur && errors.epaisseur}
                  sx={{width:"230px" ,
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
                
                <TextField autoComplete='off'  variant="filled" type="text"
                  label="Nombre de pièces" onBlur={handleBlur}
                  onChange={handleChange} 
                  value={values.nombrepieces}
                  name="nombrepieces" error={!!touched.nombrepieces && !!errors.nombrepieces}
                  helperText={touched.nombrepieces && errors.nombrepieces} 
                  sx={{width:"230px" ,
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

                <TextField autoComplete='off' fullWidth variant="filled"
                  type="text" label="Prix par métre carré"
                  onBlur={handleBlur}
                  //onChange={handleChange}
                  onChange={(e) => {
                    handleChange(e);
                    
                    const prix = parseFloat(e.target.value);
                    values.prix = parseFloat(e.target.value);
                    const prixPlaque = calculatePrixPlaque(values.surface, prix || 0);
                    

                    values.prixPlaque = prixPlaque;
                    setFieldValue('prixPlaque', prixPlaque.toFixed(3) + 'DT');
                  }}
                  value={values.prix} name="prix" 
                  error={!!touched.prix && !!errors.prix}
                  helperText={touched.prix && errors.prix}
                  sx={{ gridColumn: 'span 2',width:"500px" ,
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
                  onChange={(e) => {
                    console.log("surface:", values.surface);
                    handleChange(e);
                    const prix = parseFloat(values.prix)
                    const prixPlaque = calculatePrixPlaque(values.surface, prix || 0);
                    values.prixPlaque = prixPlaque;
                    setFieldValue('prixPlaque', prix + 'DT'); 
                  }}
                  label="Surface d'une plaque m²"
                  value={values.surface}
                  name="surface"
                  //InputProps={{ readOnly: true }}
                  sx={{ gridColumn: 'span 2',width:"500px" ,
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
                  label="Prix d'une plaque (Dt)"
                  value={values.prixPlaque}
                  name="prixPlaque"
                  //InputProps={{ readOnly: true }}
                  sx={{ gridColumn: 'span 2',width:"500px" ,
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
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained"
                  sx={{fontWeight: "600",letterSpacing :".05em",fontSize : "18px",
                       ":hover":{color:"white",backgroundColor:"#0D7C66"}}}>
                      Ajouter Article
                </Button>
                <Button type="button" color="secondary" variant="outlined"
                sx={{border: '1px solid #ccc', borderRadius: '8px', marginLeft: '16px',
                  fontWeight: "600",
                letterSpacing :".05em",
                fontSize : "18px",
                ":hover":{
                  color:"white",
                  backgroundColor:"#0D7C66"
                }
                }}
                onClick={resetForm}>Réinitialiser</Button>
              </Box>
            </form>
          )}
        </Formik>
        
        <Box flex={4} sx={{ border: '1px solid #ccc',  borderRadius: '8px',  padding: '16px',  height: '500px', }}>
        <Box display="flex" gap={"10px"} alignSelf={"flex-end"} mt={2}
       sx={{
        justifyContent: "flex-end",
      }}
        >
        <Button
          variant="contained"
          color='secondary'
          startIcon={<ArrowBackIcon />}
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Précedent
        </Button>
        <Button
          variant="contained"
          color='secondary'
          onClick={handleNextPage}
          endIcon={<ArrowForwardIcon />}
          disabled={(currentPage + 1) * itemsPerPage >= addedElements.length}
        >
          Suivant
        </Button>
      </Box>
          <Typography variant="h3" fontWeight={800}  gutterBottom>
            Liste des articles ({itemsPerPage} par page)
          </Typography>
          <Typography variant="h4" fontWeight={500} color={colors.greenAccent[300]} gutterBottom>
          {`nombre des articles ajoutés : ${addedElements.length}`}
          </Typography>
          <List 
            sx={{
              overflow: "auto",
              maxHeight: '350px',
            }}>
          {displayedElements.map((item, index) => (
            <Box 
              key={index} 
              sx={{ 
                backgroundColor: colors.grey[900], 
                borderRadius: '8px', 
                mb: '8px',  
              }}>
              <ListItem>
                <ListItemText
                  primary={`Nom: ${item.nomproduit} ____ Id: ${item.idproduit}`}
                  secondary={`Largeur: ${item.largeur}, Longueur: ${item.longeur}, 
                    Épaisseur: ${item.epaisseur}, Nombre de pièces: ${item.nombrepieces},
                    Prix: ${(parseFloat(item.prixPlaque) * parseInt(item.nombrepieces)).toFixed(3)} Dt`}
                />
                <IconButton aria-label="delete" onClick={() => handleDeleteItem(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </Box>
          ))}
        </List>
        
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end" mt="-125px" gap="16px">
        <Box display="flex" gap="10px">
          <TextField
            autoComplete="off"
            variant="filled"
            label="Nom Client"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            sx={{ backgroundColor: colors.grey[900], width:"250px",
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
              '& .MuiInputLabel-root': {fontSize: '1.2rem',color: 'secondary',},
              '& .MuiInputLabel-root.Mui-focused': {fontSize: '1rem',color: '#0D7C66',},
            }}
          />
          {choixDBF==='B'&&(
            <TextField
            autoComplete="off"
            variant="filled"
            label="Adresse"
            value={clientAdresse}
            onChange={(e) => setClientAdresse(e.target.value)}
            sx={{ backgroundColor: colors.grey[900], width:"250px",
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
              '& .MuiInputLabel-root': {fontSize: '1.2rem',color: 'secondary',},
              '& .MuiInputLabel-root.Mui-focused': {fontSize: '1rem',color: '#0D7C66',}
            }}
          />
          )}

          {choixDBF==='B'&&(<TextField
            autoComplete="off"
            variant="filled"
            label="MF / Cin"
            value={clientMF_Cin}
            onChange={(e) => setClientMF_Cin(e.target.value)}
            sx={{ backgroundColor: colors.grey[900], width:"250px",
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
              '& .MuiInputLabel-root': {fontSize: '1.2rem',color: 'secondary',},
              '& .MuiInputLabel-root.Mui-focused': {fontSize: '1rem',color: '#0D7C66',}
            }}
          />)}
          

          <TextField
            autoComplete="off"
            variant="filled"
            type="date"
            label="Date de Commande"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ backgroundColor: colors.grey[900], width:"250px",
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
              '& .MuiInputLabel-root': {fontSize: '1.2rem',color: 'secondary',},
              '& .MuiInputLabel-root.Mui-focused': {fontSize: '1rem',color: '#0D7C66',},
            }}
          />
        </Box>
        <Button color="secondary" variant="contained" onClick={handleConfirmOrder}
        sx={{width:"250px", height:"40px", marginBottom:"30px",
          fontWeight: "600",
          fontSize : "15px",
          ":hover":{
            color:"white",
            backgroundColor:"#0D7C66"
          }}}>
          Confirmer la commande
        </Button>
      </Box>
    </Box>
  );
};

export default Facture;