import React from 'react';
import { IOwner } from '../../../types/User';

interface SystemUser {
    avatar: string;
    role: string;
    department: string;
    phone: string;
    experience: string;
}

// Mock data - Replace with actual data source
const systemUsers: SystemUser[] = [
    {
        avatar: '/path/to/avatar.jpg',
        role: 'Administrator',
        department: 'IT',
        phone: '+1234567890',
        experience: '5 years'
    }
];

interface UserTooltipProps {
    user: IOwner;
}

const UserTooltip: React.FC<UserTooltipProps> = ({ user }) => {
    return (
        <div className="absolute z-50 bg-[#2a2a2a] text-white rounded-lg shadow-lg p-4 w-64 -translate-x-full left-0 mt-2">
            <div className="flex items-start gap-4 mb-3">
                <img 
                    src={systemUsers[0].avatar} 
                    alt={user.username} 
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h4 className="font-semibold">{user.username}</h4>
                    <p className="text-sm text-gray-400">{systemUsers[0].role}</p>
                </div>
            </div>
            <div className="space-y-2 text-sm">
                <p>
                    <span className="text-gray-400">Departamento:</span> {systemUsers[0].department}
                </p>
                <p>
                    <span className="text-gray-400">Email:</span> {user.email}
                </p>
                <p>
                    <span className="text-gray-400">Teléfono:</span> {systemUsers[0].phone}
                </p>
                <p>
                    <span className="text-gray-400">Experiencia:</span> {systemUsers[0].experience}
                </p>
            </div>
        </div>
    );
};

export default UserTooltip;