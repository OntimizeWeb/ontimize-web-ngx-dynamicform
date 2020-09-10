import { ComponentFactory } from '@angular/core';

import { DFComponentMetaData } from './df-component-metadata.interface';

export interface DFComponentWrapper {
  component?: any;
  element?: any;
  metadata?: DFComponentMetaData;
  module?: any;
  factoryPromise?: Promise<ComponentFactory<any>>;
}
