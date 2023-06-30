import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRouter: ActivatedRoute,
    private countriesService: ContriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchContryByAlphaCode(id))
      )
      .subscribe((Country) => {
        if (!Country) return this.router.navigateByUrl('/countries');
        return this.country = Country;
      });
  }
}
