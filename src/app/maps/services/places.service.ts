import { Injectable } from '@angular/core';

import { PlacesApiClient } from '../API';
import { MapService } from './map.service';

import { Feature, PlacesResponse } from './../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public location? : [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.location;
  }

  constructor( private placesApi: PlacesApiClient,private mapService: MapService ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(( {coords, timestamp} ) => {
        this.location = [coords.longitude, coords.latitude];
        resolve(this.location);
      },
      err => {
        console.log(err);
        alert('We cannot find your geolocalization');
        reject();
      })
    })
  }

  getPlacesByQuery( query: string = '' ) {
    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    if ( !this.location ) throw Error('There is not user location')
    this.placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: this.location!.join(',')
      }
    })
      .subscribe( ({features}) => {
        // console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = features;
        this.mapService.createMarkersFromPlace( this.places, this.location! );
      })
  }

  deletePlaces() {
    this.places = [];
  }
}
