import { getAllBrands, getAllSeries } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeClient from './HomeClient';

export default function HomePage() {
  const brands = getAllBrands();
  const allSeries = getAllSeries();

  return (
    <>
      <Navbar brandCount={brands.length} />
      <HomeClient brands={brands} allSeries={allSeries} />
      <Footer />
    </>
  );
}
