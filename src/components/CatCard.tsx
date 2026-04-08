import { useState } from 'react';
import type { CatImage } from '../types/cat';
import { useAppDispatch, useAppSelector } from '../hooks'
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import './CatCard.css';

interface CatCardProps {
  cat: CatImage;
}

export const CatCard = ({ cat }: CatCardProps) => {
  const dispatch = useAppDispatch();
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const isFavorite = useAppSelector(state => 
    state.favorites.items.some(f => f.imageId === cat.id)
  );

  const getHeartIcon = () => {
    if (isFavorite) return '/heart-icons/heart-filled.png';
    if (isHeartHovered) return '/heart-icons/heart-hover.png';
    return '/heart-icons/heart-outline.png';
  };

  const handleClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(cat.id));
    } else {
      dispatch(addFavorite(cat));
    }
  };

  return (
    <div className="cat-card">
      <img src={cat.url} alt="Котик" className="cat-card__image" />
      <div className="cat-card__overlay">
        <button
          className="cat-card__heart"
          onMouseEnter={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
          onClick={handleClick}
        >
          <img src={getHeartIcon()} alt="Heart" className="cat-card__heart-icon" />
        </button>
      </div>
    </div>
  );
};