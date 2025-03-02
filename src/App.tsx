import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Modal from './components/Modal';
import BudgetListView from './components/BudgetListView';
import BudgetView from './components/BudgetView';
import DatabaseView from './components/DatabaseView';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [currentView, setCurrentView] = useState<'budget-list' | 'budget-detail' | 'database'>('budget-list');

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
          <BudgetView onBack={() => setCurrentView('budget-list')} />
        </div>
      ) : (
        <div className="flex-1">
          <BudgetListView onBudgetClick={() => setCurrentView('budget-detail')} />
        </div>
      )}

      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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
