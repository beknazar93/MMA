// context/ClientsContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchClients, addClient, updateClient, deleteClient } from '../services/api';

export const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClients = async () => {
      const clientsData = await fetchClients();
      setClients(clientsData);
      setLoading(false);
    };
    getClients();
  }, []);

  const addNewClient = async (clientData) => {
    const newClient = await addClient(clientData);
    setClients([...clients, newClient]);
  };

  const updateExistingClient = async (clientId, updatedData) => {
    const updatedClient = await updateClient(clientId, updatedData);
    setClients(clients.map((client) => (client.id === clientId ? updatedClient : client)));
  };

  const deleteExistingClient = async (clientId) => {
    await deleteClient(clientId);
    setClients(clients.filter((client) => client.id !== clientId));
  };
  

  return (
    <ClientsContext.Provider value={{ clients, loading, addNewClient, updateExistingClient, deleteExistingClient }}>
      {children}
    </ClientsContext.Provider>
  );
};
