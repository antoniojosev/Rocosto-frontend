import React, { useState } from 'react';
import { X, Check, Info, Search } from 'lucide-react';
import useCompany from '../hooks/useCompany';
import { IOwner } from '../api/endpoints/companies';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCreateBudget: () => void;
}


const systemUsers = [
  { 
    id: 1, 
    name: 'Juan Pérez', 
    role: 'Ingeniero', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=80',
    department: 'Ingeniería Civil',
    email: 'juan.perez@empresa.com',
    phone: '+1 234 567 890',
    experience: '8 años'
  },
  { 
    id: 2, 
    name: 'María García', 
    role: 'Arquitecta', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&q=80',
    department: 'Diseño Arquitectónico',
    email: 'maria.garcia@empresa.com',
    phone: '+1 234 567 891',
    experience: '6 años'
  },
  { 
    id: 3, 
    name: 'Carlos López', 
    role: 'Supervisor', 
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&fit=crop&q=80',
    department: 'Supervisión de Obras',
    email: 'carlos.lopez@empresa.com',
    phone: '+1 234 567 892',
    experience: '10 años'
  },
  { 
    id: 4, 
    name: 'Ana Martínez', 
    role: 'Propietaria', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&q=80',
    department: 'Dirección',
    email: 'ana.martinez@empresa.com',
    phone: '+1 234 567 893',
    experience: '12 años'
  },
  { 
    id: 5, 
    name: 'Roberto Sánchez', 
    role: 'Propietario', 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&q=80',
    department: 'Dirección',
    email: 'roberto.sanchez@empresa.com',
    phone: '+1 234 567 894',
    experience: '15 años'
  }
];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, activeTab, setActiveTab, onCreateBudget }) => {
  const [hoveredUser, setHoveredUser] = useState<IOwner | null>(null);
  const { data } = useCompany();
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<IOwner| null>(null);
  const [ownerSearchTerm, setOwnerSearchTerm] = useState('');
  const [searchFocusCalculatedBy, setSearchFocusCalculatedBy] = useState(false);
  const [searchFocusReviewedBy, setSearchFocusReviewedBy] = useState(false);


  const [calculatedBySearchTerm, setCalculatedBySearchTerm] = useState('');
  const [reviewedBySearchTerm, setReviewedBySearchTerm] = useState('');
  const [selectedCalculatedBy, setSelectedCalculatedBy] = useState<IOwner | null>(null);
  const [selectedReviewedBy, setSelectedReviewedBy] = useState<IOwner | null>(null);

  const handleCalculatedBySelect = (user: IOwner) => {
    setSelectedCalculatedBy(user);
    setSearchFocusCalculatedBy(false);
  };
  
  const handleReviewedBySelect = (user: IOwner) => {
    setSelectedReviewedBy(user);
    setSearchFocusReviewedBy(false);
  };
  

  if (!isOpen) return null;


  const tabs = [
    { id: 'general', label: 'General', completed: true },
    { id: 'costos', label: 'Costos', completed: activeTab === 'costos' || activeTab === 'impuestos' || activeTab === 'otros' },
    { id: 'impuestos', label: 'Impuestos', completed: activeTab === 'impuestos' || activeTab === 'otros' },
    { id: 'otros', label: 'Otros', completed: activeTab === 'otros' }
  ];

  const UserTooltip = ({ user }: { user: IOwner }) => (
    <div className="absolute z-50 bg-[#2a2a2a] text-white rounded-lg shadow-lg p-4 w-64 -translate-x-full left-0 mt-2">
      <div className="flex items-start gap-4 mb-3">
        <img src={systemUsers[0].avatar} alt={user.username} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-semibold">{user.username}</h4>
          <p className="text-sm text-gray-400">{systemUsers[0].role}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="text-gray-400">Departamento:</span> {systemUsers[0].department}</p>
        <p><span className="text-gray-400">Email:</span> {user.email}</p>
        <p><span className="text-gray-400">Teléfono:</span> {systemUsers[0].phone}</p>
        <p><span className="text-gray-400">Experiencia:</span> {systemUsers[0].experience}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-semibold">Nuevo Presupuesto</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Steps indicator */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2" />
            <div className="relative flex justify-between">
              {tabs.map((tab, index) => (
                <div key={tab.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all
                      ${activeTab === tab.id 
                        ? 'bg-white text-black' 
                        : tab.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-700 text-gray-400'}`}
                  >
                    {tab.completed ? <Check size={20} /> : index + 1}
                  </button>
                  <span className={`mt-2 text-sm ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>
                    {tab.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto max-h-[calc(90vh-16rem)] pr-2 custom-scrollbar">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Empresa</label>
                    <select className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700">
                      <option>Seleccionar empresa</option>
                      {data?.map(company => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Código</label>
                    <input type="text" className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" />
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-2">Nombre</label>
                  <input type="text" className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" />
                </div>
                <div className="relative">
                  <label className="block text-white mb-2">Propietario</label>
                  <div className="relative">
                    <div 
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700 cursor-pointer flex items-center"
                      onClick={() => setIsOwnerDropdownOpen(!isOwnerDropdownOpen)}
                    >
                      {selectedOwner ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={systemUsers[0].avatar}
                            alt={selectedOwner.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-white text-sm">{selectedOwner.username}</div>
                            <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Seleccionar propietario</span>
                      )}
                    </div>
                    {isOwnerDropdownOpen && (
                      <div className="absolute z-50 w-full mt-2 bg-[#2a2a2a] rounded-md border border-gray-700 shadow-lg">
                        <div className="p-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                              type="text"
                              placeholder="Buscar propietario..."
                              value={ownerSearchTerm}
                              onChange={(e) => setOwnerSearchTerm(e.target.value)}
                              className="w-full bg-[#1a1a1a] text-white rounded-md pl-8 pr-4 py-2 text-sm border border-gray-700"
                            />
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            {data?.flatMap(company => 
                              company.owners.map(owner => (
                                <div
                                  key={owner.id}
                                  className="flex items-center gap-3 p-2 hover:bg-[#3a3a3a] cursor-pointer transition-colors"
                                  onClick={() => {
                                    setSelectedOwner(owner);
                                    setIsOwnerDropdownOpen(false);
                                  }}
                                >
                                <img
                                  src={systemUsers[0].avatar}
                                  alt={owner.username}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div>
                                  <div className="text-white text-sm">{owner.username}</div>
                                  <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                                </div>
                                </div>
                              ))
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Calculado por</label>
                    <div className="space-y-2">
                      {selectedCalculatedBy ? (
                        <div className="relative flex items-center gap-3 p-2 rounded-md bg-[#2a2a2a] border border-gray-700">
                          <img
                            src={systemUsers[0].avatar}
                            alt={selectedCalculatedBy.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-white text-sm">{selectedCalculatedBy.username}</div>
                            <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                          </div>
                          <button
                            className="text-gray-400 hover:text-white transition-colors relative"
                            onMouseEnter={() => setHoveredUser(selectedCalculatedBy)}
                            onMouseLeave={() => setHoveredUser(null)}
                          >
                            <Info size={16} />
                            {hoveredUser === selectedCalculatedBy && <UserTooltip user={selectedCalculatedBy} />}
                          </button>
                          <button
                            onClick={() => setSelectedCalculatedBy(null)}
                            className="text-gray-400 hover:text-white ml-2"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="relative mb-2">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            placeholder="Buscar..."
                            value={calculatedBySearchTerm}
                            onChange={(e) => setCalculatedBySearchTerm(e.target.value)}
                            onFocus={() => setSearchFocusCalculatedBy(true)}
                            className="w-full bg-[#2a2a2a] text-white rounded-md pl-8 pr-4 py-2 text-sm border border-gray-700"
                          />
                        </div>    
                      )}
                      {searchFocusCalculatedBy && (
                          <div className="relative z-50 w-full mt-2 bg-[#2a2a2a] rounded-md border border-gray-700 shadow-lg">
                            {data?.flatMap(company => 
                              company.owners.map(owner => (
                              <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                <div
                                  key={owner.id}
                                  className="relative flex items-center gap-3 p-2 hover:bg-[#3a3a3a] cursor-pointer transition-color"
                                  onClick={() => handleCalculatedBySelect(owner)}
                                >
                                  <img
                                    src={systemUsers[0].avatar}
                                    alt={owner.username}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <div className="flex-1">
                                    <div className="text-white text-sm">{owner.username}</div>
                                    <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                                  </div>
                                  <button
                                    className="text-gray-400 hover:text-white transition-colors relative"
                                    onMouseEnter={() => setHoveredUser(owner)}
                                    onMouseLeave={() => setHoveredUser(null)}
                                  >
                                    <Info size={16} />
                                    {hoveredUser === owner && <UserTooltip user={owner} />}
                                  </button>
                                </div>
                              </div>
                              ))
                            )}
                          </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Revisado por</label>
                    <div className="space-y-2">
                      
                      {selectedReviewedBy ? (
                        <div className="relative flex items-center gap-3 p-2 rounded-md bg-[#2a2a2a] border border-gray-700">
                          <img
                            src={systemUsers[0].avatar}
                            alt={selectedReviewedBy.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-white text-sm">{selectedReviewedBy.username}</div>
                            <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                          </div>
                          <button
                            className="text-gray-400 hover:text-white transition-colors relative"
                            onMouseEnter={() => setHoveredUser(selectedReviewedBy)}
                            onMouseLeave={() => setHoveredUser(null)}
                          >
                            <Info size={16} />
                            {hoveredUser === selectedReviewedBy && <UserTooltip user={selectedReviewedBy} />}
                          </button>
                          <button
                            onClick={() => setSelectedReviewedBy(null)}
                            className="text-gray-400 hover:text-white ml-2"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="relative mb-2">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            placeholder="Buscar..."
                            value={reviewedBySearchTerm}
                            onChange={(e) => setReviewedBySearchTerm(e.target.value)}
                            onFocus={() => setSearchFocusReviewedBy(true)}
                            className="w-full bg-[#2a2a2a] text-white rounded-md pl-8 pr-4 py-2 text-sm border border-gray-700"
                          />
                        </div>    
                    )}
                    {searchFocusReviewedBy && (
                        <div className="relative z-50 w-full mt-2 bg-[#2a2a2a] rounded-md border border-gray-700 shadow-lg">
                          {data?.flatMap(company => 
                              company.owners.map(owner => (
                                <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                  <div
                                    key={owner.id}
                                    className="relative flex items-center gap-3 p-2 hover:bg-[#3a3a3a] cursor-pointer transition-color"
                                    onClick={() => handleReviewedBySelect(owner)}
                                  >
                                    <img
                                      src={systemUsers[0].avatar}
                                      alt={owner.username}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                      <div className="text-white text-sm">{owner.username}</div>
                                      <div className="text-gray-400 text-xs">{systemUsers[0].role}</div>
                                    </div>
                                    <button
                                      className="text-gray-400 hover:text-white transition-colors relative"
                                      onMouseEnter={() => setHoveredUser(owner)}
                                      onMouseLeave={() => setHoveredUser(null)}
                                    >
                                      <Info size={16} />
                                      {hoveredUser === owner && <UserTooltip user={owner} />}
                                    </button>
                                  </div>
                                </div>
                          )))
                          }
                        </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'costos' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Factor de labor directa</label>
                    <input 
                      type="number" 
                      defaultValue="1.005"
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">% Administración</label>
                    <input 
                      type="number" 
                      defaultValue="16"
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">% Utilidad</label>
                    <input 
                      type="number" 
                      defaultValue="15"
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">% Financiamiento</label>
                    <input 
                      type="number" 
                      defaultValue="0"
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'impuestos' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-4">IVA</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="radio" name="iva" className="text-orange-500" />
                      Sin IVA
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="radio" name="iva" className="text-orange-500" defaultChecked />
                      En Presupuesto y Valuación
                    </label>
                  </div>
                </div>
                <div className="w-24">
                  <label className="block text-white mb-2">Porcentaje</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      defaultValue="12"
                      className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" 
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'otros' && (
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="text-orange-500" />
                  Usar Gastos Médicos e Implementos de Seguridad
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="text-orange-500" />
                  Aplicar doble factor de costo asociado
                </label>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2 text-gray-400">
              <div className={`w-2 h-2 rounded-full ${activeTab === 'general' ? 'bg-orange-500' : 'bg-gray-600'}`} />
              <span className="text-sm">Paso {tabs.findIndex(t => t.id === activeTab) + 1} de 4</span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-white bg-[#2a2a2a] rounded-md hover:bg-[#3a3a3a] transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  if (activeTab === 'otros') {
                    onCreateBudget();
                  } else {
                    const currentIndex = tabs.findIndex(t => t.id === activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1].id);
                    }
                  }
                }}
                className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
              >
                {activeTab === 'otros' ? 'Crear Presupuesto' : 'Siguiente'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;