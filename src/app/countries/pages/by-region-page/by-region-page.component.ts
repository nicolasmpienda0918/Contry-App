import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';





@Component({
  selector: 'country-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent  implements  OnInit{


  public countries:Country[] = [];
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania',]
  public selectedRegion?: Region;



  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byRegion.countries
    this.selectedRegion = this.CountriesService.cacheStore.byRegion.region;
   }

constructor( private CountriesService: CountriesService) {}

  searchByRegion( region: Region): void {

    this.selectedRegion = region;

    this.CountriesService.searchByRegion(region).subscribe(coutries => {
      this.countries = coutries;
    });

}

}
