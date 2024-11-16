import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'country-by-countries-page',
  templateUrl: './by-countries-page.component.html',
  styles: ``
})
export class ByCountriesPageComponent  implements OnInit {

  public countries:Country[] = [];
  public isLoading: boolean = false;
  public initialValue :string =  '';

  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byCountries.countries
    this.initialValue = this.CountriesService.cacheStore.byCountries.term;
   }

constructor ( private CountriesService: CountriesService) {}

searchByContry( term: string):void {
   // activar el Loading....
   this.isLoading = true;
  this.CountriesService.searchByContry(term).subscribe(coutries => {
    this.countries = coutries;
     // desactivar el Loading....
    this.isLoading = false;
  });
}

}
