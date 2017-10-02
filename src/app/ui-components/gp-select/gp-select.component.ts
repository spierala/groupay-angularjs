import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'gp-select',
  templateUrl: './gp-select.component.html',
  styleUrls: ['./gp-select.component.scss']
})
export class GpSelectComponent {

  @Input() options:any[];
  @Input() selectedOption:any;
  @Output() onOptionSelected = new EventEmitter();

  constructor() { }

  onOptionSelectedCallback(option:any):void {
    this.onOptionSelected.emit(option);
  }
}
