import { Map, Marker, Popup } from 'mapbox-gl';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { myPlaceApiClient } from '../../API';
import { MyPlaceResponse } from '../../interfaces/myPlace';

@Component({
  selector: 'geo-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {
  
  @ViewChild('mapDiv') mapDivElement!: ElementRef
  constructor( private placesService: PlacesService, private mapService: MapService, private myPlaceApi: myPlaceApiClient ) {}
  ngAfterViewInit(): void {
    if (!this.placesService.location) throw Error('There is not placesService.location');
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.location,
      zoom: 9
    });

    const [lat, lon] = this.placesService.location!;
    this.myPlaceApi.get<MyPlaceResponse>(`/${lat},${lon}.json`)
      .subscribe({
        next: ({features}) => {
          const popup = new Popup({
            offset: [0, -7],
            className: 'custom-popup'
          })
          popup.setHTML(`
            <h6>My Current Location</h6>
            <span>${features[2].place_name}</span>
          `);
          new Marker({ color: 'red' })
            .setLngLat(this.placesService.location!)
            .setPopup(popup)
            .addTo(map)
            this.mapService.setMap( map );
        },
        error: error => console.log
      });
  }
}
