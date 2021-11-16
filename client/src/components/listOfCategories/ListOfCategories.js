import React from "react";
import { MDBBtn, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { useDispatch } from "react-redux";
import {
  deleteCategory,
  updateCategory,
} from "../../redux/reducers/categoriesReducer";
import Category from "./Category";

export default function ListOfCategories({ categories }) {
  const dispatch = useDispatch();

  function handleDeleteCategory(id) {
    dispatch(deleteCategory(id));
  }

  function handleEditCategory(id, name) {
    dispatch(updateCategory(id, name));
  }

  return (
    <MDBListGroup style={{ width: "100%" }}>
      {categories.map((category) => (
        <MDBListGroupItem key={category._id} className="d-flex justify-content-between align-items-center">
          <Category
            category={category.name}
            id={category._id}
            onEditCategory={handleEditCategory}
          />
          <MDBBtn
            key={category._id}
            color="purple"
            outline
            className="px-3 py-2 z-depth-0"
            onClick={() => handleDeleteCategory(category._id)}
          >
            Delete
          </MDBBtn>
        </MDBListGroupItem>
      ))}
    </MDBListGroup>
  );
}
