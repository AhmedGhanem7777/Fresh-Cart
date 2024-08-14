import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {

  // Transforms the input array of products based on the search input
  transform(products: any[], searchInput: string): any[] {
    // If there are no products or no search input, return the original array
    if (!products || !searchInput) {
      return products;
    }

    // Convert the search input to lowercase for case-insensitive comparison
    searchInput = searchInput.toLowerCase();

    // Check if the product title, category name, or brand name includes the search input
    return products.filter(product =>
      product.title.toLowerCase().includes(searchInput) ||
      product.category.name.toLowerCase().includes(searchInput) ||
      product.brand.name.toLowerCase().includes(searchInput)
    );
  }

}
