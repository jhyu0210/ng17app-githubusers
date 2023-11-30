import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { GhUserModel } from '../shared/model';

@Injectable({
  providedIn: 'root',
})
export class GhUsersService {
  http = inject(HttpClient);

  searchUsers(query: string): Observable<GhUserModel[]> {
    const res = this.http
      .get<GhUserModel[]>(`https://api.github.com/search/users?q=${query}`)
      .pipe(map((response: any) => response.items));

    // res.pipe(tap((v) => console.log(v)));
    return res;
  }
}
