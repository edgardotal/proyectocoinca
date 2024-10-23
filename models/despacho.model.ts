export interface Despacho {
  id: number;
  codcli: string;
  ncontrol: string;
  fechad: string;
  pe: number;
  lote: string;
  producto: string;
  c: string;
  f: string;
  n: string;
  p: string;
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
  recepcion_id:  number; 
  recepcion_ncontrol: string;
  rows: any[]; // Asegúrate de incluir este campo con el tipo adecuado
}
