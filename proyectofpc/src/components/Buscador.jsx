import { useEffect, useState } from "react";
import FormVencimiento from "../components/FormVencimiento.jsx";
import { csv } from "d3-fetch";

const Buscador = () => {
  const [data, setData] = useState([]);
  const [searchSku, setSearchSku] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // Nuevo estado para el artículo seleccionado
  const [showDropdown, setShowDropdown] = useState(true); // Controla la visibilidad del dropdown

  useEffect(() => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAb2wRvGjuGMF8KosaymlHaYX9tY0hnNaBmW98d809oAGSaBLyDNd31Wt_HTxGhGC-Ls14g_hyy2Ma/pub?output=csv";

    csv(csvUrl, (d) => {
      return {
        articulo: d.ARTICULO,
        descripcion: d.DESCRIPCION,
        proveedor: d.Proveedor,
        procedencia: d.PROCEDENCIA,
        vuDias: d.VUdias,
        aceptBodegaDias: d.ABdias,
        aceptBodegaPorcentaje: d.ABporcentaje,
        despachoBodegaDias: d.DBdias,
      };
    }).then(setData);
  }, []);

  // Filtrar datos según el término de búsqueda
  const filteredData = data
    .filter((item) =>
      item.articulo.toLowerCase().includes(searchSku.toLowerCase()),
    )
    .slice(0, 10); // Limitar a 10 resultados.

  // Seleccionar un SKU y mostrar detalles
  const handleSelectItem = (item) => {
    setSelectedItem(item); // Actualiza el estado con el producto seleccionado
    setSearchSku(item.articulo); // Muestra el SKU seleccionado en el input
    setShowDropdown(false); // Oculta el menú desplegable cuando se selecciona
  };

  return (
    <section className="text-dark ">
      <FormVencimiento />

      {/* Input de búsqueda */}
      <div className="input-group mb-3 mt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por código"
          aria-label="Buscar por código"
          value={searchSku}
          onChange={(e) => {
            setSearchSku(e.target.value);
            setShowDropdown(true); // Muestra el menú desplegable al escribir
          }}
        />
      </div>

      {/* Menú desplegable con sugerencias */}
      {searchSku && filteredData.length > 0 && showDropdown && (
        <ul
          className="dropdown-menu show"
          style={{ display: "block", position: "absolute" }}
        >
          {filteredData.map((item, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleSelectItem(item)} // Selecciona el artículo
              style={{ cursor: "pointer" }}
            >
              <strong>{item.articulo}</strong>: {item.descripcion}
            </li>
          ))}
        </ul>
      )}

      {/* Si no hay resultados */}
      {searchSku && filteredData.length === 0 && (
        <p className="text-light">
          No se encontraron resultados para el SKU "{searchSku}"
        </p>
      )}

      {/* Mostrar detalles del producto seleccionado */}
      {selectedItem && (
        <div className="mt-2">
          {/* Tabla con detalles del producto */}
          <table className="table table-bordered">
            <thead className=" table-dark">
              <tr>
                <th scope="col">Propiedad</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>SAP</strong>
                </td>
                <td>{selectedItem.articulo}</td>
              </tr>
              <tr>
                <td>
                  <strong>Descripción</strong>
                </td>
                <td>{selectedItem.descripcion}</td>
              </tr>
              <tr>
                <td>
                  <strong>Proveedor</strong>
                </td>
                <td>{selectedItem.proveedor}</td>
              </tr>
              <tr>
                <td>
                  <strong>Procedencia</strong>
                </td>
                <td>{selectedItem.procedencia}</td>
              </tr>
              <tr>
                <td>
                  <strong>Vida útil</strong>
                </td>
                <td>{selectedItem.vuDias} días</td>
              </tr>
              <tr>
                <td>
                  <strong>Días de aceptación</strong>
                </td>
                <td>{selectedItem.aceptBodegaDias} días</td>
              </tr>
              <tr>
                <td>
                  <strong>% Aceptación</strong>
                </td>
                <td>{selectedItem.aceptBodegaPorcentaje}</td>
              </tr>
              <tr>
                <td>
                  <strong>Despacho Bodega</strong>
                </td>
                <td>{selectedItem.despachoBodegaDias} días</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
export default Buscador;
