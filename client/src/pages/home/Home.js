import React, { useEffect, useState } from "react";
import Item from "../../components/item/Item";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../../redux/reducers/productsReducer";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Carousel from "../../components/carousel/Carousel";
import { useLocation } from "react-router-dom";
import Filters from "../../components/filters/Filters";
import Footer from "../../components/footer/Footer";

export default function Home() {
  const products = useSelector((state) => state.productsReducer.products);
  const dispatch = useDispatch();
  const location = useLocation();
  const [carousel, setCarousel] = useState(true);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    setCarousel(location.state ?? true);
  }, [carousel, location]);

  return (
    <MDBContainer style={{ marginTop: "7rem" }} fluid>
      {carousel ? <Carousel /> : <Filters />}
      <MDBRow align="center" className="mx-5 mt-3">
        {products.map((product) => (
          <MDBCol key={product._id} className="mb-3 px-auto">
            <Item product={product} />
          </MDBCol>
        ))}
      </MDBRow>
      <Footer/>
    </MDBContainer>
  );
}
