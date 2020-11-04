import { Component, HostBinding, Injector, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'ontimize-web-ngx';

import { BaseComponent } from '../../components/base.component';
import { ODynamicFormGeneralEvents } from '../../services';

@Component({
  selector: 'odf-element-options',
  templateUrl: './o-dynamic-form-element-options.component.html',
  styleUrls: ['./o-dynamic-form-element-options.component.scss'],
  inputs: [
    'component'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODFElementOptionsComponent {
  protected generalEventsService: ODynamicFormGeneralEvents;
  protected dialogService: DialogService;

  @HostBinding('class.odf-element-options') get odfElementOptionsClass() { return true; }

  constructor(protected injector: Injector) {
    this.generalEventsService = this.injector.get(ODynamicFormGeneralEvents);
    this.dialogService = this.injector.get(DialogService);
  }
  public component: BaseComponent<any>;

  public onEditOdfElement(): void {
    this.generalEventsService.editComponent(this.component.getComponentAttr());
  }

  public onDeleteOdfElement(): void {
    this.dialogService.confirm('CONFIRM', 'MESSAGES.CONFIRM_DELETE').then(res => {
      if (res === true) {
        this.generalEventsService.deleteComponent(this.component.getComponentAttr());
      }
    });
  }

}
