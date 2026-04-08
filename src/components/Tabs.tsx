import './Tabs.css';

interface TabsProps {
  activeTab: 'all' | 'favorites';
  onTabChange: (tab: 'all' | 'favorites') => void;
}

export const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  return (
    <div className="tabs">
      <button
        className={`tabs__btn ${activeTab === 'all' ? 'tabs__btn--active' : ''}`}
        onClick={() => onTabChange('all')}
      >
        Все котики
      </button>
      <button
        className={`tabs__btn ${activeTab === 'favorites' ? 'tabs__btn--active' : ''}`}
        onClick={() => onTabChange('favorites')}
      >
        Любимые котики
      </button>
    </div>
  );
};