import React, { FC } from 'react';

interface DashboardProps {
  
}

const Dashboard: FC<DashboardProps> = ({ }) => {
  return (
    <div>
        <p>Facturas creadas</p>
        <p>Crear nueva factura</p>
        <p>Servicios</p>
    </div>
  );
};

export default Dashboard;