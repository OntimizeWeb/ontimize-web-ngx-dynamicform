import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

import { BaseComponent } from '../../components/base.component';
import { OColumnComponent } from '../../components/container/o-column';
import { ORowComponent } from '../../components/container/o-row';
import { NifFieldComponent } from '../../components/input/nif-input/o-nif-input';
import { TextFieldComponent } from '../../components/input/text-input/o-text-input';
import { BaseOptions } from '../../interfaces/base-options.interface';
import { ODynamicFormEvents } from '../../services/o-dynamic-form-events.service';
import { ODFElementComponent } from '../dynamic-form-element/o-dynamic-form-element.component';


const paths = {
  'o-column': OColumnComponent,
  'o-nif-input': NifFieldComponent,
  'o-text-input': TextFieldComponent,
  'o-row': ORowComponent
}

@Component({
  selector: 'odf-component',
  templateUrl: './o-dynamic-form-component.component.html',
  inputs: [
    'component',
    'editMode : edit-mode',
    'addComponentEmitter : add-component-emitter',
    'moveComponentEmitter : move-component-emitter',
    'editComponentSettingsEmitter : edit-component-settings-emitter',
    'deleteComponentEmitter : delete-component-emitter'
  ],
  outputs: [
    'render'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODFComponentComponent<T> implements OnInit {

  public show: boolean = true;
  public components: Array<BaseComponent<any>> = [];

  public label: string | boolean;

  public component: BaseOptions<T>;
  public editMode: boolean = false;
  public addComponentEmitter: EventEmitter<any>;
  public moveComponentEmitter: EventEmitter<any>;
  public editComponentSettingsEmitter: EventEmitter<any>;
  public deleteComponentEmitter: EventEmitter<any>;

  public render: EventEmitter<any> = new EventEmitter();

  public isDragEnabled: boolean = false;

  @ViewChild('odfElement', { static: false })
  protected odfElement: ODFElementComponent;

  constructor(
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected oForm: OFormComponent,
    protected elRef: ElementRef,
    protected injector: Injector,
    private events: ODynamicFormEvents
  ) { }

  public ngOnInit(): void {
    // Add the initial component.
    this.addComponent();
    this.events.onChange.subscribe(() => this.checkConditions());
  }

  public checkConditions(): void {
    this.show = true;
  }

  public async addComponent(): Promise<void> {

    const DynamicComponent = paths[this.component['ontimize-directive']];

    const component = new DynamicComponent(this.component, this.events, this.injector);
    // const component = DFComponents.createComponent(
    //   this.component,
    //   this.events,
    //   this.injector
    // );
    if (component) {
      // Set the index and readOnly flag.
      component.index = this.components.length;
      // Add this to the instances.
      this.components.push(component);
    } else {
      // component wasnt created (triggering render so the dynamic-form would trigger render event correctly)
      this.render.emit(true);
    }
    return component;
  }

  public removeAt(index: number): void {
    this.components.splice(index, 1);
  }

  public isContainerComponent(component: BaseComponent<any>): boolean {
    return component.isContainerComponent();
  }

  public getDraggableData(): BaseComponent<any> {
    return this.odfElement ? this.odfElement.component : null;
  }

  public drop(event: CdkDragDrop<BaseComponent<any>[]>) {
    moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  }
}
