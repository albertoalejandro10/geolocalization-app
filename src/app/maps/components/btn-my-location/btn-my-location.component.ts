import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'geo-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss']
})
export class BtnMyLocationComponent {
  constructor( private placesService: PlacesService, private mapService: MapService) {};
  goToMyLocation() {
    if ( !this.placesService.isUserLocationReady ) throw Error('There is not location from the user');
    if ( !this.mapService.isMapReady ) throw Error('Map is not unavailable');
    this.mapService.sendTo( this.placesService.location! );
  }
}
