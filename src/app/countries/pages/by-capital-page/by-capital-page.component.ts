import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent  implements OnInit {

  public countries:Country[] = [];
  public isLoading: boolean = false;
  public initialValue :string =  ''


  constructor( private CountriesService: CountriesService){}


  ngOnInit(): void {
   this.countries = this.CountriesService.cacheStore.byCapital.countries
   this.initialValue = this.CountriesService.cacheStore.byCapital.term;
  }

//Metodo que recibe el testos del input
  searchByCapital( term: string): void {
    // activar el Loading....
    this.isLoading = true;
  this.CountriesService.searchCapital(term).subscribe(coutries => {
    this.countries = coutries;
    this.isLoading = false;
  });

  }

}
