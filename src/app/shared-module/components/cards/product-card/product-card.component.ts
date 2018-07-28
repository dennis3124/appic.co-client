import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  @Input('post') post;

  private imgSrc = [
    '../../../../assets/images/img1.jpg',
    '../../../../assets/images/img2.jpg',
    '../../../../assets/images/img3.jpg',
    '../../../../assets/images/img4.jpg',
    '../../../../assets/images/img5.jpg',
  ];

  constructor() {}
  ngOnInit() {}
}
