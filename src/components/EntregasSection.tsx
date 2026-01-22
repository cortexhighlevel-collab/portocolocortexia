import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const entregas = [{
  id: "MOD_01",
  titulo: "Automação com IA",
  status: "READY",
  power: 95
}, {
  id: "MOD_02",
  titulo: "Análise Estratégica",
  status: "READY",
  power: 88
}, {
  id: "MOD_03",
  titulo: "Engenharia de Prompt",
  status: "READY",
  power: 92
}, {
  id: "MOD_04",
  titulo: "Personas Treinadas",
  status: "READY",
  power: 85
}, {
  id: "MOD_05",
  titulo: "Agentes de IA",
  status: "READY",
  power: 97
}, {
  id: "MOD_06",
  titulo: "SEO + AEO",
  status: "READY",
  power: 90
}];
const EntregasSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [systemTime, setSystemTime] = useState("00:00:00");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('en-US', {
        hour12: false
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return;
};
export default EntregasSection;