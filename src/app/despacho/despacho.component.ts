import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataDespachoService } from '../services/data-despacho.service';
import { debounceTime } from 'rxjs/operators';
import { Despacho} from '../../../models/despacho.model';
import { Cliente } from '../services/cliente.service';
import { BuscaclienteComponent } from '../buscacliente/buscacliente.component';
import { BuscaloteComponent } from '../buscalote/buscalote.component';
import { NumeroControlService } from '../services/numero-control.service';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';


import { 
  GridApi,                   // API para operaciones de la cuadrícula
  ColDef,                    // Definiciones de columnas
  ValueGetterParams,         // Parámetros para obtener valores
  FirstDataRenderedEvent,    // Evento cuando se renderiza por primera vez la cuadrícula
  GridOptions,               // Opciones para la configuración de la cuadrícula
  CellEditingStoppedEvent,   // Evento cuando se detiene la edición de una celda
  ValueParserParams,         // Parámetros para analizadores de valores
  RowClassParams,            // Parámetros para callbacks de clase de fila
  RowStyle,                  // Configuración del estilo de fila
} from 'ag-grid-community';





@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DespachoComponent implements OnInit {
  formulario!: FormGroup;
  rowData: any[] = [];
  isModalOpen: boolean = false;
 
  searchText: string = '';
  datosRecepcion: any[] = [];
  currentDate: string;
  numeroControl: string = '';
  



  @Output() reiniciar = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private despachoService: DataDespachoService,
    private numeroControlService: NumeroControlService
  ) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];

    this.formulario = this.fb.group({
      cliente: ['', Validators.required],
      fecha: [this.currentDate],
      ncontrol: ['', Validators.required],
      search: [''],
    });
  }

  ngOnInit(): void {
    this.formulario.patchValue({
      fecha: new Date().toISOString().substring(0, 10)
    });


    this.rowData = Array(1).fill(null).map((_, index) => ({
      pe: index + 1, // Inicia con 1
      lote: '',
      producto: '',
      c: '',
      f: '',
      n: '',
      p: '',
      bruto: 0,
      gde25: 0,
      gde24: 0,
      gde23: 0,
      gde22: 0,
      med: 0,
      peq: 0,
      est: 1,
      tara: 0,
      neto: 0,
      totcesta: 0,
      bultos: 0,
      unidad: 0,
      rows: []  // Asegúrate de incluir la propiedad `rows`
  }));
  

    this.numeroControlService.getNumeroControldesp().subscribe({
      next: (response: string) => {
        this.numeroControl = response;
        this.formulario.get('ncontrol')?.setValue(this.numeroControl);
      },
      error: (err) => {
        console.error('Error al obtener el número de control:', err);
        this.numeroControl = '';
      }
    });

    setTimeout(() => {
      this.openSearchClientModal();
    }, 0);

    
  }

 
  openSearchClientModal(): void {
    if (this.isModalOpen) {
      return;
    }

    this.isModalOpen = true;

    const modalRef = this.modalService.open(BuscaclienteComponent);
    modalRef.componentInstance?.clienteSelected.subscribe({
      next: (cliente: Cliente) => {
        this.handleClientSelected(cliente);
        modalRef.close();
        this.isModalOpen = false;
      },
      error: (err: any) => {
        console.error('Error al seleccionar cliente:', err);
        this.isModalOpen = false;
      }
    });

    modalRef.result.finally(() => {
      this.isModalOpen = false;
    });
  }

  handleClientSelected(cliente: Cliente): void {
    const clienteControl = this.formulario.get('cliente');
    if (clienteControl) {
      clienteControl.setValue(cliente.nombre);
    }
  }

  openSearchLoteModal(cava: string): void {
    const modalRef = this.modalService.open(BuscaloteComponent);
    modalRef.componentInstance.cava = cava;
    modalRef.result.then((lote: Despacho) => {
        if (lote) {
            this.handleLoteSelected(lote);
        }
    }).catch((error) => {
        console.error('Modal dismissed:', error);
    });
}


handleLoteSelected(lote: Despacho): void {
  // Aquí verificamos si el lote ya existe en los datos para evitar duplicados
  //const existingLote = this.datosRecepcion.find(item => item.lote === lote.item);
 
  
  
}
  
//-------------------ag grid---------------------------------------------------

  
private gridApi: any; 


onGridReady(params: any) {
   // Verifica que params tenga api y columnApi
  this.gridApi = params.api;
  
}


