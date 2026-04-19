import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  downloadAsCSV(data: any[], filename: string = 'data.csv') {
    if (!data || !data.length) {
      return;
    }

    const headers = Object.keys(data[0]);

    const csvRows = [
      headers.join(','),
      ...data.map((row) => headers.map((field) => JSON.stringify(row[field] ?? '')).join(',')),
    ];

    const csvString = csvRows.join('\r\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
