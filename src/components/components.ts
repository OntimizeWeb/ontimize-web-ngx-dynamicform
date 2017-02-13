import { NgModule, Compiler, Component, ComponentFactory } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

let find = require('lodash/find');
let cloneDeep = require('lodash/cloneDeep');

import { DynamicFormModule } from '../../index';
import { DFComponentMetaData, DFComponentTemplate } from '../o-dynamic-form.template';
import { ODynamicFormEvents } from '../o-dynamic-form.events';

import { OFormComponent, ONTIMIZE_MODULES } from 'ontimize-web-ng2/ontimize';

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
    name: string,
    component: any,
    element: any,
    template: DFComponentTemplate
  ) {
    let compTemplate = cloneDeep(template);
    compTemplate.module = compTemplate.module || {};
    compTemplate.component.selector = compTemplate.component.selector || 'odf-' + name;
    compTemplate.component.inputs = compTemplate.component.inputs || ['component', 'form'];
    const decoratedCmp = Component(compTemplate.component)(element);
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
    // compTemplate.module.imports.push(ONTIMIZE_MODULES);

    @NgModule(compTemplate.module)
    class DynamicComponentModule { }

    DFComponents.components[name] = {
      component: component,
      element: element,
      metadata: compTemplate.component,
      module: DynamicComponentModule,
      factory: null
    };
  }
  // public static createComponent(name: string, form: FormGroup, component: any, events: ODynamicFormEvents, data: any): any {
  //   if (!DFComponents.components.hasOwnProperty(name)) {
  //     name = 'custom';
  //   }
  //   let comp: DFComponentWrapper = DFComponents.components[name];
  //   return new comp.component(form, component, events, data);
  // }

  public static createComponent(name: string, form: OFormComponent, component: any, events: ODynamicFormEvents, injector: any): any {
    if (!DFComponents.components.hasOwnProperty(name)) {
      name = 'custom';
    }
    let comp: DFComponentWrapper = DFComponents.components[name];
    return new comp.component(form, component, injector);
  }

  public static element(
    name: string,
    compiler: Compiler
  ): Promise<ComponentFactory<any>> {
    if (!DFComponents.components.hasOwnProperty(name)) {
      name = 'custom';
    }
    if (DFComponents.components[name].factoryPromise) {
      return DFComponents.components[name].factoryPromise;
    }
    DFComponents.components[name].factoryPromise = compiler.compileModuleAndAllComponentsAsync(DFComponents.components[name].module)
      .then((moduleWithFactories) => {
        let factory = find(moduleWithFactories.componentFactories, { selector: name });
        return factory;
      });
    return DFComponents.components[name].factoryPromise;
  }
}
