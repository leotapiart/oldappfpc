const TablaDinamica = () => {
  return (
    <>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" className="text-start">
              ARTICULO
            </th>
            <th scope="col" className="text-start">
              DESCRIPCION
            </th>
            <th scope="col" className="text-start">
              VIDA UTIL
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, index) => (
            <tr key={index}>
              <th scope="row">{indexOfFirstItem + index + 1}</th>
              <td className="text-start">{row["ARTICULO"]}</td>
              <td className="text-start">{row["DESCRIPCION"]}</td>
              <td className="text-start">{row["VUdias"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4">
        {paginationButtons}
      </div>
    </>
  );
};

export default TablaDinamica;
