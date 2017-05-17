import {Directive, Input} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';

import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'keepHtml', pure: false})
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
