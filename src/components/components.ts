import { NgModule, Compiler, Component, ComponentFactory } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';

let find = require('lodash/find');
let cloneDeep = require('lodash/cloneDeep');

// import { DynamicFormModule } from '../../index';
import { DFComponentMetaData, DFComponentTemplate } from '../o-dynamic-form.template';
import { ODynamicFormEvents } from '../o-dynamic-form.events';

import {
  // OFormComponent,
  ONTIMIZE_MODULES
} from 'ontimize-web-ng2/ontimize';

export interface DFComponentWrapper {
  component?: any;
  element?: any;
  metadata?: DFComponentMetaData;
  module?: any;
  factoryPromise?: Promise<ComponentFactory<any>>;
}

export class DFComponents {
  public static components: DFComponentWrapper = {};

  public static register(
    ontimizeDirective: string,
    component: any,
    // element: any,
    template: DFComponentTemplate
  ) {
    let compTemplate = cloneDeep(template);
    compTemplate.module = compTemplate.module || {};
    compTemplate.component.selector = compTemplate.component.selector || 'odf-' + ontimizeDirective;
    compTemplate.component.inputs = compTemplate.component.inputs || ['component', 'form'];
    // ORIGINAL const decoratedCmp = Component(compTemplate.component)(element);

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
    // compTemplate.module.imports.push(DynamicFormModule);
    compTemplate.module.imports.push(ONTIMIZE_MODULES);

    @NgModule(compTemplate.module)
    class DynamicComponentModule { }

    DFComponents.components[ontimizeDirective] = {
      component: component,
      // element: element,
      metadata: compTemplate.component,
      module: DynamicComponentModule,
      factory: null
    };
  }

  protected static createCustomComponent(compDefinition: any): any {
    @Component(compDefinition)
    class CustomDynamicComponent { }
    return CustomDynamicComponent;
  }

  public static createComponent(ontimizeDirective: string, form: FormGroup, component: any, events: ODynamicFormEvents, data: any): any {
    if (!DFComponents.components.hasOwnProperty(ontimizeDirective)) {
      ontimizeDirective = 'custom';
    }
    let comp: DFComponentWrapper = DFComponents.components[ontimizeDirective];
    return new comp.component(form, component, events, data);
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
        let factory = find(moduleWithFactories.componentFactories, { selector: ontimizeDirective });
        return factory;
      });
    return DFComponents.components[ontimizeDirective].factoryPromise;
  }
}
