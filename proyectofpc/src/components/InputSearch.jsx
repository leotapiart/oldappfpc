const InputSearch = (props) => {
  const { searchSku, setSearchSku, setShowDropdown } = props;

  return (
    <div className="input-group mb-3 mt-5">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por código"
        aria-label="Buscar por código"
        value={searchSku}
        onChange={(e) => {
          setSearchSku(e.target.value);
          setShowDropdown(true);
        }}
      />
    </div>
  );
};

export default InputSearch;
