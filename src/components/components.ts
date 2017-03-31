let find = require('lodash/find');
let cloneDeep = require('lodash/cloneDeep');

import {
  NgModule,
  Compiler,
  Component,
  ComponentFactory,
  ViewChild,
  EventEmitter
} from '@angular/core';

import { DndModule } from 'ng2-dnd';
import { ONTIMIZE_MODULES } from 'ontimize-web-ng2/ontimize';

import { BaseComponent } from './base';
import { DynamicFormModule } from '../../index';
import { DFComponentMetaData, DFComponentTemplate } from '../o-dynamic-form.template';
import { ODynamicFormEvents } from '../o-dynamic-form.events';

export interface DFComponentWrapper {
  component?: any;
  element?: any;
  metadata?: DFComponentMetaData;
  module?: any;
  factoryPromise?: Promise<ComponentFactory<any>>;
}

// export class BaseElement<T> {
// }

export class DFComponents {
  public static components: DFComponentWrapper = {};

  public static register(
    ontimizeDirective: string,
    component: any,
    template: DFComponentTemplate
  ) {
    let compTemplate = cloneDeep(template);
    compTemplate.module = compTemplate.module || {};
    compTemplate.component.selector = compTemplate.component.selector || 'odf-' + ontimizeDirective;
    compTemplate.component.inputs = compTemplate.component.inputs || ['component', 'data'];

    let decoratedCmp = this.createCustomComponent(compTemplate.component);

    // Dynamic module
    if (!compTemplate.module.declarations) {
      compTemplate.module.declarations = [];
    }
    compTemplate.module.declarations.push(decoratedCmp);
    if (!compTemplate.module.imports) {
      compTemplate.module.imports = [];
    }
    // compTemplate.module.imports.push(CommonModule);
    // compTemplate.module.imports.push(ReactiveFormsModule);
    compTemplate.module.imports.push(DynamicFormModule);
    compTemplate.module.imports.push(DndModule);
    compTemplate.module.imports.push(ONTIMIZE_MODULES);

    @NgModule(compTemplate.module)
    class DynamicComponentModule { }

    DFComponents.components[ontimizeDirective] = {
      component: component,
      metadata: compTemplate.component,
      module: DynamicComponentModule,
      factory: null
    };
  }

  public static createComponent(component: any, events: ODynamicFormEvents, data: any): any {
    let ontimizeDirective: string = component['ontimize-directive'];
    let comp: DFComponentWrapper = DFComponents.components[ontimizeDirective];
    if (!comp) {
      console.warn('There is a wrong component definition (ontimize-directive ="%s" does not exists): %O',ontimizeDirective, component);
      return undefined;
    }
    return new comp.component(component, events, data);
  }

  public static element(
    ontimizeDirective: string,
    compiler: Compiler
  ): Promise<ComponentFactory<any>> {
    if (!DFComponents.components.hasOwnProperty(ontimizeDirective)) {
      ontimizeDirective = 'custom';
    }
    if (DFComponents.components[ontimizeDirective].factoryPromise) {
      return DFComponents.components[ontimizeDirective].factoryPromise;
    }
    DFComponents.components[ontimizeDirective].factoryPromise = compiler.compileModuleAndAllComponentsAsync(DFComponents.components[ontimizeDirective].module)
      .then((moduleWithFactories) => {
        let factory = find(moduleWithFactories.componentFactories, { selector: 'odf-' + ontimizeDirective });
        return factory;
      });
    return DFComponents.components[ontimizeDirective].factoryPromise;
  }

  protected static createCustomComponent(compDefinition: any): any {
    @Component(compDefinition)
    class CustomDynamicComponent {

      @ViewChild('ontimizeComponent')
      ontimizeComponent: any;

      formGroupSubs: any;

      component: BaseComponent<any>;
      render: EventEmitter<any>;

      renderCount: number = 0;

      get numComponents(): number {
        return this.component.getNumComponents();
      }

      ngOnInit() {
        this.setOntimizeComponentInputs();
      }

      ngAfterViewInit() {
        this.onRender();
      }

      setOntimizeComponentInputs() {
        if (this.component && this.ontimizeComponent) {
          let inputsMapping = this.component.getInputsMapping();
          for (var i = 0; i < inputsMapping.length; i++) {
            let curr = inputsMapping[i];
            if (this.component.settings.hasOwnProperty(curr.input)) {
              this.ontimizeComponent[curr.propName] = this.component.settings[curr.input];
            }
          }
        }
      }

      onRender() {
        if (!this.render) {
          return;
        }
        if (this.renderCount > this.numComponents) {
          return;
        }
        this.renderCount++;
        if (this.renderCount > this.numComponents) {
          this.render.emit(true);
        }
      }
    }
    return CustomDynamicComponent;
  }
}
