import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export const GeneratedExcelBL = async (data,nom, cinmf, adresse, date,longeur,largeur) => {


    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Function to convert image file to base64


    // Add top image if uploaded
    const imageSrc = '../assets/img1.jpg';
    const response = await fetch(imageSrc);
    const buffer1 = await response.arrayBuffer();
    let logo = workbook.addImage({
        buffer: buffer1,
        extension: 'jpeg',
    });
    worksheet.addImage(logo, {
        br: { col: 5, row: 4 },
        tl: { col: 3, row: 0 },  // Top image position
        ext: { width: 200, height: 100 },
    });
    worksheet.columns = [
        { key: 'a', width: 1 }, // Empty column A
        { key: 'b', width: 11 }, // DESIGNATION (Column B)
        { key: 'c', width: 28 },        // Qte
        { key: 'd', width: 13.00 },      // Unité
        { key: 'e', width: 13.00 },     // PRIX U
        { key: 'f', width: 13 },
        { key: 'g', width: 13 },
        { key: 'h', width: 0.43 }     // PRIX T
    ];
    console.log("hi");
    worksheet.pageSetup.margins = {
        left: 0.31,
        right: 0.35,
        top: 0.35,
        bottom: 0.16,
        header: 0.3,
        footer: 0.3
    };
    worksheet.getRow(1).height = 15;
    worksheet.getRow(40).height = 15;
    worksheet.getRow(41).height = 26.25;
    worksheet.getRow(42).height = 29.25;
    worksheet.getRow(2).height = 15;
    worksheet.getRow(3).height = 15;
    worksheet.getRow(39).height = 9.75
    worksheet.getRow(4).height = 20.25;
    worksheet.getRow(9).height = 24;
    worksheet.getRow(10).height = 15;
    worksheet.getRow(11).height = 15;
    worksheet.mergeCells('A4:C4');
    worksheet.mergeCells('B5:C5');
    worksheet.mergeCells('B6:C6');
    worksheet.mergeCells('B7:C7');
    worksheet.mergeCells('B8:C8');
    worksheet.mergeCells('F2:G3');
    worksheet.mergeCells('D6:E8');
    worksheet.mergeCells('F5:G5');
    worksheet.mergeCells('F7:G7');
    worksheet.mergeCells('F8:G8');
    worksheet.mergeCells('D9:F9');
    worksheet.mergeCells('B10:C11');
    worksheet.mergeCells('D10:D11');
    worksheet.mergeCells('E10:E11');

    const cellPU = worksheet.getCell('F10');
    cellPU.value = "prix U";
    cellPU.font = {
        name: 'Calibri', size: 15, color: { argb: 'ffffff' }   // Set font family
    };
    cellPU.alignment = { horizontal: 'center' };
    cellPU.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '16365c' }, // Header line color
    };
    worksheet.getCell('B10').border = {
        left: { style: 'thin' },

    };
    worksheet.getCell('G10').border = {
        right: { style: 'thin' },

    };
    worksheet.getCell('G11').border = {
        right: { style: 'thin' },

    };
    const cellPt = worksheet.getCell('G10');
    cellPt.value = "montant T";
    cellPt.font = {
        name: 'Calibri', size: 15, color: { argb: 'ffffff' }   // Set font family
    };
    cellPt.alignment = { horizontal: 'center' };
    cellPt.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '16365c' }, // Header line color
    };
    const cellHT1 = worksheet.getCell('F11');
    cellHT1.value = "HTVA";
    cellHT1.font = {
        name: 'Calibri', size: 15, color: { argb: 'ffffff' }   // Set font family
    };
    cellHT1.alignment = { horizontal: 'center' };
    cellHT1.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '16365c' }, // Header line color
    };
    const cellHT2 = worksheet.getCell('G11');
    cellHT2.value = "HTVA";
    cellHT2.font = {
        name: 'Calibri', size: 15, color: { argb: 'ffffff' }   // Set font family
    };
    cellHT2.alignment = { horizontal: 'center' };
    cellHT2.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '16365c' }, // Header line color
    };

    const cellUN = worksheet.getCell('E10');
    cellUN.value = "unité";
    cellUN.font = {
        name: 'Calibri', size: 15, color: { argb: 'ffffff' }   // Set font family
    };
    cellUN.alignment = { horizontal: 'center' };
    cellUN.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '16365c' }, // Header line color
    };
    const cellQT = worksheet.getCell('D10');
    cellQT.value = "qte";
    cellQT.font = {
        name: 'Calibri', size: 15, color: { argb: 'ffffff' }   // Set font family
    };
    cellQT.alignment = { horizontal: 'center' };
    cellQT.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '16365c' }, // Header line color
    };

    const celldESG = worksheet.getCell('B10');
    celldESG.value = "désignation";
    celldESG.font = {
        name: 'Calibri', size: 15, color: { argb: 'ffffff' }   // Set font family
    };
    celldESG.alignment = { horizontal: 'center' };
    celldESG.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '16365c' }, // Header line color
    };
    
    
    const cellmf = worksheet.getCell('D9');
    cellmf.value = `MF/CIN:${cinmf}`;
    cellmf.font = {
        name: 'Calibri', size: 11  // Set font family
    };

    const cellDATE = worksheet.getCell('F5');
    cellDATE.value = `Date :${date}`;
    cellDATE.font = {
        name: 'Cambria', size: 11  // Set font family
    };
    const cellMR = worksheet.getCell('F7');
    cellMR.value = `Mr : ${nom}`;
    cellMR.font = {
        name: 'Cambria', size: 11 // Set font family
    };
    const cellADRES = worksheet.getCell('F8');
    cellADRES.value = `Adresse : ${adresse}`;
    cellADRES.font = {
        name: 'Cambria', size: 11  // Set font family
    };


    const cellNum = worksheet.getCell('D6');
    cellNum.value = "N°00000001";
    cellNum.font = {
        name: 'Cambria', size: 18, color: { argb: '963634' }  // Set font family
    };


    const cellBON = worksheet.getCell('F2');
    cellBON.value = "BON DE LIVRAISON";
    cellBON.font = {
        name: 'Cambria', size: 16, underline: true // Set font family
    };

    const cellloc = worksheet.getCell('A4');
    cellloc.value = "      LUXMAR";
    cellloc.font = {
        name: 'Book Antiqua', size: 16, bold: true// Set font family
    };
    
    const celltell = worksheet.getCell('B5');
    celltell.value = "Usine+showroom: sidi hsine sijoumi";
    celltell.font = {
        name: 'Calibri', size: 11 // Set font family
    };
    const celltell2 = worksheet.getCell('B6');
    celltell2.value = "Tel:0021698717058 /20733414";
    celltell2.font = {
        name: 'Calibri', size: 11 // Set font family
    };
    const cellmail = worksheet.getCell('B7');
    cellmail.value = "Usine : 58717058/31131406/55717098";
    cellmail.font = {
        name: 'Calibri', size: 11 // Set font family
    };
    const cellnom = worksheet.getCell('B8');
    cellnom.value = "e-mail: marbrerie.hammami@gmail.com";
    cellnom.font = {
        name: 'Calibri', size: 11 // Set font family
    };
    for (let row = 12; row <= 38; row++) {
        worksheet.mergeCells(`B${row}:C${row}`);
    }
    for (let i = 12; i <= 38; i++) {
        worksheet.getRow(i).height = 18;
    }
    for (let row = 12; row <= 37; row++) {
        for (let col = 2; col <= 7; col++) { // Columns B to G (2 to 7)
            const cell = worksheet.getCell(row, col);
            cell.border = {
                top: { style: 'dotted' },
                bottom: { style: 'dotted' }
            };
        }
    }
    for (let row = 12; row <= 38; row++) {
        const cell = worksheet.getCell(`B${row}`);
        cell.border = {
            left: { style: 'thin' }, top: { style: 'dotted' },
            bottom: { style: 'dotted' }, right: { style: 'thin' }
        };
    }
    for (let row = 12; row <= 38; row++) {
        const cell = worksheet.getCell(`D${row}`);
        cell.border = {
            top: { style: 'dotted' },
            bottom: { style: 'dotted' }, right: { style: 'thin' }
        };
    }
    for (let row = 12; row <= 38; row++) {
        const cell = worksheet.getCell(`E${row}`);
        cell.border = {
            top: { style: 'dotted' },
            bottom: { style: 'dotted' }, right: { style: 'thin' }
        };
    }
    for (let row = 12; row <= 38; row++) {
        const cell = worksheet.getCell(`F${row}`);
        cell.border = {
            top: { style: 'dotted' },
            bottom: { style: 'dotted' }, right: { style: 'thin' }
        };
    }
    for (let row = 12; row <= 38; row++) {
        const cell = worksheet.getCell(`G${row}`);
        cell.border = {
            top: { style: 'dotted' },
            bottom: { style: 'dotted' }, right: { style: 'thin' }
        };
    }


    worksheet.getCell('B38').border = {
        top: { style: 'dotted' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('G38').border = {
        top: { style: 'dotted' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('C38').border = {
        top: { style: 'dotted' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('D38').border = {
        top: { style: 'dotted' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('E38').border = {
        top: { style: 'dotted' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('F38').border = {
        top: { style: 'dotted' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.mergeCells('B40:C40');
    worksheet.mergeCells('D40:E40');
    worksheet.mergeCells('F40:G40');
    worksheet.mergeCells('B41:C41');
    worksheet.mergeCells('D41:E41');
    worksheet.mergeCells('F41:G41');
    worksheet.mergeCells('B42:C42');
    worksheet.mergeCells('D42:E42');
    worksheet.mergeCells('F42:G42');

    worksheet.getCell('B41').border = {
        top: { style: 'thin' },
        bottom: { style: 'dotted' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('D41').border = {
        top: { style: 'thin' },
        bottom: { style: 'dotted' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('F41').border = {
        top: { style: 'thin' },
        bottom: { style: 'dotted' }, right: { style: 'thin' }, left: { style: 'thin' }
    };

    worksheet.getCell('F42').border = {
        top: { style: 'dotted' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('D42').border = {
        top: { style: 'dotted' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('B42').border = {
        top: { style: 'dotted' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('B40').border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('D40').border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.getCell('F40').border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' }, right: { style: 'thin' }, left: { style: 'thin' }
    };
    worksheet.mergeCells('A43:G43');
    worksheet.mergeCells('A44:J44');
    worksheet.mergeCells('A45:G45');
    worksheet.mergeCells('A46:G46');
    worksheet.mergeCells('A47:G47');
    worksheet.mergeCells('A48:G48');
    worksheet.getRow(43).height = 15;
    worksheet.getRow(44).height = 12;
    worksheet.getRow(45).height = 12;
    worksheet.getRow(46).height = 12;
    worksheet.getRow(47).height = 12;
    worksheet.getCell('A44').value = 'يتعين على المشتري ان يكون مطلعا منذ البداية على خصائص مادة الرخام التي هي مادة طبيعية قبل كل شيء و لا يمكن التحكم في التموجات التي تظهر على سطحها كما يتعين على التقيد بالمواصفات الفنية عند وضعها ';
    worksheet.getCell('A44').font = {
        name: 'Calibri', size: 7 // Set font family
    };
    worksheet.getCell('A45').value = 'حتى لا يكون ذلك سببا في تعييبها أو فسادها - يعترف المشتري أنه اطلع على هذه الشروط العامة للبيع ووافق عليها دون احترازات تحفظ حتى يقع اللجوء اليها عند كل خلاف أو نزاع مع البائع';
    worksheet.getCell('A45').font = {
        name: 'Calibri', size: 7 // Set font family
    };

    worksheet.getCell('A46').value = 'Siège social/ sidi hsine sijoumi - Tunis( à coté de  visite technique)';
    worksheet.getCell('A46').font = {
        name: 'Calibri', size: 11 // Set font family
    };
    worksheet.getCell('A47').value = 'Merci de votre confiance';
    worksheet.getCell('A47').font = {
        name: 'Calibri', size: 11// Set font family
    };
    worksheet.getCell('A43').value = 'الشروط العامة';
    worksheet.getCell('A43').font = {
        name: 'Calibri', size: 11, bold: true // Set font family
    };
    worksheet.getCell('A43').alignment = { horizontal: 'center' };
    worksheet.getCell('A44').alignment = { horizontal: 'left' };
    worksheet.getCell('A45').alignment = { horizontal: 'center' };
    worksheet.getCell('A46').alignment = { horizontal: 'center' };
    worksheet.getCell('A47').alignment = { horizontal: 'center' };
    // Add bottom image if uploaded


    // Add an empty column (A) before the table
    worksheet.getCell('A1').value = '';

    // Add text "Client : " at cell D10 and "Devis N°/ : " at cell D8



    // Add table headers starting from column B and row 12




    // Add some example data starting from column B and row 13




    // Adjust column widths to specified values


    // Set row height for all rows


    // Add color to the header row


    // Add borders to all rows





    worksheet.columns = [
        { key: 'a', width: 1 }, // Empty column A
        { key: 'b', width: 11 }, // DESIGNATION (Column B)
        { key: 'c', width: 28 },        // Qte
        { key: 'd', width: 13.00 },      // Unité
        { key: 'e', width: 13.00 },     // PRIX U
        { key: 'f', width: 13 },
        { key: 'g', width: 13 },
        { key: 'h', width: 0.43 }     // PRIX T
    ];
    
    
    var x=12;
    var j=0;
    data.forEach(item => {
        
          worksheet.getCell(`B${x}`).value=item.nomproduit;
          worksheet.getCell(`D${x}`).value=item.nombrepieces;
          worksheet.getCell(`E${x}`).value='pcs';
          worksheet.getCell(`F${x}`).value=item.prix;
            j=(item.prix * ((item.longeur / 100) * (item.largeur / 100)) * item.nombrepieces)
          worksheet.getCell(`G${x}`).value=j;
       
        x++;
      });
      var x=0;
    worksheet.pageSetup.margins = {
        left: 0.31,
        right: 0.35,    
        top: 0.35,
        bottom: 0.16,
        header: 0.3,
        footer: 0.3
    };

    // Create a blob from the workbook and save it
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'generated_excel.xlsx');


};

