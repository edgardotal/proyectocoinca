// Define una interfaz para la estructura del payload de recepción
export interface Recepcion {
  ncontrol: string;
  codcli: string;
  fechar: string;
  rows: Array<{
    pe: string;
    lote: string;
    codigo: string;
    producto: string;
    c: string;
    f: string;
    n: string;
    pos: string;
    bruto: number;
    gde25: number;
    gde24: number;
    gde23: number;
    gde22: number;
    med: number;
    peq: number;
    sacos: number;
    est: number;
    tara: number;
    neto: number;
    totcesta: number;
    bultos: number;
    unidad: number;
  }>;
}

