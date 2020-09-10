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

import { BaseComponent } from '../../components/base';
import { DFComponents } from '../../components/components';
import { BaseOptions } from '../../interfaces/base-options.interface';
import { ODynamicFormEvents } from '../../services/o-dynamic-form-events.service';
import { ODFElementComponent } from '../dynamic-form-element/o-dynamic-form-element.component';

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

  public component: BaseOptions<T>;

  public label: string | boolean;
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

  public addComponent(): void {
    const component = DFComponents.createComponent(
      this.component,
      this.events,
      this.injector
    );
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
