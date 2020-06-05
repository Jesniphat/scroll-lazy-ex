import { Injectable } from '@angular/core';
import { FactService } from './fact.service';
import { Fact } from '../_model/fact.model';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { DataSource, CollectionViewer} from '@angular/cdk/collections';

export class LazyScrollService extends DataSource<Fact | undefined> {
  private cachedFacts = Array.from<Fact>({ length: 0 });
  private dataStream = new BehaviorSubject<(Fact | undefined)[]>(this.cachedFacts);
  private subscription = new Subscription();

  private pageSize = 10;
  private lastPage = 0;

  private isRequest;

  constructor(private factService: FactService, private api: string = '') {
    super();

    // Start with some data.
    this._fetchFactPage();
    console.log(api);
  }

  connect(collectionViewer: CollectionViewer): Observable<(Fact | undefined)[] | ReadonlyArray<Fact | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const currentPage = this._getPageForIndex(range.end);

      if (currentPage && range) {
        console.log(currentPage, this.lastPage);
      }

      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this._fetchFactPage();
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private _fetchFactPage(): void {
    if (this.isRequest) {
      this.isRequest.unsubscribe();
    }

    this.isRequest = this.factService.getRandomFact(this.api + this.lastPage).subscribe(res => {
      this.cachedFacts = [...this.cachedFacts, ...res];
      this.dataStream.next(this.cachedFacts);
    });
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

}
