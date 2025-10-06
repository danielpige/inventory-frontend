import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss',
})
export class HeaderPageComponent {
  @Input() title: string | undefined = '';
  @Input() subtitle: string | undefined = '';
  @Input() icon = '';
  @Input() hasButtonOne = false;
  @Input() hasButtonTwo = false;
  @Input() titleButtonOne = '';
  @Input() titleButtonTwo = '';
  @Input() iconButtonOne = '';
  @Input() iconButtonTwo = '';
  @Output() actionButton = new EventEmitter<'one' | 'two'>();

  action(button: 'one' | 'two'): void {
    this.actionButton.emit(button);
  }
}
