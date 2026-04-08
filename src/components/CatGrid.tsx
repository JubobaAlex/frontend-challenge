import { useEffect, useRef } from 'react';
import type { CatImage } from '../types/cat';
import { CatCard } from './CatCard';
import './CatGrid.css';

interface CatGridProps {
  cats: CatImage[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const CatGrid = ({ cats, onLoadMore, hasMore, isLoading }: CatGridProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          console.log('Trigger load more'); // Проверка
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  if (cats.length === 0 && !isLoading) {
    return (
      <div className="cat-grid__empty">
        Нет котиков 😢
      </div>
    );
  }

  return (
    <div className="cat-grid">
      <div className="cat-grid__container">
        {cats.map((cat, index) => (
          <CatCard key={`${cat.id}-${index}`} cat={cat} />
        ))}
      </div>
      
      {isLoading && (
        <div className="cat-grid__loader" style={{color:'#000000'}}>
          Загружаем еще котиков
          <span className="cat-grid__dots" style={{color:'#000000'}}>
            <span>.</span><span>.</span><span>.</span>
          </span>
        </div>
      )}
      
      {hasMore && (
        <div ref={loaderRef} className="cat-grid__trigger" />
      )}
    </div>
  );
};