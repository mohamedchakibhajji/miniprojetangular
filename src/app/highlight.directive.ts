import { Directive, ElementRef, Input } from '@angular/core';

  @Directive({
    selector: '[appHighlight]',
    host: {
      '(mouseenter)': 'onMouseEnter()',
      '(mouseleave)': 'onMouseLeave()'
    }
  })
  export class HighlightDirective {
    private _defaultColor = 'green';
    private el: HTMLElement;

    constructor(el: ElementRef) { this.el = el.nativeElement; }

    @Input('myHighlight') highlightColor: string;

    onMouseEnter() { this.highlight(this.highlightColor || this._defaultColor); }
    onMouseLeave() { this.highlight(null); }

    private highlight(color:string) {
      this.el.style.color = color;
    }

  }
