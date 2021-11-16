import React, { useState, useEffect } from "react";
import {
  MDBModal,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBInput,
  MDBCardTitle,
} from "mdbreact";
import ListOfCategories from "../../components/listOfCategories/ListOfCategories";
import { saveCategory } from "../../redux/reducers/categoriesReducer";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [modal, setModal] = useState();
  const history = useHistory();

  function addCategory(e) {
    if(e.key === 'Enter'){
    dispatch(saveCategory(category));
    setCategory("");
    }
  }

  useEffect(() => {
    setModal(state.modal);
  }, [modal, state.modal]);

  return (
    <MDBModal isOpen={modal} toggle={() => {}} centered scrolling="true">
      <MDBCard>
        <MDBCardTitle className="text-center h4 mt-4 mb-0" style={{}}>
          Collections
        </MDBCardTitle>
        <MDBCardBody>
          <MDBInput
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-3"
            hint={"Type the new category name and press the Enter key"}
            onKeyPress={addCategory}
          />
          <ListOfCategories categories={categories} />

          <MDBModalFooter className="d-flex justify-content-center">
            <MDBBtn
              onClick={() => {
                setModal(false);
                history.push('/')
              }}
              outline
              className="z-depth-0"
              color="danger"
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBCardBody>
      </MDBCard>
    </MDBModal>
  );
}
