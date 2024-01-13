"use client";

import React, { useState } from "react";
import almacen from "../jsons/products.json";
import styles from "./styles/products.module.css";
import Image from "next/image";

import { IoIosAddCircleOutline } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { useAuth } from "../Stream/context/useSession";

interface productProps {
  id: string;
  nombre: string;
  descripcion: string;
  image: string;
  precio: number;
  categoria: string;
}

interface ListProducts {
  productos: productProps[];
}

const ProductsCard = () => {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  const addCart = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className={styles.infoStoreBar}>
        <div className={styles.titleStore}>
          <h1>Tienda</h1>
        </div>
        <div className={styles.widget}>
          <div className={styles.boxAccount}>
            {user ? (
              <>
              <div className={styles.boxImageUser}>
                
              </div>
              </>
            ) : null}
          </div>
          <div className={styles.cartStore}>
            <CiShoppingCart className={styles.iconWidget} size={25} />
            {count == 0 ? null : <p className={styles.count}>{count}</p>}
          </div>
        </div>
      </div>
      <div className={styles.containerProduts}>
        {almacen.productos.map((item) => (
          <div className={styles.productBox} key={item.id}>
            <h3 className={styles.nameProduct}>{item.nombre}</h3>
            <div className={styles.boxImageProduct}>
              <Image
                src={`/products/${item.image}`}
                alt="icon"
                className={styles.iconProduct}
                width={260}
                height={260}
              />
            </div>
            <p className={styles.textDescription}>{item.descripcion}</p>
            <div className={styles.boxPrecio}>
              <div className={styles.subBoxPrecio}>
                <p>Precio: ${item.precio}</p>
              </div>
              <div className={styles.subBoxPrecio}>
                <div className={styles.btnsPrecio}>
                  <p className={styles.btnPagar}>Comprar</p>
                  <div className={styles.iconAddCart}>
                    <IoIosAddCircleOutline
                      className={styles.iconAdd}
                      size={20}
                      onClick={addCart}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsCard;
