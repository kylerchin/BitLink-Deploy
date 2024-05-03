import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss',
})
export class ReplyComponent {
  @Input() textField: String = '';
  @Input() profile_picture: string = '';
}
