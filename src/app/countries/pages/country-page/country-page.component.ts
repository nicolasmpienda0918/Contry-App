import { Country } from '../../interfaces/country.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'country-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

public country?: Country ;


  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router : Router

   ){}


  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchContryByAlphaCode(id)  )
    ).subscribe( country => {

      if(!country){
        return this.router.navigateByUrl('')
      };
     return this.country = country;

    })


   }

   searchContry( code: string) {
this.countriesService.searchContryByAlphaCode(code).subscribe( country => {
  console.log({country})
})

   }


}
