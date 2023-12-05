import { SearchService } from '@agroloc/shared/data-access';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'agroloc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchService = inject(SearchService);

  ngOnInit() {
    this.searchService.changeNavTab('Inicio');
  }
}
