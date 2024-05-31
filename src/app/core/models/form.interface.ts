import {AbstractControl, FormGroup} from '@angular/forms';

// Utility type to convert an interface's properties to FormControl types
export type IFormGroupControls<T> = { [key in keyof T]: AbstractControl };
export type IFormGroup<T> = FormGroup & { value: T, controls: IFormGroupControls<T> };
