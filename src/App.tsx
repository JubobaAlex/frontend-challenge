import { useState, useEffect } from 'react';
import { useAppSelector } from './hooks';
import { fetchCats } from './services/catsApi';
import { CatGrid } from './components/CatGrid';
import { Tabs } from './components/Tabs';
import type { CatImage } from './types/cat';
import './App.css';

function App() {
  
  const favorites = useAppSelector(state => state.favorites.items);
  const [allCats, setAllCats] = useState<CatImage[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  const loadCats = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newCats = await fetchCats(page);
    if (newCats.length === 0) {
      setHasMore(false);
    } else {
      setAllCats(prev => [...prev, ...newCats]);
      setPage(prev => prev + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (allCats.length === 0 && activeTab === 'all') {
      loadCats();
    }
  }, []);

  const displayedCats = activeTab === 'all' 
    ? allCats 
    : favorites.map(f => ({
        id: f.imageId,
        url: f.url,
        width: 0,
        height: 0,
      } as CatImage));

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </header>
      <main>
        <CatGrid 
          cats={displayedCats}
          onLoadMore={loadCats}
          hasMore={hasMore && activeTab === 'all'}
          isLoading={loading && activeTab === 'all'}
        />
      </main>
    </div>
  );
}

export default App;