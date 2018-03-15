## 2.0.2 (2017-01-18)
### PEER-DEPENDENCY UPDATES ###
* **Updated**:   ontimize-web-ngx@2.1.0-rc.3
* **Updated**:   ontimize-web-ngx-datatable@1.0.6

### Features
* **o-dynamic-form:** new '*automatic-registering*' input for specifying that a component will not be not registered on its parent form ([bdcf271](https://github.com/OntimizeWeb/ontimize-web-ngx/commit/bdcf271]))
* **o-dynamic-form:**: implementing '*IFormControlComponent*' methods ([bdcf271](https://github.com/OntimizeWeb/ontimize-web-ngx/commit/bdcf271]))

IFormControlComponent

## 2.0.1 (2017-10-05)

### Bug Fixes
* **templates**: updating components templates for adapting to AoT requirements.

## 2.0.0 (2017-09-29)

### BREAKING CHANGES
* **DynamicFormModule**: '*ontimize-web-ng2-dynamicform*' is now called '*ontimize-web-ngx-dynamicform*'.

### Features
* **ontimize-web-ngx-dynamicform**: '*DynamicFormModule*' is now AoT compatible.
* **o-dynamic-form**: adding '*query-on-render*' input which will set if the container '*o-form*' is making a query when the dynamic form rendering is complete (true by default).


### PEER-DEPENDENCY UPDATES ###
* **Added**:   core-js@^2.4.1
* **Added**:   lodash@^4.17.4
* **Added**:   rxjs@^5.4.2
* **Added**:   zone.js@^0.8.12

## 0.0.4 (2017-03-31)

### PEER-DEPENDENCY UPDATES ###
* **Updated**:   ontimize-web-ngx@1.2.2

### BREAKING CHANGES

### Bug Fixes
* **o-dynamic-form**: fixing render event triggering bugs.
* **o-dynamic-form**: fixing non existing components json bugs.


## 0.0.31 (2017-03-27)

### Features
* **o-dynamic-form**: Registering in parent '*o-form*' component.
* **DynamicFormModule**: exporting '*ODynamicFormComponent*'.

### PEER-DEPENDENCY UPDATES ###
* **Updated**:   ontimize-web-ngx@1.2.1

### BREAKING CHANGES

### Bug Fixes
* **Mode bugs**: disabling drag and drop when '*edit-mode*' is false.
* **o-form**: '*form-definition*' input bugs fixed ([#1](https://github.com/OntimizeWeb/ontimize-web-ngx/issues/1)) ([18865eb](https://github.com/OntimizeWeb/ontimize-web-ngx/commit/18865eb))



## 0.0.2 (2017-03-21)

### Features

build: first commit



