import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardImage,
  MDBBadge,
  MDBIcon,

} from "mdbreact";
import axios from "axios";
import {
  createProduct,
  updateProduct,
} from "../../redux/reducers/productsReducer";
import "./AddProduct.css";

export default function AddProduct() {
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);
  const [product, setProduct] = useState({});
  const param = useParams();
  const history = useHistory();
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((p) => {
        if (p._id === param.id) {
          setProduct({
            title: p.title,
            price: p.price,
            description: p.description,
            contents: p.contents,
            image: p.image,
            category: p.category,
          });
        }
      });
    } else {
      setOnEdit(false);

      setProduct({
        title: "",
        price: "",
        description: "",
        contents: "",
        image: null,
        category: "black",
      });
    }
  }, [products, param.id]);

  

  function onInputChangeHandler(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (onEdit) {
      dispatch(updateProduct({ ...product, _id: param.id }));
    } else {
      dispatch(createProduct(product));
    }

    history.push("/");
  }

  async function handleDeleteImage(e) {
    try {
      await axios.post(
        "https://tealv.herokuapp.com/api/destroy",
        { public_id: product.image.public_id },
        { headers: { Authorization: token } }
      );
      setProduct({ ...product, image: null });
    } catch (err) {
      alert(err.response.data.msg);
    }
  }
  async function handleUpload(e) {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("File is not uploaded");
      if (file.size > 1024 * 1024) return alert("File is too large");
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      )
        return alert("Unsupported image format");
      let formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("https://tealv.herokuapp.com/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setProduct({ ...product, image: res.data });
    } catch (err) {
      alert(err.response.data.msg);
    }
  }

  return (
    <MDBMask style={{ height: "100%", width: "100%", paddingTop: "8rem" }}>
      <MDBContainer>
        <MDBRow>
          <MDBCol
            md="4"
            className="d-flex align-items-center justify-content-center"
          >
            <MDBCard
              style={{
                height: "270px",
                width: "100%",
              }}
              className="d-flex align-items-center justify-content-center"
            >
              {product.image ? (
                <div>
                  <MDBCardImage
                    src={product.image.url}
                    style={{
                      height: "270px",
                    }}
                    alt=""
                    className="img-thumbnail"
                  />

                  <MDBBadge
                    size="6x"
                    color="purple"
                    onClick={handleDeleteImage}
                    style={{
                      position: "absolute",
                      fontSize: "2em",
                      top: "-10px",
                      right: "-10px",
                    }}
                  >
                    <MDBIcon icon="times" />
                  </MDBBadge>
                </div>
              ) : (
                <div className="text-center">
                  <div className="upload-btn-wrapper">
                    <MDBBtn
                      outline
                      className="px-3 py-2 z-depth-0"
                      color="green"
                    >
                      Upload image
                    </MDBBtn>
                    <input
                      type="file"
                      name="file"
                      id="file_up"
                      onChange={handleUpload}
                    />
                  </div>
                </div>
              )}
            </MDBCard>
          </MDBCol>
          <MDBCol md="8">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={onSubmitHandler}>
                  <MDBInput
                    label="Title"
                    name="title"
                    value={product.title}
                    onChange={onInputChangeHandler}
                    required
                  />
                  <MDBInput
                    label="Price"
                    name="price"
                    value={product.price}
                    onChange={onInputChangeHandler}
                    required
                  />
                  <MDBInput
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={onInputChangeHandler}
                    required
                  />
                  <MDBInput
                    label="Contents"
                    name="contents"
                    value={product.contents}
                    onChange={onInputChangeHandler}
                    required
                  />

                  <select
                    style={{ textTransform: "uppercase" }}
                    className="browser-default custom-select"
                    value={product.category}
                    name="category"
                    onChange={onInputChangeHandler}
                    required
                  >
                    {categories.map((category) => (
                      <option value={category.name} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <br></br>
                  <br></br>
                  <div className="text-center">
                    <MDBBtn
                      onClick={() => {history.push("/")}}
                      outline
                      className="px-3 py-2 z-depth-0"
                      color="danger"
                    >
                      Close
                    </MDBBtn>
                    <MDBBtn
                      type="submit"
                      outline
                      className="px-3 py-2 z-depth-0"
                      color="green"
                    >
                      Submit
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBMask>
  );
}
