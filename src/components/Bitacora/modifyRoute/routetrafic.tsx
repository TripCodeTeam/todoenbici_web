import MapComponent from "@/components/maps/Map";
import React, { useState, FormEvent } from "react";
import styles from "./traffic.module.css";
import axios from "axios";
import { useGlobalContext } from "@/components/context/ContextDashboard";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReqProps {
  longitude: number;
  latitude: number;
  state: string;
}
function RouteTrafic() {
  const [data, setData] = useState<ReqProps>({
    latitude: 0,
    longitude: 0,
    state: "",
  });

  const { user } = useGlobalContext();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(data)
    try {
      const response = await axios.post("/api/coordinates", data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const dataRes = response.data;
      console.log(response);

      if (dataRes.message) {
        toast.success(dataRes.message);
        console.log(dataRes.newCoordinates);
        setInterval(() => {
          router.refresh();
        }, 4000);
      } else {
        toast.warning("Imposible Actualizar, intentelo mas tarde");
        throw new Error("Imposible Actualizar, intentelo mas tarde");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div className={styles.RouteContainer}>
        <div className={styles.boxPreviewMap}>
          <MapComponent />
        </div>
        <div className={styles.formChangeRoute}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="latitude"
              placeholder="Ingresa latitud (3.4516)"
              onChange={handleChange}
            />
            <input
              type="text"
              name="longitude"
              placeholder="Ingresa longitud (-76.5320)"
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="Ingresa tu estado actual"
              onChange={handleChange}
            />
            <div className={styles.boxBtnUpdate}>
              <button type="submit">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RouteTrafic;
