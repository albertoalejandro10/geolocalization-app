import { Component } from '@angular/core';

@Component({
  selector: 'geo-angular-logo',
  templateUrl: './angular-logo.component.html',
  styleUrls: ['./angular-logo.component.scss']
})
export class AngularLogoComponent {
  sendToAngularDocs() {
    if ( !window.confirm('Are you sure you want to go to AngularDocs?') ) return
    window.location.href = 'https://angular.io/docs';
  }
}
