import {Directive, Input} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';

import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'customDate', pure: false})
export class CustomDatePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    const date = new Date( content );

    return date.toLocaleString();
  }

}
