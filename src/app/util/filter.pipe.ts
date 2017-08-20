import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items) {
      return items;
    }
    if (items[0].uid) {
    	return items.filter(item => item.firstname.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    } else {
	    // filter items array, items which match and return true will be kept, false will be filtered out
	    return items.filter(item => item.question.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
	}
  }
}