gridOptions: GridOptions = {
  pagination: false,
  //onCellEditingStopped: this.onCellEditingStopped.bind(this),
  //onFirstDataRendered: this.onFirstDataRendered.bind(this),
  onGridReady: this.onGridReady.bind(this),
 // onCellFocused: this.onCellFocused.bind(this),
 // onCellValueChanged: this.onCellValueChanged.bind(this),
  getRowStyle: (params: RowClassParams<any, any>): RowStyle | undefined => {
    if (params.node && params.node.rowIndex !== null) {
      return {
        background: params.node.rowIndex % 2 === 0 ? '#f2f2f2' : '#ffffff'
      };
    }
    return undefined;
  },
  getRowId: (params) => {
    const id = params.data.id; // Usa un campo único
    return id != null ? id.toString() : '';
  },
  //suppressAggFuncInHeader: true,    
};




  selectedParams: any;



  columnDefs: ColDef[] = [
    {
        headerName: 'PE',
        field: 'pe',
        width: 60,
        editable: false
    },
    { 
        field: 'lote', 
        headerName: 'Lote', 
        width: 140, 
        editable: false,
    },
    {
        field: 'producto',
        headerName: 'Producto',
        headerClass: 'header-producto',
        minWidth: 300,
        editable: false,
    },
    { 
        field: 'c', 
        headerName: 'Cava', 
        width: 70, 
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
        },
        editable: false,
    },
    {
        field: 'f',
        headerName: 'Fila',
        width: 70,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: [
                'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10',
                'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19',
                'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 'F27', 'F28'
            ]
        },
        editable: false,
    },
    {
        field: 'n',
        headerName: 'Nivel',
        width: 70,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: ['N1', 'N2', 'N3']
        },
        editable: false,
    },
    {
      field: 'p',
      headerName: 'Pos.',
      width: 70,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
          values: ['P1', 'P2', 'P3', 'P4']
      },
      editable: false,
    },
    {
        field: 'bruto',
        headerName: 'Bruto', 
        width: 100,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
        editable: false,
    },
    {
        field: 'gde25',
        headerName: 'G2,5',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: false,
    },
    {
        field: 'gde24',
        headerName: 'G2,4',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: false,
    },
    {
        field: 'gde23',
        headerName: 'G2,3',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: false,
    },
    {
        field: 'gde22',
        headerName: 'G2,2',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: false,
    },
    {
        field: 'med',
        headerName: 'Med.',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: false,
    },
    {
        field: 'peq',
        headerName: 'Peq.',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: false,
    },
    {
      field: 'est',
      headerName: 'Est.',
      width: 60,
      editable: false,
      cellStyle: { 
                backgroundColor: '#f6f493',    
              },
    },
    {
        field: 'tara',
        headerName: 'Tara',
        width: 80,
        cellStyle: {backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
        pinned: 'right',
        headerClass: (params) => 'header-dark-gray',
    },
    {
        field: 'neto',
        headerName: 'Neto',
        width: 100,
        cellStyle: {backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
        pinned: 'right',
        headerClass: (params) => 'header-dark-gray',
    },
    {
        field: 'totcesta',
        headerName: 'T.Cesta',
        width: 90,
        cellStyle: {backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
        pinned: 'right',
        headerClass: (params) => 'header-dark-gray',
    },
    {
        field: 'bultos',
        headerName: 'Bultos',
        width: 80,
        cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
        pinned: 'right',
        headerClass: (params) => 'header-dark-gray',
    },
    {
        field: 'unidad',
        headerName: 'Unidad',
        width: 90,
        cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
        pinned: 'right',
        headerClass: (params) => 'header-dark-gray',
    }
];




  emitirReinicio(): void {
    this.reiniciar.emit();
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      const gridData = this.datosRecepcion;

      const payloadDetalles = {
        codcli: formData.cliente,
        fechar: formData.fecha,
        ncontrol: this.numeroControl,
        rows: gridData.map(row => ({
          pe: row.pe || 0,
          lote: row.lote || '',
          producto: row.producto || '',
          c: row.c || '',
          f: row.f || '',
          n: row.n || '',
          bruto: row.bruto || 0,
          gde25: row.gde25 || 0,
          gde24: row.gde24 || 0,
          gde23: row.gde23 || 0,
          gde22: row.gde22 || 0,
          med: row.med || 0,
          peq: row.peq || 0,
          est: row.est || 0,
          tara: row.tara || 0,
          neto: row.neto || 0,
          totcesta: row.totcesta || 0,
          bultos: row.bultos || 0,
          unidad: row.unidad || 0,
        }))
      };

      // Cálculos de totales
      const payloadTotales = {
        codcli: formData.cliente,
        fechar: formData.fecha,
        ncontrol: this.numeroControl,
        totalLotes: gridData.length,
        totalBruto: gridData.reduce((total, row) => total + (row.bruto || 0), 0),
        totalNeto: gridData.reduce((total, row) => total + (row.neto || 0), 0),
        totalCestas: gridData.reduce((total, row) => total + (row.totcesta || 0), 0),
      };

      console.log('Detalles:', payloadDetalles);
      console.log('Totales:', payloadTotales);
      
      // Aquí iría el servicio para enviar los datos a tu API
    }
  }
}
