import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-post-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-post-popup.component.html',
  styleUrl: './create-post-popup.component.scss',
})
export class CreatePostPopupComponent {
  @Output() showChange = new EventEmitter<boolean>();
  @Input() show: boolean = false;
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      title: [''],
      content: [''],
    });
  }
  closepopup() {
    this.show = false;
    this.showChange.emit(this.show);
  }
  submit() {
    this.closepopup();
    const title = this.myForm.get('title')?.value ?? '';
    const content = this.myForm.get('content')?.value ?? '';
  }
}
