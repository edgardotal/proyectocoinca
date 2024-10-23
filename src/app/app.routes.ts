import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RformulariounoComponent } from './rformulariouno/rformulariouno.component';
import { ContenedorCavasComponent } from './contenedor-cavas/contenedor-cavas.component';
import { NewdespachoComponent } from './newdespacho/newdespacho.component';

export const routes: Routes = [
  { path: 'recepcion', component: RformulariounoComponent },
  { path: 'despacho', component: NewdespachoComponent },
  { path: 'cavas', component: ContenedorCavasComponent },
  { path: '', redirectTo: '/cavas', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/cavas' } // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
