// import 'core-js/es7/reflect';
import {
  Component,
  EventEmitter,
  OnInit,
  Optional,
  Inject,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';

import { FormGroup } from '@angular/forms';
// import { FormioService } from './formio.service';
import {
  DynamicFormDefinition
  /*, FormioOptions*/
} from './o-dynamic-form.common';

// import { FormioEvents } from './formio.events';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { OFormComponent } from 'ontimize-web-ng2/ontimize';

/**
 * The <o-dynamic-form> component.
 */
@Component({
  moduleId: module.id,
  selector: 'o-dynamic-form',
  templateUrl: 'o-dynamic-form.component.html',
  styleUrls: ['o-dynamic-form.component.css'],
  inputs: [
    'dFormDef: form-definition',
    'submission',
    'src',
    'readOnly',
    'editMode : edit-mode'
  ],
  outputs: [
    'render',
    'submit',
    'change',
    'onAddComponent',
    'onEditComponentSettings',
    'onDeleteComponent'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODynamicFormComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  public ready: BehaviorSubject<boolean> = new BehaviorSubject(false);

  dFormDef: DynamicFormDefinition = null;
  readOnly: boolean = false;
  submission: any = {};
  src: string;
  editMode: boolean = false;

  render: EventEmitter<any> = new EventEmitter();
  submit: EventEmitter<any> = new EventEmitter();
  change: EventEmitter<any> = new EventEmitter();

  onAddComponent: EventEmitter<any> = new EventEmitter();
  onEditComponentSettings: EventEmitter<any> = new EventEmitter();
  onDeleteComponent: EventEmitter<any> = new EventEmitter();


  constructor(
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected oForm: OFormComponent
      /*private events: FormioEvents*/) {
    // Nothing to do
  }

  ngOnInit() {
    if (typeof this.editMode === 'string') {
      let val = (<string>this.editMode).toLowerCase();
      this.editMode = (val === 'true' || val === 'yes');
    }
    // this.options = Object.assign({
    //     errors: {
    //         message: 'Please fix the following errors before submitting.'
    //     },
    //     alerts: {
    //         submitMessage: 'Submission Complete.'
    //     }
    // }, this.options);

    if (this.dFormDef) {
      this.ready.next(true);
    }
    // else if (this.src && !this.service) {
    //     this.service = new FormioService(this.src);
    //     this.service.loadForm().subscribe((form: FormioForm) => {
    //         if (form && form.components) {
    //             this.form = form;
    //             this.ready.next(true);
    //         }

    //         // If a submission is also provided.
    //         if (this.service.formio.submissionId) {
    //             this.service.loadSubmission().subscribe((submission: any) => {
    //                 this.submission = submission;
    //                 this.formGroup.setValue(submission.data);
    //                 this.formGroup.disable();
    //             });
    //         }
    //     });
    // }

    // // Subscribe to value changes.
    // //noinspection TypeScriptUnresolvedFunction
    // this.formGroup.valueChanges
    //     .debounceTime(100)
    //     .subscribe((value: any) => {
    //         this.change.emit(value);
    //         this.events.onChange.emit(value);
    //     });

    // // If this is a read only form, then disable the formGroup.
    // if (this.readOnly) {
    //     this.formGroup.disable();
    // }
  }
  onRender() {
    // The form is done rendering.
    this.render.emit(true);
  }

  onDropEnd(event) {
    this.onAddComponent.emit(event.dragData);
  }
}
