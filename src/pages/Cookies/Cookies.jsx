import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cookies.scss";
import { fetchCookies } from "../../modules/cookies/actions";
import { getCookies } from "../../modules/cookies/selectors";
import Modal from "../../components/Modal/Modal";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductsHero from "../../components/ProductsHero/ProductsHero";

const Cookies = () => {
  const title = "Cookies";
  const text = "Si te gustan las galletas, en esta sección encontrarás las mas deliciosas opciones, desde las mas clásicas galletas de mantequilla hasta las de red velvet.";
  const link = "/products";
  const firstLinkText = "Productos";
  const currentText = "Cookies";
  const newArray = [];

  const dispatch = useDispatch();
  const { cookies, loading, errors } = useSelector(getCookies);
  const [modalState, setModalState] = useState({
    isOpen: false,
    selected: null,
  });

  useEffect(() => {
    dispatch(fetchCookies());
  }, []);

  const handleSelect = (product) => {
    setModalState((prev) => ({ ...prev, selected: product, isOpen: true }));
  };

  return (
    <>
      {modalState.isOpen && <Modal setIsOpen={setModalState} selected={modalState.selected} />}

      <section className='cookies'>
        <div className='bg-green'>
          <ProductsHero title={title} text={text} link={link} firstLinkText={firstLinkText} currentText={currentText} />
        </div>
        <div className='main-container'>
          <div className='col-4'>
            {cookies.map((cookie) => (
              <ProductCard key={cookie.id} product={cookie} onSelect={handleSelect} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cookies;
