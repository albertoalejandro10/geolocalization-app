import { Map, Marker, Popup } from 'mapbox-gl';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'geo-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef
  constructor( private placesService: PlacesService, private mapService: MapService ) {}
  ngAfterViewInit(): void {
    if (!this.placesService.location) throw Error('There is not placesService.location');
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.location,
      zoom: 9
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aqui estoy</h6>
        <span>Estoy en esta parte del mundo</span>
      `);
    new Marker({ color: 'red' })
      .setLngLat(this.placesService.location)
      .setPopup(popup)
      .addTo(map)

    this.mapService.setMap( map );
  }
}
