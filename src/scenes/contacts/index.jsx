import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { tokens } from "../../theme";
import { updateStockIdsByName, updateStockNamesById,updatePrixById, updateNbById} from '../../api/updateId'; 
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
                const response = await fetch('http://localhost:3001/api/stock'); // Ensure the correct endpoint
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
        
          await updateStockIdsByName(originalRow.nom, updatedRow.idproduit);
      }
      if (updatedRow.nom !== originalRow.nom) {
        await updateStockNamesById(originalRow.idproduit,updatedRow.nom );
        
        
    }
    if (updatedRow.prixunit !== originalRow.prixunit) {
        await updatePrixById(originalRow.idproduit,updatedRow.prixunit)
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
        { field: 'idproduit', headerName: 'ID Produit', flex: 1,editable: true },
        { field: 'nom', headerName: 'Nom', flex: 1,cellClassName: "name-column--cell",editable: true },
        { field: 'prixunit', headerName: 'Prix Unité', type: 'number', flex: 1,headerAlign: "left",
            align: "left",editable: true },
        { field: 'largeur', headerName: 'Largeur', type: 'number', flex: 1 , headerAlign: "left",
            align: "left",},
        { field: 'longeur', headerName: 'Longeur', type: 'number', flex: 1 , headerAlign: "left",
            align: "left"},  // Fixed typo
        { field: 'epaisseur', headerName: 'Épaisseur', type: 'number', flex: 1 ,headerAlign: "left",
            align: "left"},
        { field: 'nbpieces', headerName: 'Nombre des piéces', type: 'number', flex: 1 ,headerAlign: "left",
          align: "left",editable: true}
    ];

    return (
        <Box m="20px"
        sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}>
            <Header
                title="Stock"
                subtitle="Liste des Atricles dans le stock"
            />
            <Box
                m="40px 0 0 0"
                height="75vh"
            >
                <DataGrid
                    rows={stockData}
                    columns={columns}
                    getRowId={(row) => row._id}  // Specify _id as the id field
                    components={{ Toolbar: GridToolbar }}
                    processRowUpdate={handleRowUpdate}
                    
                />
            </Box>
        </Box>
    );
};

export default Contacts;