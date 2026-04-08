import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FavoriteCat, CatImage } from '../../types/cat';

const loadFavorites = (): FavoriteCat[] => {
  const saved = localStorage.getItem('favoriteCats');
  return saved ? JSON.parse(saved) : [];
};

const saveFavorites = (favorites: FavoriteCat[]) => {
  localStorage.setItem('favoriteCats', JSON.stringify(favorites));
};

interface FavoritesState {
  items: FavoriteCat[];
}

const initialState: FavoritesState = {
  items: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<CatImage>) => {
      const cat = action.payload;
      const exists = state.items.some(f => f.imageId === cat.id);
      
      if (!exists) {
        const newFavorite: FavoriteCat = {
          id: `fav_${Date.now()}_${cat.id}`,
          imageId: cat.id,
          url: cat.url,
          addedAt: Date.now(),
        };
        state.items.push(newFavorite);
        saveFavorites(state.items);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(f => f.imageId !== action.payload);
      saveFavorites(state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;