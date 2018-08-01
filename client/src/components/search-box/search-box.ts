import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs/Subject';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { SearchProvider } from '../../providers/search/search';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Result } from '../../utils';

/**
 * Generated class for the SearchBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-box',
  templateUrl: 'search-box.html'
})
export class SearchBoxComponent implements OnInit {

  @Output() onClick: EventEmitter<any> = new EventEmitter();
  
  results$: Observable<Result[]>; //stream of users  

  private searchTerms = new Subject<string>();
  
  private urlToTag: string = 'assets/imgs/hashtag.jpg';

  constructor(private searchService: SearchProvider) {}

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.results$ = this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          console.log(term);
          if (!term.startsWith('#')) {
            return this.searchService.searchUsers(term) 
          } else {
            return this.searchService.searchTags(term.split('#')[1])
          }
        }
      )
    );
  }

  handle($result) {
    console.log($result);
    this.onClick.emit($result);
  }

}
