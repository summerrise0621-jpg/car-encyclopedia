import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
      <span className="text-3xl">🚗</span>
      <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        汽车百科
      </span>
    </Link>
  );
}
