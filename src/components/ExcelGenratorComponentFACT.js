// excelGenerator.js

import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export const generateExcelfact = async (data, nom, date) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // Add top image

  // Replace with the actual path

  const imageSrc = '../assets/img1.jpg';
  const response = await fetch(imageSrc);
  const buffer1 = await response.arrayBuffer();
  let logo = workbook.addImage({
    buffer: buffer1,
    extension: 'jpeg',
  });
  worksheet.addImage(logo, {
    br: { col: 3.4, row: 4 },
    tl: { col: 1.9, row: 0 },  // Top image position
    ext: { width: 200, height: 100 },
  });

  console.log("hie");
  const imageSrc2 = '../assets/img2.png';
  const response2 = await fetch(imageSrc2);
  const buffer2 = await response2.arrayBuffer();
  let logo2 = workbook.addImage({
    buffer: buffer2,
    extension: 'png',
  });
  worksheet.addImage(logo2, {
    tl: { col: 1, row: 5 },
    ext: { width: 250, height: 150 },
  });


  // Add bottom image

  // Add an empty column (A) before the table
  worksheet.getCell('A1').value = '';

  // Add text "Client : " at cell D10 and "Devis N°/ : " at cell D8
  worksheet.getCell('D6').value = `Date : ${date}`;
  worksheet.getCell('D8').value = 'Client : ';
  worksheet.getCell('E8').value = nom;
  worksheet.getCell('E8').border = {
    top: { style: null },
    left: { style: null },
    bottom: { style: null },
    right: { style: null },
  };

  // Add table headers starting from column B and row 12
  worksheet.addRow([]);
  worksheet.addRow([]);
  worksheet.addRow([]);

  const headerRow = worksheet.addRow(['', 'DESIGNATION', 'Qte', 'Unité', 'PRIX U', 'PRIX T']);
  var metrage=0;
  // Add data rows dynamically
  data.forEach(item => {
    metrage=(((item.longeur/100)*(item.largeur/100))*item.nombrepieces);
    worksheet.addRow([
      '',
      `${item.nomproduit} ${item.nombrepieces}pc(${item.longeur}x${item.largeur})`,
      metrage,
      'm²',
      item.prix,
      item.prix * ((item.longeur / 100) * (item.largeur / 100)) * item.nombrepieces
    ]);
  });

  // Adjust column widths to specified values
  worksheet.columns = [
    { key: 'empty', width: 5 }, // Empty column A
    { key: 'designation', width: 38.43 }, // DESIGNATION (Column B)
    { key: 'qte', width: 10.71 },        // Qte
    { key: 'unite', width: 10.71 },      // Unité
    { key: 'prix_u', width: 13.86 },     // PRIX U
    { key: 'prix_t', width: 15.71 },     // PRIX T
  ];

  // Set row height for all rows
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    row.height = 24.75;
  });

  // Add color to the header row
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'DCE6F2' }, // Header line color
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Add borders to all rows
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });
  worksheet.mergeCells('B24:E24');
  worksheet.getCell('B24').value = "Total";
  worksheet.getCell('B24').border = {
    top: { style: null },
    left: { style: null },
    bottom: { style: null },
    right: { style: null },
  };
  worksheet.mergeCells('E27:F27');
  worksheet.getCell('E27').value = "Signature et Cachet";
  worksheet.getCell('E27').alignment = {
    horizontal: 'Left', // Center horizontally
     // Center vertically
  };
  worksheet.mergeCells('B34:F34');
  const mergedCell = worksheet.getCell('B34');
  mergedCell.value = 'Merci de Votre Confiance';
  mergedCell.alignment = {
    horizontal: 'center', // Center horizontally
    vertical: 'middle'   // Center vertically
  };
  mergedCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'DCE6F2' }, // Set the color
  };
  worksheet.mergeCells('B33:F33');
  const mergedCell2 = worksheet.getCell('B33');
  mergedCell2.value = '**** tel:(+216) 98717058///20733414    e-mail: marbrerie.hammami@gmail.com  ';
  mergedCell2.alignment = {
    horizontal: 'center', // Center horizontally
    vertical: 'middle'   // Center vertically
  };
  worksheet.mergeCells('B32:F32');
  const mergedCell3 = worksheet.getCell('B32');
  mergedCell3.value = 'siège social: sidi hsine sedjoumi -Tunis ( à coté de visite technique) ';
  mergedCell3.alignment = {
    horizontal: 'center', // Center horizontally
    vertical: 'middle'   // Center vertically
  };

  
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    const cell = row.getCell(1); // Column A is index 1
    cell.border = {
      top: { style: null },
      left: { style: null },
      bottom: { style: null },
      right: { style: null },
    }; // Remove borders
    cell.fill = {
      type: 'pattern',
      pattern: 'none'
    }; // Remove fill
    // Remove protection
  });
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    // Only apply styles to rows from 13 to 24
    if (rowNumber >= 13 && rowNumber <= 24) {
      // Define the columns that need styling (columns 2, 3, and 4)
      const columnsToStyle = [2, 3, 4,5,6];
  
      columnsToStyle.forEach((colIndex) => {
        const cell = row.getCell(colIndex);
        
        // Apply border styles to each cell
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
  
        // Remove fill patterns for each cell
        cell.fill = {
          type: 'pattern',
          pattern: 'none',
        };
      });
    }
  });
  worksheet.getColumn('E').numFmt = '#,##0.000 ".د.ت"';
  worksheet.getColumn('F').numFmt = '#,##0.000 ".د.ت"';
  const CL1 = worksheet.getCell('D6');
  const CL2 = worksheet.getCell('D8');
  CL1.border = {
    top: { style: null },
    left: { style: null },
    bottom: { style: null },
    right: { style: null },
  };
  CL2.border = {
    top: { style: null },
    left: { style: null },
    bottom: { style: null },
    right: { style: null },
  };
  worksheet.getCell('E8').border = {
    top: { style: null },
    left: { style: null },
    bottom: { style: null },
    right: { style: null },
  };
  worksheet.getCell('F24').value = { formula: 'SUM(F13:F23)' };

  worksheet.pageSetup.margins = {
    left: 0.25,
    right: 0.25,    
    top: 0.75,
    bottom: 0.75,
    header: 0.3,
    footer: 0.3
};
 
  // Create a blob from the workbook and save it
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'generated_excel.xlsx');
};