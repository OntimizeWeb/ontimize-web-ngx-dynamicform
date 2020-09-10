import { NgModule } from '@angular/core';

import { DFComponentMetaData } from './df-component-metadata.interface';

export interface DFComponentTemplate {
  component: DFComponentMetaData;
  module?: NgModule;
}
