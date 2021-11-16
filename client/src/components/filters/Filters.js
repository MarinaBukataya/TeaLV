import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBDropdownMenu,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdbreact";
import { useDispatch } from "react-redux";
import { loadProducts } from "../../redux/reducers/productsReducer";

export default function Filters() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleSort(e) {
    e.preventDefault();
    const sort = e.target.value;
    dispatch(loadProducts(sort));
  }

  function handleSearch(e) {
    if (e.key === "Enter") {
      dispatch(loadProducts("title=" + search));
      setSearch("");
    }
  }

  return (
    <MDBRow end>
      <MDBCol md="2" className="mr-5">
        <input
          className="form-control"
          type="text" 
          placeholder="Search by Name"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleSearch}
        />
      </MDBCol>
      <MDBCol md="2">
        <MDBDropdown>
          <MDBDropdownToggle
            nav
            caret
            color="secondary"
            className="white-text h5"
          >
            Sort
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem value="sort=-price" onClick={handleSort}>
              Highest price first
            </MDBDropdownItem>
            <MDBDropdownItem value="sort=price" onClick={handleSort}>
              Lowest price first
            </MDBDropdownItem>
            <MDBDropdownItem value="sort=-sold" onClick={handleSort}>
              Best sellers
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBCol>
    </MDBRow>
  );
}
