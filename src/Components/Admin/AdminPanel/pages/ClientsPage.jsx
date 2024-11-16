// import React, { useContext, useEffect, useState } from "react";
// import { ClientsContext } from "../context/ClientsContext";
// import axios from "axios";

// const ClientsPage = () => {
//   const [clients, setClients] = useState([]);
//   const [editingClient, setEditingClient] = useState(null);
//   const [updatedClient, setUpdatedClient] = useState(null);
//   const [error, setError] = useState(null);
//   const [filterUnpaid, setFilterUnpaid] = useState(false); // Состояние для фильтрации
//   const [filteredClients, setFilteredClients] = useState([]);

//   useEffect(() => {
//     axios("https://beknazarosh.pythonanywhere.com/api/clients/")
//       .then(({ data }) => {
//         setClients(data);
//         setFilteredClients(data); // Изначально все клиенты отображаются
//       })
//       .catch(() => setError("Ошибка при загрузке данных"));
//   }, []);

//   const { loading } = useContext(ClientsContext);

//   if (loading) return <p>Загрузка...</p>;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedClient((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(
//         `https://beknazarosh.pythonanywhere.com/api/clients/${updatedClient.id}/`,
//         updatedClient
//       );
//       setClients(
//         clients.map((client) =>
//           client.id === updatedClient.id ? updatedClient : client
//         )
//       );
//       setEditingClient(null);
//     } catch {
//       setError("Ошибка при обновлении клиента");
//     }
//   };

//   const handleFilterUnpaid = () => {
//     setFilterUnpaid(!filterUnpaid);
//     if (!filterUnpaid) {
//       setFilteredClients(
//         clients.filter((client) => client.payment === "неоплачено")
//       );
//     } else {
//       setFilteredClients(clients); // Если фильтр отключён, показываем всех клиентов
//     }
//   };

//   const renderEditForm = () => (
//     <div className="edit-form">
//       <h2>Редактировать клиента</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form className="clients-form" onSubmit={handleSubmit}>
//         {[
//           "name",
//           "email",
//           "phone",
//           "price",
//           "sport_category",
//           "trainer",
//           "year",
//           "month",
//           "day",
//           "comment",
//         ].map((field) => (
//           <label key={field} className="clients-label">
//             {field.charAt(0).toUpperCase() + field.slice(1)}:
//             <input
//               type={
//                 field === "email"
//                   ? "email"
//                   : field === "comment"
//                   ? "textarea"
//                   : "text"
//               }
//               name={field}
//               value={updatedClient[field] || ""}
//               onChange={handleChange}
//             />
//           </label>
//         ))}
//         <label className="clients-label">
//           Оплата:
//           <select
//             name="payment"
//             value={updatedClient.payment}
//             onChange={handleChange}
//           >
//             <option value="оплачено">Оплачено</option>
//             <option value="неоплачено">Неоплачено</option>
//           </select>
//         </label>
//         <div className="client-btns">
//           <button type="submit">Сохранить изменения</button>
//           <button type="button" onClick={() => setEditingClient(null)}>
//             Отменить
//           </button>
//         </div>
//       </form>
//     </div>
//   );

