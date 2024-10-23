import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import './assets/css/ag-grid-theme-builder.css';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
