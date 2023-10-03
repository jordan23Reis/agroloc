import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'agroloc-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  platform = inject(Platform);

  isMobile = this.platform.ANDROID || this.platform.IOS;
  arquivos = [
    'https://th.bing.com/th/id/OIP.q2eACHR4I3LNquamNg3u4wHaEP?w=314&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CqVN7Yix_uV5atK919oc0AHaD9?w=308&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.GSCZ95yj_1-oFLy875P7AgHaE8?w=269&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/R.3650d5b5c420d04c0892fd1e77932841?rik=%2fZCdDEwdKBlcSQ&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/OIP.XCqmJF7rI8ZIifBtwYzrzgHaFj?pid=ImgDet&w=800&h=600&rs=1',
    'https://static.landwirt.com/3815-8c807013d5e97e5083fa764e4065e16e-3361002-1vb.jpg',
    'https://th.bing.com/th/id/OIP.UfZqnA8ZmlQs-XyTNSeHmgHaHa?pid=ImgDet&w=600&h=600&rs=1',
    'https://th.bing.com/th/id/OIP.q2eACHR4I3LNquamNg3u4wHaEP?w=314&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CqVN7Yix_uV5atK919oc0AHaD9?w=308&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.GSCZ95yj_1-oFLy875P7AgHaE8?w=269&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/R.3650d5b5c420d04c0892fd1e77932841?rik=%2fZCdDEwdKBlcSQ&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/OIP.XCqmJF7rI8ZIifBtwYzrzgHaFj?pid=ImgDet&w=800&h=600&rs=1',
    'https://static.landwirt.com/3815-8c807013d5e97e5083fa764e4065e16e-3361002-1vb.jpg',
    'https://th.bing.com/th/id/OIP.UfZqnA8ZmlQs-XyTNSeHmgHaHa?pid=ImgDet&w=600&h=600&rs=1',
  ];
  product = {
    foto: 'foto aqui',
    titulo:
      'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
    descricao:
      'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado , Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
    preco: 'R$4.249,00',
    avaliacao: '4.9',
    locatario: 'Loja oficial Apple',
    like: 'like aqui',
  };
}
