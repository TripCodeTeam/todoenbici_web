import React, { useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/web";

interface ContadorAnimadoProps {
  numeroFinal: number;
}

const ContadorAnimado: React.FC<ContadorAnimadoProps> = ({ numeroFinal }) => {
  const [props, set] = useSpring(() => ({ number: 0 }));

  useEffect(() => {
    set({
      number: numeroFinal,
      reset: true,
      reverse: false,
      delay: 200,
      config: config.molasses,
    });
  }, [numeroFinal, set]);

  return (
    <animated.div
      style={{
        display: "grid",
        placeContent: "center",
      }}
    >
      {props.number.to((n) => parseFloat(n.toFixed(0)).toLocaleString("en-US"))}
    </animated.div>
  );
};

export default ContadorAnimado;
