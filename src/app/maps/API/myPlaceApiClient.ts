import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class myPlaceApiClient extends HttpClient {
  public baseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  constructor( handler: HttpHandler ) {
    super( handler );
  }
  public override get<T>( url: string ) {
    url = this.baseUrl + url;
    return super.get<T>( url, {
      params: {
        access_token: environment.apiKey,
      }
    })
  }
}