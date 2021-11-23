import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBBtn } from "mdbreact";
import { loadProducts } from "../../redux/reducers/productsReducer";

export default function ViewMore() {
  const [page, setPage] = useState(1);
  const numberOfProducts = useSelector(
    (state) => state.productsReducer.products.length
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts("", "", "", page));
  }, [page]);

  function addPage() {
    setPage(page + 1);
  }

  return (
    <div style={{ textAlign: "center" }} className="mt-3">
      {numberOfProducts < 8 || numberOfProducts === 16  ? (
        ""
      ) : (
        <MDBBtn
          color="purple"
          outline
          className="px-3 py-2 z-depth-0"
          onClick={addPage}
        >
          LOAD MORE PRODUCTS
        </MDBBtn>
      )}
    </div>
  );
}
