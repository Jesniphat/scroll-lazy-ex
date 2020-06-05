import { Component, OnInit } from '@angular/core';
import { Fact } from '../_model/fact.model';
import { FactService } from '../_service/fact.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription, Subscribable } from 'rxjs';
import { LazyScrollService } from '../_service/lazy-scroll';


@Component({
  selector: 'app-fact-scroller',
  templateUrl: './fact-scroller.component.html',
  styleUrls: ['./fact-scroller.component.scss']
})
export class FactScrollerComponent implements OnInit {

  dataSource: LazyScrollService;

  constructor(private factService: FactService) {
    // tslint:disable-next-line: no-use-before-declare
    // this.dataSource = new FactsDataSource(factService);
  }

  public ngOnInit() {
    this.dataSource = new LazyScrollService(this.factService, 'http://localhost:3000/api/paging?page=');
  }

}
