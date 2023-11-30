import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  template: ` <p>user-details works!</p> `,
  styles: ``,
})
export class UserDetailsComponent {
  @Input() username!: string;
}
