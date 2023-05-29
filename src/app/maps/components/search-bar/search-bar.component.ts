import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'geo-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;
  constructor( private placesServices: PlacesService ) {}
  onQueryChanged( query: string = '' ) {
    if ( this.debounceTimer ) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.placesServices.isLoadingPlaces = true;
      this.placesServices.getPlacesByQuery(query);
    }, 400)
  }
}
