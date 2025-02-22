import React, { useState } from 'react';
import { X, Check, User, Info } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Simulated users data with extended information
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
];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const [hoveredUser, setHoveredUser] = useState<number | null>(null);

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'General', completed: true },
    { id: 'costos', label: 'Costos', completed: activeTab === 'costos' || activeTab === 'impuestos' || activeTab === 'otros' },
    { id: 'impuestos', label: 'Impuestos', completed: activeTab === 'impuestos' || activeTab === 'otros' },
    { id: 'otros', label: 'Otros', completed: activeTab === 'otros' }
  ];

  const UserTooltip = ({ user }: { user: typeof systemUsers[0] }) => (
    <div className="absolute z-50 bg-[#2a2a2a] text-white rounded-lg shadow-lg p-4 w-64 -translate-x-full left-0 mt-2">
      <div className="flex items-start gap-4 mb-3">
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-semibold">{user.name}</h4>
          <p className="text-sm text-gray-400">{user.role}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="text-gray-400">Departamento:</span> {user.department}</p>
        <p><span className="text-gray-400">Email:</span> {user.email}</p>
        <p><span className="text-gray-400">Teléfono:</span> {user.phone}</p>
        <p><span className="text-gray-400">Experiencia:</span> {user.experience}</p>
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
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Código</label>
                    <input type="text" className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" />
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-2">Nombre del Proyecto</label>
                  <input type="text" className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" />
                </div>
                <div>
                  <label className="block text-white mb-2">Propietario</label>
                  <input type="text" className="w-full bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Calculado por</label>
                    <div className="space-y-2">
                      {systemUsers.map(user => (
                        <div
                          key={user.id}
                          className="relative flex items-center gap-3 p-2 rounded-md bg-[#2a2a2a] border border-gray-700 cursor-pointer hover:bg-[#3a3a3a] transition-colors group"
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-white text-sm">{user.name}</div>
                            <div className="text-gray-400 text-xs">{user.role}</div>
                          </div>
                          <button
                            className="text-gray-400 hover:text-white transition-colors relative"
                            onMouseEnter={() => setHoveredUser(user.id)}
                            onMouseLeave={() => setHoveredUser(null)}
                          >
                            <Info size={16} />
                            {hoveredUser === user.id && <UserTooltip user={user} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Revisado por</label>
                    <div className="space-y-2">
                      {systemUsers.map(user => (
                        <div
                          key={user.id}
                          className="relative flex items-center gap-3 p-2 rounded-md bg-[#2a2a2a] border border-gray-700 cursor-pointer hover:bg-[#3a3a3a] transition-colors group"
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-white text-sm">{user.name}</div>
                            <div className="text-gray-400 text-xs">{user.role}</div>
                          </div>
                          <button
                            className="text-gray-400 hover:text-white transition-colors relative"
                            onMouseEnter={() => setHoveredUser(user.id)}
                            onMouseLeave={() => setHoveredUser(null)}
                          >
                            <Info size={16} />
                            {hoveredUser === user.id && <UserTooltip user={user} />}
                          </button>
                        </div>
                      ))}
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
                  const currentIndex = tabs.findIndex(t => t.id === activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1].id);
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