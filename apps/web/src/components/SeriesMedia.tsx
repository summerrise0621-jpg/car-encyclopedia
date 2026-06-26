'use client';

import { useState } from 'react';

interface GalleryImageProps {
  src: string;
  alt: string;
  index: number;
}

function GalleryImage({ src, alt, index }: GalleryImageProps) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden">
      <img
        src={src}
        alt={`${alt} 图片 ${index + 1}`}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        loading="lazy"
        onError={() => setError(true)}
      />
    </div>
  );
}

interface ReviewCardProps {
  review: {
    title: string;
    url: string;
    source: string;
    type: 'video' | 'article' | 'test';
    thumbnail?: string;
    rating?: number;
  };
}

function ReviewCard({ review }: ReviewCardProps) {
  const [thumbError, setThumbError] = useState(false);

  return (
    <a
      href={review.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
        {review.thumbnail && !thumbError ? (
          <img
            src={review.thumbnail}
            alt={review.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={() => setThumbError(true)}
          />
        ) : (
          <span className="text-4xl">
            {review.type === 'video' ? '🎬' : review.type === 'article' ? '📰' : '🔍'}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {review.title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{review.source}</span>
          <span>·</span>
          <span className="capitalize">
            {review.type === 'video' ? '视频' : review.type === 'article' ? '文章' : '测试'}
          </span>
          {review.rating && (
            <>
              <span>·</span>
              <span className="text-yellow-500">⭐ {review.rating}</span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}

interface GallerySectionProps {
  seriesName: string;
  gallery: string[];
}

export function GallerySection({ seriesName, gallery }: GallerySectionProps) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📸 更多图片
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((img, index) => (
          <GalleryImage
            key={index}
            src={img}
            alt={seriesName}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

interface ReviewsSectionProps {
  reviews: ReviewCardProps['review'][];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        🎬 评测与视频
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
}
