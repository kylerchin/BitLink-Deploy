import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-message-text-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-text-box.component.html',
  styleUrl: './message-text-box.component.scss'
})
export class MessageTextBoxComponent {
  @Input() textField : String | undefined;
  @Input() width : number | undefined;
  @Input() height : number | undefined;
}
