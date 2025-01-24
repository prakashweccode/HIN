import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sum"
})
export class SumPipe implements PipeTransform {
  transform(items: any[], attr: string): any {
    let counter = 0;
    items.forEach(data => {
      if (data[attr] && !isNaN(data[attr])) {
        counter = counter + parseFloat(data[attr]);
      }
    });
    return counter;
  }

  transformMultiple(items: any[], attrOne: string, attrTwo:string): any {
    let counter = 0;
    items.forEach(data => {
      if ((data[attrOne] && data[attrTwo]) && (!isNaN(data[attrOne]) && !isNaN(data[attrOne]))) {
        counter = counter + (parseFloat(data[attrOne]) * parseFloat(data[attrTwo]));
      }
    });
    return counter;
  }

  timeCalculationMultiple(items: any[], attrOne: string, attrTwo: string): any {
    let counter = 0;
    items.forEach(data => {
      if ((data[attrOne] && data[attrTwo]) && (!isNaN(data[attrOne]) && !isNaN(data[attrOne]))) {
        counter = counter + (parseFloat(data[attrOne]) * (parseFloat(data[attrTwo])/60));
      }
    });
    return counter;
  }
}
