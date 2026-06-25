import { getAllBrands, getAllSeries } from '@/lib/data';
import SearchClient from './SearchClient';

export default async function SearchPage() {
  const brands = await getAllBrands();
  const series = await getAllSeries();

  return <SearchClient brands={brands} series={series} />;
}
