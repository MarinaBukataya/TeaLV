import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter className="font-small pt-4 mt-4 black-text">
      <hr></hr>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">It's time to get well.</h5>
            <p>Tea is the constant sponsor of your wellness.</p>
          </MDBCol>
          <MDBCol md="6">
            <ul>
              <li className="list-unstyled ">
                <h5 class="mb-0">
                  <i class="fab fa-whatsapp mr-1"></i>(541) 754-3010
                </h5>
              </li>
              <li className="list-unstyled ">
                <h5>
                  <i class="fa fa-envelope mr-1"></i>delicious@tea.com
                </h5>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
};

export default Footer;
