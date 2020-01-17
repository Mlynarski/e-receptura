import JsPdf from 'jspdf';
import 'jspdf-autotable';
import font from './font';
import store from '../store';

const generatePdf = async () => {
  // read data from store
  const {
    serialNumber,
    prescriptionNumber,
    getDate,
    preparationDate,
    ingredients,
    dosageControl,
    descriptionOfPreparing,
    packageType,
    capsulesExpiryDate,
    capsulesType,
    capsulesSerialNumber,
    shelfLife,
    temperature,
    shaded,
    comments,
  } = store.getState();

  // check if required field is available
  if (
    serialNumber &&
    prescriptionNumber &&
    getDate &&
    preparationDate &&
    shelfLife
  ) {
    if (
      packageType !== 'KAPSUŁKI' ||
      (packageType === 'KAPSUŁKI' && capsulesExpiryDate && capsulesSerialNumber)
    ) {
      // document properties
      const doc = new JsPdf({
        unit: 'mm',
      });

      doc.addFileToVFS('Roboto-Regular-normal', font);
      doc.addFont('Roboto-Regular-normal', 'Roboto-Regular', 'normal');
      doc.setFont('Roboto-Regular', 'normal');

      // variables to format document
      const pageWidth = doc.internal.pageSize.width;
      const documentTopMargin = 20;
      const spaceBetweenTables = 5;

      // autotable properties
      doc.autoTableSetDefaults({
        theme: 'grid',
        pageBreak: 'avoid',
        headStyles: {
          fillColor: false,
          lineColor: false,
          lineWidth: 0,
        },
        styles: {
          fillColor: [211, 211, 211],
          lineColor: [0, 0, 0],
          lineWidth: 0.25,
          font: 'Roboto-Regular',
          fontStyle: 'normal',
          fontSize: 12,
          textColor: [0, 0, 0],
        },
        footStyles: {
          fillColor: false,
          lineColor: [0, 0, 0],
          lineWidth: 0.25,
          font: 'Roboto-Regular',
          fontStyle: 'normal',
          fontSize: 12,
          textColor: [0, 0, 0],
        },
      });

      // document title
      doc.setFontSize(14);
      doc.text(
        'Protokół sporządzenia leku recepturowego',
        pageWidth / 2,
        documentTopMargin,
        {
          align: 'center',
        },
      );

      // general information
      doc.autoTable({
        startY: documentTopMargin + spaceBetweenTables,
        head: [[{ content: 'Przyjęcie recepty:', colSpan: 4 }]],
        body: [['Data', 'Nr porządkowy', 'Nr recepty', 'Podpis']],
        foot: [
          [
            new Date(getDate).toLocaleDateString('en-GB'),
            serialNumber,
            prescriptionNumber,
            '',
          ],
        ],
        columnStyles: {
          0: { cellWidth: 45 },
          1: { cellWidth: 45 },
          2: { cellWidth: 45 },
          3: { cellWidth: 'auto' },
        },
      });

      // preparing information
      doc.autoTable({
        startY: doc.previousAutoTable.finalY + spaceBetweenTables,
        head: [
          [
            {
              content: 'Sporządzenie leku recepturowego według recepty:',
              colSpan: 2,
            },
          ],
        ],
        body: [['Data', 'Nr porządkowy']],
        foot: [
          [new Date(preparationDate).toLocaleDateString('en-GB'), serialNumber],
        ],
        columnStyles: {
          0: { cellWidth: 90 },
          1: { cellWidth: 'auto' },
        },
      });

      // ingredients
      if (ingredients.length > 0) {
        doc.setFontSize(12);
        doc.text(
          'Składniki',
          16,
          doc.previousAutoTable.finalY + spaceBetweenTables + 5,
        );

        doc.autoTable({
          pageBreak: 'auto',
          startY: doc.previousAutoTable.finalY + spaceBetweenTables + 8,
          // swap styles
          headStyles: doc.autoTable.previous.settings.styles,
          bodyStyles: doc.autoTable.previous.settings.footStyles,
          body: ingredients,
          columns: [
            { header: 'Lp', dataKey: 'id' },
            { header: 'Składnik', dataKey: 'name' },
            { header: 'Ilość założona', dataKey: 'qFounded' },
            { header: 'Ilość odważona', dataKey: 'qWeighted' },
            { header: 'Nr serii', dataKey: 'serialNumber' },
            { header: 'Data ważności', dataKey: 'expDate' },
          ],
          columnStyles: {
            cellWidth: 'wrap',
            0: { cellWidth: 8 },
            1: { cellWidth: 50 },
            2: { cellWidth: 31 },
            3: { cellWidth: 33 },
            4: { cellWidth: 26 },
            5: { cellWidth: 'auto' },
          },
        });
      }

      // dosage control
      if (dosageControl) {
        doc.autoTable({
          startY: doc.previousAutoTable.finalY + spaceBetweenTables,
          head: [['Kontrola dawkowania:']],
          foot: [[dosageControl]],
        });
      }

      // description of preparing
      if (descriptionOfPreparing) {
        doc.autoTable({
          startY: doc.previousAutoTable.finalY + spaceBetweenTables,
          head: [['Opis sporządzania:']],
          foot: [[descriptionOfPreparing]],
        });
      }

      // package
      if (packageType === 'KAPSUŁKI') {
        doc.autoTable({
          startY: doc.previousAutoTable.finalY + spaceBetweenTables,
          head: [[{ content: 'Opakowanie:', colSpan: 4 }]],
          body: [
            [
              'Rodzaj',
              'Typ kapsułek',
              'Numer serii kapsułek',
              'Data ważności kapsułek',
            ],
          ],
          foot: [
            [
              packageType,
              capsulesType,
              capsulesSerialNumber,
              new Date(capsulesExpiryDate).toLocaleDateString('en-GB'),
            ],
          ],
          columnStyles: {
            0: { cellWidth: 42 },
            1: { cellWidth: 42 },
            2: { cellWidth: 45 },
            3: { cellWidth: 'auto' },
          },
        });
      } else {
        doc.autoTable({
          startY: doc.previousAutoTable.finalY + spaceBetweenTables,
          head: [['Opakowanie:']],
          foot: [[packageType]],
        });
      }

      // shelf life
      doc.autoTable({
        startY: doc.previousAutoTable.finalY + spaceBetweenTables,
        head: [['Okres przydatności do użycia:']],
        foot: [[new Date(shelfLife).toLocaleDateString('en-GB')]],
      });

      // storage conditions
      doc.autoTable({
        startY: doc.previousAutoTable.finalY + spaceBetweenTables,
        head: [
          shaded
            ? [{ content: 'Warunki przechowywania:', colSpan: 2 }]
            : ['Warunki przechowywania:'],
        ],
        foot: [
          shaded
            ? [`TEMP: ${temperature}`, 'PRZECHOWYWAĆ W CIEMNYM MIEJSCU']
            : [`TEMP: ${temperature}`],
        ],
        columnStyles: shaded && {
          0: { cellWidth: 80 },
          1: { cellWidth: 'auto' },
        },
      });

      // comments
      if (comments) {
        doc.autoTable({
          startY: doc.previousAutoTable.finalY + spaceBetweenTables,
          head: [['Uwagi:']],
          foot: [[comments]],
        });
      }

      // sign
      doc.autoTable({
        startY: doc.previousAutoTable.finalY + spaceBetweenTables + 5,
        head: [['']],
        headStyles: {
          minCellWidth: 80,
          minCellHeight: 35,
          lineColor: [0, 0, 0],
          lineWidth: 0.25,
        },
        foot: [['Podpis i pieczęć osoby wykonującej']],
        footStyles: {
          lineColor: false,
          lineWidth: 0,
          halign: 'center',
        },
        margin: { left: (pageWidth - 80) / 2, right: (pageWidth - 80) / 2 },
      });

      // receipt
      doc.autoTable({
        startY: doc.previousAutoTable.finalY + spaceBetweenTables,
        head: [[{ content: 'Odbiór leku:', colSpan: 4 }]],
        body: [['Data', 'Nr porządkowy', 'Nr recepty', 'Podpis']],
        foot: [['', serialNumber, prescriptionNumber, '']],
        columnStyles: {
          0: { cellWidth: 45 },
          1: { cellWidth: 45 },
          2: { cellWidth: 45 },
          3: { cellWidth: 'auto' },
        },
      });

      // generate page number
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(12);

      for (let i = 0; i < pageCount; i += 1) {
        doc.setPage(i);
        doc.text(
          101,
          287,
          `${doc.internal.getCurrentPageInfo().pageNumber}/${pageCount}`,
        );
      }

      // save to file
      await doc.save(`receptura.pdf`, { returnPromise: true });
    }
  }
};

export default generatePdf;
