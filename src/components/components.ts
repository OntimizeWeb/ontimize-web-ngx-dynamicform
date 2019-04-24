import { Compiler, Component, ComponentFactory, EventEmitter, NgModule, ViewChild } from '@angular/core';
import { DndModule } from '@churchs19/ng2-dnd';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { DynamicFormModule } from '../../index';
import { ODynamicFormEvents } from '../o-dynamic-form.events';
import { DFComponentMetaData, DFComponentTemplate } from '../o-dynamic-form.template';
import { BaseComponent } from './base';

export interface DFComponentWrapper {
  component?: any;
  element?: any;
  metadata?: DFComponentMetaData;
  module?: any;
  factoryPromise?: Promise<ComponentFactory<any>>;
}

export class DFComponents {

  public static components: DFComponentWrapper = {};

  public static register(ontimizeDirective: string, component: any, template: DFComponentTemplate): void {
    const compTemplate = JSON.parse(JSON.stringify(template));
    compTemplate.module = compTemplate.module || {};
    compTemplate.component.selector = compTemplate.component.selector || 'odf-' + ontimizeDirective;
    compTemplate.component.inputs = compTemplate.component.inputs || ['component', 'data'];

    const decoratedCmp = this.createCustomComponent(compTemplate.component);

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
    compTemplate.module.imports.push(OntimizeWebModule);

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
    const ontimizeDirective: string = component['ontimize-directive'];
    const comp: DFComponentWrapper = DFComponents.components[ontimizeDirective];
    if (!comp) {
      console.warn('There is a wrong component definition (ontimize-directive ="%s" does not exists): %O', ontimizeDirective, component);
      return undefined;
    }
    return new comp.component(component, events, data);
  }

  public static element(ontimizeDirective: string, compiler: Compiler): Promise<ComponentFactory<any>> {
    if (!DFComponents.components.hasOwnProperty(ontimizeDirective)) {
      ontimizeDirective = 'custom';
    }
    if (DFComponents.components[ontimizeDirective].factoryPromise) {
      return DFComponents.components[ontimizeDirective].factoryPromise;
    }
    DFComponents.components[ontimizeDirective].factoryPromise =
      compiler.compileModuleAndAllComponentsAsync(DFComponents.components[ontimizeDirective].module).then(moduleWithFactories => {
        const factory = moduleWithFactories.componentFactories.find(a => a.selector === 'odf-' + ontimizeDirective);
        return factory;
      });
    return DFComponents.components[ontimizeDirective].factoryPromise;
  }

  protected static createCustomComponent(compDefinition: any): any {
    @Component(compDefinition)
    class CustomDynamicComponent {

      @ViewChild('ontimizeComponent')
      public ontimizeComponent: any;

      public formGroupSubs: any;

      public component: BaseComponent<any>;
      public render: EventEmitter<any>;

      public renderCount: number = 0;

      get numComponents(): number {
        return this.component.getNumComponents();
      }

      public ngOnInit(): void {
        this.setOntimizeComponentInputs();
      }

      public ngAfterViewInit(): void {
        this.onRender();
      }

      public setOntimizeComponentInputs(): void {
        if (this.component && this.ontimizeComponent) {
          const inputsMapping = this.component.getInputsMapping();
          inputsMapping.forEach(curr => {
            if (this.component.settings.hasOwnProperty(curr.input)) {
              this.ontimizeComponent[curr.propName] = this.component.settings[curr.input];
            }
          });
        }
      }

      public onRender(): void {
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