//   const renderClientsTable = () => (
//     <table className="client-table" border={1}>
//       <thead>
//         <tr>
//           <th>№</th>
//           <th>Имя и Фамилия</th>
//           <th>Дата регистрации</th>
//           <th>Контакты</th>
//           <th>Вид спорта</th>
//           <th>Тренер</th>
//           <th>Оплата</th>
//           <th>Комментарий</th>
//           <th>Изменить</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredClients.map((client, idx) => (
//           <tr
//             key={client.id}
//             style={
//               client.payment === "неоплачено"
//                 ? { backgroundColor: "red", color: "white", height: "10px" }
//                 : {}
//             }
//           >
//             <td>{idx + 1}</td>
//             <td>{client.name}</td>
//             <td>{`${client.day}.${client.month}.${client.year}`}</td>
//             <td>{client.phone}</td>
//             <td>{client.sport_category}</td>
//             <td>{client.trainer}</td>
//             <td>{client.payment}</td>
//             <td>{client.comment}</td>
//             <td>
//               <button
//                 onClick={() => {
//                   setEditingClient(client);
//                   setUpdatedClient(client);
//                 }}
//               >
//                 Изменить
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
//   return (
//     <div className="clients">
//       <h1>Клиенты</h1>
//       <button onClick={handleFilterUnpaid}>
//         {filterUnpaid ? "Показать всех" : "Показать неоплаченных"}
//       </button>
//       {editingClient && renderEditForm()}
//       <div className="clients-scrol">{renderClientsTable()}</div>
//     </div>
//   );
// };
// export default ClientsPage;
import React, { useContext, useEffect, useState } from "react";
import { ClientsContext } from "../context/ClientsContext";
import axios from "axios";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [updatedClient, setUpdatedClient] = useState(null);
  const [error, setError] = useState(null);
  const [filterUnpaid, setFilterUnpaid] = useState(false); // Состояние для фильтрации
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    axios("https://beknazarosh.pythonanywhere.com/api/clients/")
      .then(({ data }) => {
        setClients(data);
        setFilteredClients(data); // Изначально все клиенты отображаются
      })
      .catch(() => setError("Ошибка при загрузке данных"));
  }, []);

  const { loading } = useContext(ClientsContext);

  if (loading) return <p>Загрузка...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://beknazarosh.pythonanywhere.com/api/clients/${updatedClient.id}/`,
        updatedClient
      );
      setClients(
        clients.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        )
      );
      setEditingClient(null);
    } catch {
      setError("Ошибка при обновлении клиента");
    }
  };

  const handleFilterUnpaid = () => {
    setFilterUnpaid(!filterUnpaid);
    if (!filterUnpaid) {
      setFilteredClients(
        clients.filter((client) => client.payment === "неоплачено")
      );
    } else {
      setFilteredClients(clients); // Если фильтр отключён, показываем всех клиентов
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(
        `https://beknazarosh.pythonanywhere.com/api/clients/${id}/`
      );
      setClients(clients.filter((client) => client.id !== id)); // Удаляем клиента из списка
      setFilteredClients(filteredClients.filter((client) => client.id !== id)); // Удаляем клиента из отфильтрованного списка
    } catch {
      setError("Ошибка при удалении клиента");
    }
  };

  const renderEditForm = () => (
    <div className="edit-form">
      <h2>Редактировать клиента</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="clients-form" onSubmit={handleSubmit}>
        {[
          "name",
          "email",
          "phone",
          "price",
          "sport_category",
          "trainer",
          "year",
          "month",
          "day",
          "comment",
        ].map((field) => (
          <label key={field} className="clients-label">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type={
                field === "email"
                  ? "email"
                  : field === "comment"
                  ? "textarea"
                  : "text"
              }
              name={field}
              value={updatedClient[field] || ""}
              onChange={handleChange}
            />
          </label>
        ))}
        <label className="clients-label">
          Оплата:
          <select
            name="payment"
            value={updatedClient.payment}
            onChange={handleChange}
          >
            <option value="оплачено">Оплачено</option>
            <option value="неоплачено">Неоплачено</option>
          </select>
        </label>
        <div className="client-btns">
          <button type="submit">Сохранить изменения</button>
          <button type="button" onClick={() => setEditingClient(null)}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );

  const renderClientsTable = () => (
    <table className="client-table" border={1}>
      <thead>
        <tr>
          <th>№</th>
          <th>Имя и Фамилия</th>
          <th>Дата регистрации</th>
          <th>Контакты</th>
          <th>Вид спорта</th>
          <th>Тренер</th>
          <th>Оплата</th>
          <th>Комментарий</th>
          <th>Изменить</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        {filteredClients.map((client, idx) => (
          <tr
            key={client.id}
            style={
              client.payment === "неоплачено"
                ? { backgroundColor: "red", color: "white" }
                : {}
            }
          >
            <td className="table-idx">{idx + 1}</td>
            <td className="table-name">{client.name}</td>
            <td className="table-data">{`${client.day}.${client.month}.${client.year}`}</td>
            <td className="table-contact">{client.phone}</td>
            <td className="table-sport">{client.sport_category}</td>
            <td className="table-trainer">{client.trainer}</td>
            <td className="table-pay">{client.payment}</td>
            <td className="table-comment">{client.comment}</td>
            <td className="table-btns">
              <button
                onClick={() => {
                  setEditingClient(client);
                  setUpdatedClient(client);
                }}
              >
                Изменить
              </button>
            </td>
            <td className="table-btns">
              <button onClick={() => handleDeleteClient(client.id)}>
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="clients">
      <h1>Клиенты</h1>
      <button onClick={handleFilterUnpaid}>
        {filterUnpaid ? "Показать всех" : "Показать неоплаченных"}
      </button>
      {editingClient && renderEditForm()}
      <div className="clients-scrol">{renderClientsTable()}</div>
    </div>
  );
};

export default ClientsPage;
