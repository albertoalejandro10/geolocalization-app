import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl';
Mapboxgl.accessToken = 'pk.eyJ1IjoiYWxiZXJ0b2FsZWphbmRybzEwIiwiYSI6ImNsaTIydm9iNjEyNnkzc21iY2t2djkwcGoifQ.FftaCYWGwc83vgJcHPAfDA';

if ( !navigator.geolocation ) {
  alert('Sorry. Geolocation is not supported by this browser, try another browser.')
  throw new Error("Geolocation is not supported by this browser.");
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
