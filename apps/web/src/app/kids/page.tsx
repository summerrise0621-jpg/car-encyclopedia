import { getAllBrands, getAllSeries } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KidsClient from './KidsClient';

export const metadata = {
  title: '儿童汽车乐园 - 汽车百科',
  description: '适合儿童学习的汽车知识互动页面，包含车标大全、看车识品牌等趣味学习内容。',
};

export default function KidsPage() {
  const brands = getAllBrands();
  const allSeries = getAllSeries();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <KidsClient brands={brands} allSeries={allSeries} />
      </main>
      <Footer />
    </>
  );
}
