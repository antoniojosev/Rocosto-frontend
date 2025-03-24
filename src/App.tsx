import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Modal from './views/budgets/BudgetCreateModal';
import BudgetListView from './views/budgets/BudgetListView';
import DatabaseView from './components/DatabaseView';
import { IBudget } from './types/Budget';
import BudgetView from './views/budgets/BudgetView';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [currentView, setCurrentView] = useState<'budget-list' | 'budget-detail' | 'database'>('budget-list');
  const [selectedBudget, setSelectedBudget] = useState<IBudget | null>(null);

  const handleBudgetClick = (budget : IBudget): void => {
    console.log('Budget clicked:', budget);
    setSelectedBudget(budget);
    setCurrentView('budget-detail');
  };

  return (
    <>
      <div className="flex min-h-screen bg-[#111]">
        <Sidebar 
          onNewClick={() => setIsModalOpen(true)} 
          onDatabaseClick={() => setCurrentView('database')}
          onBudgetClick={() => setCurrentView('budget-list')}
        />
        {currentView === 'database' ? (
        <div className="flex-1">
          <DatabaseView />
        </div>
      ) : currentView === 'budget-detail' ? (
        <div className="flex-1">
          {selectedBudget && (
            <BudgetView 
              onBack={() => setCurrentView('budget-list')}
              budget={selectedBudget} 
            />
          )}
        </div>
      ) : (
        <div className="flex-1">
          <BudgetListView onBudgetClick={handleBudgetClick} />
        </div>
      )}

      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onCreateBudget={() => {
            setIsModalOpen(false);
            setCurrentView('budget-detail');
          }}
        />
      )}
      </div>
    </>
  )
}

export default App
