import { FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    'X-Api-Key': 'jZ0FfTUdKtAG3uVmI+3wAA==4DI9jthK9V9MWG7V',
    'Content-Type': 'application/json',
  };

  console.log(filters, 'filters');

  // Construct the query string using URLSearchParams
  const searchParams = new URLSearchParams();

  if (manufacturer) searchParams.append('make', manufacturer);
  if (year) searchParams.append('year', year.toString());
  if (model) searchParams.append('model', model);
  if (limit) searchParams.append('limit', limit.toString());
  if (fuel) searchParams.append('fuel_type', fuel);

  const url = `https://api.api-ninjas.com/v1/cars?${searchParams.toString()}`;

  console.log(url, 'url');

  try {
    const response = await fetch(url, { headers });

    // Check if the response is ok
    if (!response.ok) {
      console.error('API request failed with status:', response.status);
      return [];
    }

    const result = await response.json();

    // Log the result to see what is being returned
    console.log(result, 'result');

    return result;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}



export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams('');
  
    // Set the specified search parameter to the given value
    searchParams.set(type, value);
  
    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
  };