import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { tokens } from "../../theme";
import { updateStockIds, updateStockNamesById,updatelarById,updatelongById,updatePrixById,updateepById, updateNbById} from '../../api/updateId'; 
import axios from 'axios';
const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // State to hold stock data
    const [stockData, setStockData] = useState([]);
    // Fetch stock data from API endpoint
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/stock');
                if (response.ok) {
                    const data = await response.json();
                    setStockData(data);
                } else {
                    throw new Error('Failed to fetch stock data');
                }
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };
        fetchStockData();
    }, []);


    const handleRowUpdate = async (updatedRow, originalRow) => {
      if (updatedRow.idproduit !== originalRow.idproduit) {
          await updateStockIds(originalRow.idproduit, updatedRow.idproduit);
      }
      if (updatedRow.nom !== originalRow.nom) {
        await updateStockNamesById(originalRow.idproduit,updatedRow.nom );
      }
      if (updatedRow.prixunit !== originalRow.prixunit) {
          await updatePrixById(originalRow.idproduit,updatedRow.prixunit)
      }
      if (updatedRow.epaisseur !== originalRow.epaisseur) {
          await updateepById(originalRow.idproduit,updatedRow.epaisseur)
      }
      if (updatedRow.longuer !== originalRow.longuer) {
          await updatelongById(originalRow.idproduit,updatedRow.longuer)
      }
      if (updatedRow.largeur !== originalRow.largeur) {
          await updatelarById(originalRow.idproduit,updatedRow.largeur)
      }
      if (updatedRow.nbpieces !== originalRow.nbpieces) {
          await updatePrixById(originalRow.idproduit,updatedRow.nbpieces)
      }

      
      setStockData((prev) =>
          prev.map((row) => (row._id === updatedRow._id ? { ...row, ...updatedRow } : row))
      );
      try {
          const response = await axios.put(`http://localhost:3001/api/stock/${updatedRow._id}`, updatedRow);
          
          if (response.status !== 200) {
              throw new Error('Failed to update stock data');
          }
      } catch (error) {
          console.error('Error updating stock data:', error);
      }
      return updatedRow;
  };
    const columns = [
        { 
            field: 'idproduit',
            headerName: 'ID Produit',
            flex: 1,
            editable: true,
            cellClassName: "name-column--cell",
        },
        {   field: 'nom', 
            headerName: 'Nom', 
            flex: 1,
            editable: true,
        },
        {   field: 'prixunit', 
            headerName: 'Prix par m²', 
            type: 'number', 
            flex: 1,
            headerAlign: "left",
            align: "left",
            editable: true,
            renderCell: (params) => (
                <div style={{display: "flex",alignItems: "center",height: "100%",}}>
                  <Typography fontSize="20px">
                    {params.row.prixunit} DT
                  </Typography>
                </div>
              ),
        },
        {   
            field: 'largeur', 
            headerName: 'Largeur', 
            type: 'number', 
            flex: 1 , 
            editable: true,
            headerAlign: "left",
            align: "left",
            renderCell: (params) => (
                <div style={{display: "flex",alignItems: "center",height: "100%",}}>
                  <Typography fontSize="20px">
                    {params.row.largeur} cm
                  </Typography>
                </div>
              ),
        },
        {   
            field: 'longeur', 
            headerName: 'Longeur', 
            type: 'number', 
            flex: 1 , 
            editable: true,
            headerAlign: "left",
            align: "left",
            renderCell: (params) => (
                <div style={{display: "flex",alignItems: "center",height: "100%",}}>
                  <Typography fontSize="20px">
                    {params.row.longeur} cm
                  </Typography>
                </div>
              ),
        },
        { 
            field: 'epaisseur', 
            headerName: 'Épaisseur', 
            type: 'number', 
            flex: 1 ,
            editable: true,
            headerAlign: "left",
            align: "left",
            renderCell: (params) => (
                <div
                style={{display: "flex",alignItems: "center",height: "100%",}}>
                  <Typography color={colors.greenAccent[500]} fontSize="20px">
                    {params.row.epaisseur} cm
                  </Typography>
                </div>
              ),
        },
        { 
            field: 'nbpieces', 
            headerName: 'Nombre des piéces', 
            type: 'number', 
            flex: 1 ,
            
            headerAlign: "left",
            align: "left",
            editable: true
        }
    ];
    return (
        <Box m="20px"
        width="75vw"
        maxWidth="90vw"
        sx={{
            "& .MuiDataGrid-root": {border: "none",},
            "& .MuiDataGrid-cell": {borderBottom: "none",fontSize:"20px",},
            "& .name-column--cell": {color: colors.greenAccent[300],fontSize:"20px",},
            "& .MuiDataGrid-columnHeaders": {backgroundColor: colors.blueAccent[700],borderBottom: "none",fontSize:"15px",},
            "& .MuiDataGrid-virtualScroller": {backgroundColor: colors.primary[400],},
            "& .MuiDataGrid-footerContainer": {borderTop: "none",backgroundColor: colors.blueAccent[700],},
            "& .MuiCheckbox-root": {color: `${colors.greenAccent[200]} !important`,},
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {color: `${colors.grey[100]} !important`,},
          }}>
            <Header
                title="Stock"
                subtitle="Liste des Atricles dans le stock"/>
            <Box
                m="40px 0 0 0"
                height="75vh">
                <DataGrid
                    rows={stockData}
                    columns={columns}
                    getRowId={(row) => row._id}  // Specify _id as the id field
                    components={{ Toolbar: GridToolbar }}
                    processRowUpdate={handleRowUpdate} 
                    autoHeight
                    autoWidth
                    />
            </Box>
        </Box>
    );
};
export default Contacts;