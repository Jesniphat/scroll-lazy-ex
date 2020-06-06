import { Component, OnInit } from '@angular/core';
import { FactService } from '../_service/fact.service';

@Component({
  selector: 'app-ngx-scroller',
  templateUrl: './ngx-scroller.component.html',
  styleUrls: ['./ngx-scroller.component.scss']
})
export class NgxScrollerComponent implements OnInit {
  page = 0;
  dataList = [];

  constructor(private factService: FactService) { }

  ngOnInit() {
    this.facthValue();
  }

  public onScroll() {
    this.page += 1;
    this.facthValue();
  }

  private facthValue() {
    if (this.page >= 0) {
      this.factService.getRandomFact('http://localhost:3000/api/paging?page=' + this.page).subscribe(res => {
        console.log(res);
        this.dataList = [...this.dataList, ...res];
      });
    }
  }

}
