import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'geo-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent {
  public selectedId: string = '';
  constructor( private placesService: PlacesService, private mapService: MapService) {}
  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }
  get places(): Feature[] {
    return this.placesService.places;
  }
  sendTo( place: Feature ) {
    this.mapService.deletePolyline();
    this.selectedId = place.id;
    const [ lng, lat ] = place.center;
    this.mapService.sendTo([lng, lat]);
  }
  getDirections( place: Feature ) {
    if (!this.placesService.location) throw Error('There is not a user location');
    this.mapService.deletePolyline();
    this.placesService.deletePlaces();

    const start = this.placesService.location;
    const end = place.center as [number, number];
    this.mapService.getRouteBetweenPoints( start, end);
  }
}
