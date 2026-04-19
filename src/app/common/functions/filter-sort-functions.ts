import { IFilterItems } from '../interfaces/common-interfaces';

export function filterWith(data: any, filters: IFilterItems): any {
  let filteredData = data;

  Object.keys(filters).forEach((filter) => {
    if (filter == 'sortBy' || filter == 'dateTo') {
      return;
    } else {
      filteredData = data.filter((item: any) => {
        if (filter == 'dateFrom') {
          if (filters.dateFrom && filters.dateTo && item.date) {
            const dateFrom = new Date(filters.dateFrom);
            const dateTo = new Date(filters.dateTo);
            const date = new Date(item.date);

            if (dateFrom <= date && date <= dateTo) {
              return true;
            }
          }
          return false;
        } else {
          return item[filter] == filters[filter];
        }
      });
    }
  });
  return filteredData;
}

export function sort(data: any, sortValue: string): any {
  if (sortValue === 'date') {
    data.sort((a: any, b: any) => {
      const dateA = new Date(a[sortValue]);
      const dateB = new Date(b[sortValue]);
      const diff = dateB.getTime() - dateA.getTime();
      return diff;
    });
  }

  return data.sort((a: any, b: any) => b[sortValue] - a[sortValue]);
}
