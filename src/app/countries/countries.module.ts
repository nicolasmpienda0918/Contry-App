import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountriesPageComponent } from './pages/by-countries-page/by-countries-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountriesRoutingModule } from './countries-routing.module';

import { SharedModule } from '../shared/shared.module';
import { CountryTableComponent } from './components/country-table/country-table.component';
import Swal from 'sweetalert2'




@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByCountriesPageComponent,
    ByRegionPageComponent,
    CountryPageComponent,
    CountryTableComponent,

  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule,
  

  ]
})
export class CountriesModule { }

