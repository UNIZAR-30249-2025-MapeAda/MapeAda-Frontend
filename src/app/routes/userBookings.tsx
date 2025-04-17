const UserBookings = () => {
  return (
    <div className="p-5">
      <h1 className="mb-4">Mis reservas</h1>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr className="align-middle">
            <th scope="col">ID</th>
            <th scope="col">Usuario</th>
            <th scope="col">Espacios</th>
            <th scope="col">Fecha</th>
            <th scope="col">Duración</th>
            <th scope="col">Asistentes</th>
            <th scope="col">Uso</th>
            <th scope="col">Detalles</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((_, index) => (
            <tr key={index} className="align-middle">
              <th scope="row">{index}</th>
              <td>840091</td>
              <td>L0.01, A.02</td>
              <td>13/05/2025</td>
              <td>10:00 - 11:00</td>
              <td>13</td>
              <td>Investigación</td>
              <td>-</td>
              <td>Válida</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBookings;
