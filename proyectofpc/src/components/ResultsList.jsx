import "./ResultsList.css";

const ResultsList = (props) => {
  const { filteredData, handleSelectItem } = props;

  return (
    <div className="dropdown">
      <ul className="dropdown-menu show">
        {filteredData.map((item, index) => (
          <li
            key={index}
            className="dropdown-item"
            onClick={() => handleSelectItem(item)}
          >
            <strong>{item.articulo}</strong> : {item.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsList;
