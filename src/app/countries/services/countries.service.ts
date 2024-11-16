import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital: {
      term:'', countries: [] },

    byCountries: {
      term:'', countries: [] },

    byRegion: {
      region:'', countries: [] }

  }




  constructor(private http: HttpClient) {
    // cargar el local storage
    this.loadFromLocalStorage();
   }


  // Metodo para Guardar en el LocalStorage
  private saveToLocalStorage() {
 localStorage.setItem( 'cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

// Metodo para centralizar las peticiones
private getCountriesRequest(url:string): Observable<Country[]>{
  return this.http.get<Country[]>( url ).pipe(
    catchError( () => of([])),
    //delay(2000)
  );

}



//metodo de busqueda del url de ID
  searchContryByAlphaCode( code: string): Observable<Country | null> {

    const url= ` ${ this.apiUrl }/alpha/${ code } `;

    return this.http.get<Country[]> (url)
    .pipe(
      map( countries => countries.length > 0? countries[0]: null ),
      catchError( () => of(null))
    );
  }





  // Metodo para cosultar por capital
  searchCapital( term: string ): Observable<Country[]> {

    const url= ` ${ this.apiUrl }/name/${ term } `;
    return this.getCountriesRequest(url).pipe(tap(
      countries => this.cacheStore.byCapital = { term, countries}),
    tap( () => this.saveToLocalStorage)
  );
  }

    // Metodo para cosultar por Pais
  searchByContry( term: string ): Observable<Country[]> {

    const url= ` ${ this.apiUrl }/name/${ term } `;
    return this.getCountriesRequest(url).pipe(tap(
      countries => this.cacheStore.byCountries = { term, countries}),
      tap( () => this.saveToLocalStorage)
    );
  }

  searchByRegion( region: Region): Observable<Country[]> {

    const url= ` ${ this.apiUrl }/region/${ region } `;
    return this.getCountriesRequest(url).pipe(tap(
      countries => this.cacheStore.byRegion = { region, countries}),
      tap( () => this.saveToLocalStorage));


  }

}
