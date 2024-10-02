import { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import FormVencimiento from "./FormVencimiento";
import InputSearch from "./InputSearch";
import ResultsList from "./ResultsList";
import DetailsProducts from "./DetailsProducts";

const ProductsView = () => {
  const [data, setData] = useState([]);
  const [searchSku, setSearchSku] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(true);

  useEffect(() => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAb2wRvGjuGMF8KosaymlHaYX9tY0hnNaBmW98d809oAGSaBLyDNd31Wt_HTxGhGC-Ls14g_hyy2Ma/pub?output=csv";

    csv(csvUrl, (d) => ({
      articulo: d.ARTICULO,
      descripcion: d.DESCRIPCION,
      proveedor: d.Proveedor,
      procedencia: d.PROCEDENCIA,
      vuDias: d.VUdias,
      aceptBodegaDias: d.ABdias,
      aceptBodegaPorcentaje: d.ABporcentaje,
      despachoBodegaDias: d.DBdias,
    })).then(setData);
  }, []);

  const filteredData = data
    .filter((item) =>
      item.articulo.toLowerCase().includes(searchSku.toLowerCase()),
    )
    .slice(0, 10);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchSku(item.articulo);
    setShowDropdown(false);
  };

  return (
    <section>
      <FormVencimiento />
      <InputSearch
        searchSku={searchSku}
        setSearchSku={setSearchSku}
        setShowDropdown={setShowDropdown}
      />
      {searchSku && filteredData.length > 0 && showDropdown && (
        <ResultsList
          filteredData={filteredData}
          handleSelectItem={handleSelectItem}
        />
      )}
      {selectedItem && <DetailsProducts selectedItem={selectedItem} />}
    </section>
  );
};

export default ProductsView;
