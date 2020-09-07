import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mutifilter'
})
export class MutifilterPipe implements PipeTransform {

  transform(items: any[], value: string, prop: string): any[] {
    if (!items) return [];
    if (!value) return items;

    return items.filter(singleItem => {
      if (prop === undefined || prop == "undefined") {
        return singleItem.firstName.toLowerCase().startsWith(value.toLowerCase()) || singleItem.lastName.toLowerCase().startsWith(value.toLowerCase())
      }
      if (prop === 'subject' && singleItem.subjectMarks.length > 0) {
          return singleItem.subjectMarks.find(element => {            
            return element[prop].toLowerCase().startsWith(value.toLowerCase());
        });
      }else{
        return singleItem[prop].toLowerCase().startsWith(value.toLowerCase())
      }
    });
  }

  fiterData(items: any[], value: string, prop: string) {
    // if (prop === 'subject') {
      debugger
      return items.filter(o => {
        Object.keys(o).forEach(function (e) {
          if (Array.isArray(o[e])) o[e] = this.filterData(o[e], value);

          return o.value != value
        })
      });
    // } else {
    //   return items.filter(singleItem =>
    //     singleItem[prop].toLowerCase().startsWith(value.toLowerCase())
    //   );
    // }
  }

}
