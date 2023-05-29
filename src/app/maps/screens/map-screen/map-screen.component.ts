import { PlacesService } from './../../services/places.service';
import { Component } from '@angular/core';

@Component({
  selector: 'geo-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.scss']
})
export class MapScreenComponent {
  constructor( private placesService: PlacesService) {}
  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }
}
