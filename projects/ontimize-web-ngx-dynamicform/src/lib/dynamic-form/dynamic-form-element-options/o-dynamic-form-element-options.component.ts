import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'ontimize-web-ngx';

import { BaseComponent } from '../../components/base.component';
import { ODynamicFormGeneralEvents } from '../../services';

@Component({
  selector: 'odf-element-options',
  templateUrl: './o-dynamic-form-element-options.component.html',
  inputs: [
    'component',
    // 'editComponentSettingsEmitter : edit-component-settings-emitter',
    // 'deleteComponentEmitter : delete-component-emitter'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODFElementOptionsComponent {
  protected generalEventsSevice: ODynamicFormGeneralEvents;
  protected dialogService: DialogService;

  constructor(protected injector: Injector) {
    this.generalEventsSevice = this.injector.get(ODynamicFormGeneralEvents);
    this.dialogService = this.injector.get(DialogService);
  }
  public component: BaseComponent<any>;

  public onEditOdfElement(): void {
    this.generalEventsSevice.editComponent.emit({
      component: this.component
    });
  }

  public onDeleteOdfElement(): void {
    this.dialogService.confirm('CONFIRM', 'MESSAGES.CONFIRM_DELETE').then(res => {
      if (res === true) {
        this.generalEventsSevice.componentDeleted.emit({
          component: this.component
        });
      }
    });
  }

}
