import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  generatePdf(data: any, payloadTotales: any, payloadTlxp: any) {
    const doc = new jsPDF();
    
    console.log('malparision', payloadTlxp);




    // Establecer tamaño de la fuente
    doc.setFontSize(8);

    // Información de la empresa
    doc.text('CONGELADOS INDUSTRIALES, C.A. (COINCA)', 10, 10);
    doc.text('RIF: J-50508663-4', 10, 15);
    doc.text('Dirección: Av. 48 con Calle 8, Km 3 1/2 Via Perija', 10, 20);

    // Información a la derecha
    const rightX = 150; // Ajusta la posición X para el contenido a la derecha

    // Título Nota de Recepción justo encima de la fecha
    doc.setFontSize(10); // Tamaño de fuente para el título
    doc.setFont('helvetica', 'bold'); // Fuente en negrita
    doc.text('Nota de Recepción', rightX, 10); // Posición del título
    doc.setFontSize(8); // Tamaño de fuente de nuevo a 8
    doc.setFont('helvetica', 'normal'); // Regresar al estilo normal

    // Información adicional alineada a la derecha
    doc.text(`Fecha: ${data.fechar}`, rightX, 15);
    doc.text(`Número de Control: ${data.ncontrol}`, rightX, 20);
    doc.text(`Cliente: ${data.codcli}`, rightX, 25); // Agrega el nombre del cliente

    // Configuración de las columnas de la tabla
    const columns = [
      { header: 'Pe', dataKey: 'pe' },
      { header: 'Producto', dataKey: 'producto' },
      { header: 'C', dataKey: 'c' },
      { header: 'F', dataKey: 'f' },
      { header: 'N', dataKey: 'n' },
      { header: 'Bruto', dataKey: 'bruto' },
      { header: 'G2.5', dataKey: 'gde25' },
      { header: 'G2.4', dataKey: 'gde24' },
      { header: 'G2.3', dataKey: 'gde23' },
      { header: 'G2.2', dataKey: 'gde22' },
      { header: 'Med', dataKey: 'med' },
      { header: 'Peq', dataKey: 'peq' },
      { header: 'Sacos', dataKey: 'sacos' },
      { header: 'Estiba', dataKey: 'est' },
      { header: 'Tara', dataKey: 'tara' },
      { header: 'Neto', dataKey: 'neto' },
      { header: 'T.cesta', dataKey: 'totcesta' },
      { header: 'Bultos', dataKey: 'bultos' },
      { header: 'Unidad', dataKey: 'unidad' }
    ];

    // Agrupar los datos por lote
    const groupedData = data.rows.reduce((acc: any, row: any) => {
      if (!acc[row.lote]) {
        acc[row.lote] = [];
      }
      acc[row.lote].push(row);
      return acc;
    }, {});

    const tableBody = [];

    // Iterar sobre los lotes y agregar los datos correspondientes, ordenados por 'pe'
    const sortedLotes = Object.keys(groupedData).sort((a, b) => {
      const aPe = groupedData[a][0].pe; // Campo numérico
      const bPe = groupedData[b][0].pe; // Campo numérico
      return aPe - bPe; // Comparar numéricamente
    });

    sortedLotes.forEach((lote) => {
      // Añadir una fila de encabezado para el lote
      tableBody.push([{ content: `Lote: ${lote}`, colSpan: columns.length, styles: { halign: 'left', fillColor: [230, 230, 230] } }]);

      // Añadir las filas de datos para este lote
      groupedData[lote].forEach((row: any) => {
        tableBody.push({
          pe: row.pe,
          producto: row.producto,
          c: row.c,
          f: row.f,
          n: row.n,
          bruto: row.bruto,
          gde25: row.gde25,
          gde24: row.gde24,
          gde23: row.gde23,
          gde22: row.gde22,
          med: row.med,
          peq: row.peq,
          sacos: row.sacos,
          est: row.est,
          tara: row.tara,
          neto: row.neto,
          totcesta: row.totcesta,
          bultos: row.bultos,
          unidad: row.unidad
        });
      });

      // Añadir fila de subtotales para este lote
      // Añadir fila de subtotales para este lote
const subtotal = groupedData[lote].reduce((acc: any, row: any) => {
  acc.bruto += row.bruto || 0;
  acc.gde25 += row.gde25 || 0;
  acc.gde24 += row.gde24 || 0;
  acc.gde23 += row.gde23 || 0;
  acc.gde22 += row.gde22 || 0;
  acc.med += row.med || 0;
  acc.peq += row.peq || 0;
  acc.sacos += row.sacos || 0;
  acc.est += row.est || 0;
  acc.tara += row.tara || 0;
  acc.neto += row.neto || 0;
  acc.totcesta += row.totcesta || 0;
  acc.bultos += row.bultos || 0;
  acc.unidad += row.unidad || 0;
  return acc;
}, { bruto: 0, gde25: 0, gde24: 0, gde23: 0, gde22: 0, med: 0, peq: 0, sacos: 0, est: 0, tara: 0, neto: 0, totcesta: 0, bultos: 0, unidad: 0 });

// Convertir los valores de subtotal a dos decimales
tableBody.push({
  pe: '', 
  producto: 'Subtotal', 
  c: '', 
  f: '', 
  n: '', 
  bruto: subtotal.bruto.toFixed(2), 
  gde25: subtotal.gde25.toFixed(2), 
  gde24: subtotal.gde24.toFixed(2), 
  gde23: subtotal.gde23.toFixed(2), 
  gde22: subtotal.gde22.toFixed(2), 
  med: subtotal.med.toFixed(2), 
  peq: subtotal.peq.toFixed(2),
  sacos: subtotal.sacos.toFixed(2), 
  est: subtotal.est.toFixed(2), 
  tara: subtotal.tara.toFixed(2), 
  neto: subtotal.neto.toFixed(2), 
  totcesta: subtotal.totcesta.toFixed(2), 
  bultos: subtotal.bultos.toFixed(2), 
  unidad: subtotal.unidad.toFixed(2)
});


      // Agregar salto de línea entre grupos
      tableBody.push({ pe: '', producto: '', c: '', f: '', n: '', bruto: '', gde25: '', gde24: '', gde23: '', gde22: '', med: '', peq: '', sacos: '', est: '', tara: '', neto: '', totcesta: '', bultos: '', unidad: '' });
    });

    // Añadir la fila de totales generales al final
    // Añadir la fila de totales generales al final
const totalRow = {
  pe: '', 
  producto: 'Totales Generales', 
  c: '', 
  f: '', 
  n: '', 
  bruto: payloadTotales.totalBruto.toFixed(2), 
  gde25: payloadTotales.tcg25.toFixed(2), 
  gde24: payloadTotales.tcg24.toFixed(2), 
  gde23: payloadTotales.tcg23.toFixed(2), 
  gde22: payloadTotales.tcg22.toFixed(2), 
  med: payloadTotales.tcm.toFixed(2), 
  peq: payloadTotales.tcp.toFixed(2),
  sacos: payloadTotales.tsacos.toFixed(2), 
  est: payloadTotales.testiba.toFixed(2), 
  tara: payloadTotales.totalTara.toFixed(2), 
  neto: payloadTotales.totalNeto.toFixed(2), 
  totcesta: payloadTotales.tcestas.toFixed(2), 
  bultos: payloadTotales.tbultos.toFixed(2), 
  unidad: payloadTotales.tunidad.toFixed(2)
};


    // Agregar fila de totales generales con salto de línea
    tableBody.push({ pe: '', producto: '', c: '', f: '', n: '', bruto: '', gde25: '', gde24: '', gde23: '', gde22: '', med: '', peq: '', sacos: '', est: '', tara: '', neto: '', totcesta: '', bultos: '', unidad: '' });
    tableBody.push(totalRow);

    // Genera la tabla con la fila de totales incluida
    (doc as any).autoTable({
      columns,
      body: tableBody,
      startY: 35, // Ajustado para que la tabla comience debajo de la nueva información
      margin: { left: 10, right: 10 },
      theme: 'striped',
      styles: {
        fontSize: 8,
        cellPadding: 1,
        overflow: 'linebreak'
      },
      didParseCell: (data: any) => {
        if (data.row.raw.producto === 'Subtotal' || data.row.raw.producto === 'Totales Generales') {
          data.cell.styles.fontStyle = 'bold'; // Poner en negrita
        }
      }
    });

    const thirdTableColumns = [
      { header: 'Lote', dataKey: 'lote' },
      { header: 'Producto', dataKey: 'producto' },
      { header: 'Tneto', dataKey: 'tneto' },
      { header: 'Test', dataKey: 'test' },
      { header: 'Tcestas', dataKey: 'tcestas' },
      { header: 'Tgde', dataKey: 'tgde' },
      { header: 'Tmed', dataKey: 'tmed' },
      { header: 'Tpeq', dataKey: 'tpeq' },
      { header: 'Tsacos', dataKey: 'tsacos' }
    ];
    
    // Asegúrate de pasar el array correcto
    const bodyContent = payloadTlxp.total || [];
    
    (doc as any).autoTable({
      columns: thirdTableColumns,
      body: bodyContent,  // Utiliza el array dentro de `total`
      startY: (doc as any).lastAutoTable.finalY + 10,  // Posición debajo de la primera tabla
      margin: { left: 10, right: 10 },
      theme: 'striped',
      styles: {
        fontSize: 8,
        cellPadding: 1,
        overflow: 'linebreak'
      }
    });
     
    const nombreArchivo = `Nota Recepcion_${data.ncontrol}.pdf`;

    // Guardar el archivo PDF con el nombre dinámico
    doc.save(nombreArchivo);
  }
}
