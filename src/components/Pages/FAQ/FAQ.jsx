import { useEffect, useState } from "react";
import NavBar from "../../NavBar/NavBar";



const AboutUs = () => {

  async function handlePaymentClick(amount, description, remarks) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic c2tfdGVzdF95NTR0NHhxeEZBd3I5cUUyRW9nYVZ4QVI6'},
      body: JSON.stringify({ "data": { "attributes": { "amount": amount, "description": description, "remarks": remarks } }})
    };
    const data = await fetch('https://api.paymongo.com/v1/links', requestOptions)
      .then(response => response.json());

    console.log("test")
    console.log(data.data.attributes.checkout_url);
    window.open(data.data.attributes.checkout_url, '_blank', 'noopener,noreferrer');

  }

  return (
    <div className="bg-bgGreen md:min-h-screen">
      <NavBar />
      <h2 class="font-heading tracking-px-n mb-10 text-center text-5xl font-bold leading-none text-secGreen md:text-7xl xl:text-8xl">
        Frequently Asked Questions
      </h2>
      {/* <div className="md:container">
        <div className="mx-auto flex max-w-[1280px] flex-col-reverse items-center md:mt-10 md:flex-row md:items-start md:gap-10 md:pb-10">
            <button className="hero-button button h-[45px] w-[100px] border border-secGreen bg-bgGreen text-secGreen" onClick={()=>{handlePaymentClick(10000, "This is a decription", "This is a remark")}}>
              Pay Now
            </button>
        </div>
      </div> */}
    </div>
  );
};

export default AboutUs;
