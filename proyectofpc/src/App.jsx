import "./App.css";
import { csv } from "d3-fetch";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TablaDinamica from "./components/TablaDinamica";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 100;

  useEffect(() => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAb2wRvGjuGMF8KosaymlHaYX9tY0hnNaBmW98d809oAGSaBLyDNd31Wt_HTxGhGC-Ls14g_hyy2Ma/pub?output=csv";

    csv(csvUrl, (d) => {
      return {
        ARTICULO: d.ARTICULO,
        DESCRIPCION: d.DESCRIPCION,
      };
    }).then(setData);
  }, []);

  // Obtener los datos actuales de la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generar los botones de paginación
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => paginate(i)}
        className={`btn btn-primary ${currentPage === i ? "active" : ""} mx-1`}
      >
        {i}
      </button>,
    );
  }

  // Filtrar datos según el término de búsqueda
  const filteredData = data.filter((item) =>
    item.ARTICULO.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="container">
        <h1 className="mt-4">EL ANDRES SE LA COME DOBLADA</h1>

        {/* Input de búsqueda */}
        <div className="input-group mb-3 mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por código"
            aria-label="Buscar por código"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Resultados en tabla */}
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col" className="text-start">
                Código
              </th>
              <th scope="col" className="text-start">
                Descripción
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="text-start">{item.ARTICULO}</td>
                <td className="text-start">{item.DESCRIPCION}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Si no hay resultados */}
        {filteredData.length === 0 && <p>No se encontraron resultados</p>}

        {/* <TablaDinamica /> */}
      </div>
    </>
  );
}

export default App;
