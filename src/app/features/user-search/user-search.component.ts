import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
  signal,
} from '@angular/core';
import {
  Observable,
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { GhUsersService } from '../../core/gh-users.service';
import { GhUserModel } from '../../shared/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      #input
      type="text"
      class="border-2 border-slate-600 rounded-lg  p-2 w-full outline-0"
      (input)="searchTerm.set(input.value)"
    />
    <ul class="mt-4">
      @for(item of ghUsers(); track item.id){
      <li
        class="border border-slate-400 rounded-lg flex mt-4 items-center pt-2 pb-2"
      >
        <img
          [src]="item.avatar_url"
          alt="item.id"
          class="rounded-full w-12 h-12 ml-2 mr-4"
        />
        {{ item.login }}
      </li>
      } @empty {
      <p>no data</p>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent {
  searchTerm = signal('keru');
  private ghUsersService = inject(GhUsersService);

  ghUsers: Signal<GhUserModel[]> = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((term) => term.length > 0),
      switchMap((term) => this.ghUsersService.searchUsers(term))
      // tap((v) => console.log(v))
    ),
    {
      initialValue: [],
    }
  );
}
