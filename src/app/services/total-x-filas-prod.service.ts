import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar peticiones HTTP
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TotalXFilasProdService {
  private apiUrl = 'http://localhost:3000/api/guardatotalxplote'; // Asegúrate de que la URL es correcta

  constructor(private http: HttpClient) { } // Inyecta HttpClient en el constructor

  // Método independiente para calcular los totales generales
  totalGeneral(rows: any[]): any {
    const totalesAgrupados: any = {};

    rows.forEach(row => {
      const key = `${row.lote}-${row.producto}`;

      if (!totalesAgrupados[key]) {
        totalesAgrupados[key] = {
          lote: row.lote,
          producto: row.producto,
          tneto: 0,
          test: 0,
          tcestas: 0,
          tgde: 0,
          tmed: 0,
          tpeq: 0,
          tsacos: 0
        };
      }

      totalesAgrupados[key].tneto += row.neto;
      totalesAgrupados[key].test += row.est;
      totalesAgrupados[key].tcestas += row.totcesta;

      const totalGdeRow = row.gde25 + row.gde24 + row.gde23 + row.gde22;
      totalesAgrupados[key].tgde += totalGdeRow;

      totalesAgrupados[key].tmed += row.med;
      totalesAgrupados[key].tpeq += row.peq;
      totalesAgrupados[key].tsacos += row.sacos;
    });

    const payloadFilasProdTotal = {
      total: Object.values(totalesAgrupados)
    };

    console.log('Totales por lote y producto:', payloadFilasProdTotal);

    return payloadFilasProdTotal; // Solo retorna los totales, sin hacer la inserción de datos
  }

  // Método independiente para insertar los datos en la API
  insertarTotales(payloadFilasProdTotal: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payloadFilasProdTotal); // Realiza la petición POST al backend
   
  }

  
  
}
