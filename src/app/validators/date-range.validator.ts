import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fromDate = control.get('fromDate')?.value;
    const toDate = control.get('toDate')?.value;

    if (fromDate && toDate && fromDate > toDate) {
      return { 'dateRangeInvalid': true };
    }
    return null;
  };
}
