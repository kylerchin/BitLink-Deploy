import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-text-input-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-input-box.component.html',
  styleUrl: './text-input-box.component.scss'
})
export class TextInputBoxComponent {
  @Input() textField : String | undefined;
  @Input() width : number | undefined;
  @Input() height : number | undefined;
}
