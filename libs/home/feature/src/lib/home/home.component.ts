import { AccountService, AuthService } from '@agroloc/account/data-acess';
import {
  Categoria,
  MachineryService,
  Maquina,
} from '@agroloc/machinery/data-access';
import { SearchService } from '@agroloc/shared/data-access';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RentService } from '@agroloc/rent/data-access';
import {
  BehaviorSubject,
  ReplaySubject,
  combineLatest,
  debounceTime,
  map,
  take,
} from 'rxjs';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { ViewportScroller } from '@angular/common';

interface ListMachineryCategory {
  Category: string;
  Machinery: Maquina[];
}

interface ListOneMachineryCategory {
  Category: string;
  Machinery: string;
}

@Component({
  selector: 'agroloc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchService = inject(SearchService);
  machineryService = inject(MachineryService);
  platform = inject(Platform);
  accountService = inject(AccountService);
  authService = inject(AuthService);
  snackbar = inject(MatSnackBar);
  rentService = inject(RentService);
  router = inject(Router);
  scrollDispatcher = inject(ScrollDispatcher);
  viewportScroller = inject(ViewportScroller);
  changeDetectorRef = inject(ChangeDetectorRef);

  isMobile = this.platform.ANDROID || this.platform.IOS;

  images: any[] = [
    {
      itemImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      thumbnailImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      alt: 'Description for Image 1',
      title: 'Tratores',
    },
    {
      itemImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      thumbnailImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      thumbnailImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      thumbnailImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      thumbnailImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      thumbnailImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      thumbnailImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      thumbnailImageSrc:
        'https://th.bing.com/th/id/R.c95aa3a74d8b27cf0307dae454600865?rik=ccCHC0htJbJuCQ&pid=ImgRaw&r=0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
  ];

  allMachinery = new ReplaySubject<Maquina[]>(1);
  allMachinery$ = this.allMachinery.asObservable();

  allCategories = new ReplaySubject<Categoria[]>(1);
  allCategories$ = this.allCategories.asObservable();

  responsiveOptions: any[] | undefined;
  responsiveOptionsInitial: any[] | undefined;

  listMachineryCategory: ListMachineryCategory[] = [];
  listOneMachineryCategory: ListOneMachineryCategory[] = [];

  lastScrollPosition = 0;
  showButton = new BehaviorSubject<boolean>(false);
  showButton$ = this.showButton.asObservable().pipe(
    map((response) => {
      if (response) {
        setTimeout(() => {
          this.changeDetectorRef.detectChanges();
        }, 1000);
      }
      return response;
    })
  );
  elementScrollRef: CdkScrollable;

  ngOnInit() {
    this.searchService.changeNavTab('Inicio');

    this.searchService.searchMachineriesAll().subscribe((response) => {
      this.allMachinery.next(response);
    });

    this.machineryService
      .findAllCategories()
      .pipe(
        map((response) => {
          return response.filter((category) => category.Tipo === 'Maquina');
        })
      )
      .subscribe((response) => {
        this.allCategories.next(response);
      });

    combineLatest([this.allCategories$, this.allMachinery$])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([category, machinery]) => {
        category.forEach((value) => {
          const machineryFilter = machinery.filter(
            (maquina) => maquina?.Categoria?.Nome === value.Nome
          );
          if (machineryFilter.length !== 0) {
            const relationMachineryCategory: ListMachineryCategory = {
              Category: value.Nome,
              Machinery: machineryFilter,
            };
            this.listMachineryCategory.push(relationMachineryCategory);

            this.listOneMachineryCategory = this.listMachineryCategory.map(
              (value) => {
                return {
                  Category: value.Category,
                  Machinery: value.Machinery[0].ImagemPrincipal.Url,
                };
              }
            );
          }
        });
      });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.responsiveOptionsInitial = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];

    this.scrollDispatcher.scrolled().subscribe((response) => {
      if (response instanceof CdkScrollable) {
        this.elementScrollRef = response;

        const currentScrollPosition =
          response.getElementRef().nativeElement.scrollTop;

        if (currentScrollPosition > 400) {
          this.showButton.next(true);
        } else {
          this.showButton.next(false);
        }
        this.lastScrollPosition = currentScrollPosition;
      }
    });
  }

  calculateAverageRating(avaliacoes: any[]) {
    if (avaliacoes && avaliacoes.length > 0) {
      const totalNivel = avaliacoes.reduce(
        (total, avaliacao) => total + avaliacao.Nivel,
        0
      );
      return (totalNivel / avaliacoes.length).toFixed(1);
    }
    return 'N/A';
  }

  onSelectedItem(itemId: string) {
    this.router.navigate(['web', 'main', 'details']);
    this.searchService.onSelectItem(itemId);
    this.scrollToTop();
  }

  onSelectedCategory(category: string) {
    this.router.navigate(['web', 'main', 'search']);
    this.searchService.setCategoria(category);
    this.scrollToTop();
  }

  scrollToTop() {
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 1000);
    if (this.elementScrollRef.scrollTo !== undefined) {
      this.elementScrollRef.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
