import { Injectable } from '@angular/core';
import { AnySourceData, LngLatLike, Marker, Popup } from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { LngLatBounds } from 'mapbox-gl';
import { DirectionsApiClient } from '../API';
import { DirectionsResponse, Route } from '../interfaces/direction';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  constructor( private directionApiClient: DirectionsApiClient ) {

  }

  setMap( map: Map ) {
    this.map = map;
  }

  sendTo( coords: LngLatLike ) {
    if ( !this.isMapReady ) throw Error('Map is not updated');
    this.map?.flyTo({
      zoom: 9,
      center: coords
    });
  }

  createMarkersFromPlace( places: Feature[], location: [number, number] ) {
    if ( !this.map ) throw Error('The map is not initialized');
    this.markers.forEach( marker => marker.remove());
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [ lng, lat ] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${ place.text_en }</h6>
          <span>${ place.place_name }</span>
        `);
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);
      
      newMarkers.push( newMarker );
    }
    this.markers = newMarkers;
    if ( places.length === 0 ) return;
    const bounds = new LngLatBounds();
    newMarkers.forEach( marker => bounds.extend( marker.getLngLat()));
    bounds.extend( location );
    this.map.fitBounds(bounds, {
      padding: 200
    });
  }

  getRouteBetweenPoints( start: [number, number], end: [number, number]) {
    this.directionApiClient.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`)
      .subscribe( resp => this.drawPolyline( resp.routes[0] ));
  }
  private drawPolyline( route: Route ) {
    if ( !route ) return;
    // console.log({ kms: route.distance / 1000, duration: route.duration / 60 });
    if ( !this.map ) throw Error('The Map is not initialized');

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();
    coords.forEach( ([ lng, lat ]) => {
      bounds.extend([ lng, lat ]);
    });

    this.map.fitBounds( bounds, {
      padding: 200,
    });

    // PolyLine
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coords
        }
      }
    }
    // TODO: Clean route
    if ( this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString')
      this.map.removeSource('RouteString')
    }
    this.map.addSource( 'RouteString', sourceData );
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        "line-cap": 'round',
        "line-join": 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }
}
