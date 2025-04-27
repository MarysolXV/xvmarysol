import React, { useEffect, useState } from "react";

const eventDate = new Date("2025-07-19T19:00:00");

const ContadorElegante = () => {
  const [tiempoRestante, setTiempoRestante] = useState(Math.floor((eventDate.getTime() - Date.now()) / 1000));

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante(Math.floor((eventDate.getTime() - Date.now()) / 1000));
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const dias = Math.floor(tiempoRestante / (3600 * 24));
  const horas = Math.floor((tiempoRestante % (3600 * 24)) / 3600);
  const minutos = Math.floor((tiempoRestante % 3600) / 60);
  const segundos = tiempoRestante % 60;

  const crearEnlaceGoogleCalendar = () => {
    const startDate = "20250719T190000";
    const endDate = "20250719T230000"; // Ejemplo de 4 horas
    const text = "XV Años de Marysol";
    const location = "Jardín Magno, Mexicali, B.C.";
    const details = "Acompáñame a celebrar mis XV años.";

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

    window.open(url, "_blank");
  };

  return (
    <section className="py-16 px-6 text-center" data-aos="fade-up">
      <h2 className="text-3xl md:text-5xl font-bold text-[#FF3471] mb-8">Sólo Faltan:</h2>
      <div className="flex justify-center gap-6 text-2xl font-semibold">
        <div className="flex flex-col items-center">
          <span className="text-4xl text-[#FEA201]">{dias}</span>
          <span>Días</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl text-[#FEA201]">{horas}</span>
          <span>Horas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl text-[#FEA201]">{minutos}</span>
          <span>Minutos</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl text-[#FEA201]">{segundos}</span>
          <span>Segundos</span>
        </div>
      </div>

      {/* Botón para agregar al calendario */}
      <div className="mt-10">
        <button
          onClick={crearEnlaceGoogleCalendar}
          className="bg-[#FFD44A] hover:bg-[#FF3471] text-white font-bold py-3 px-6 rounded-full shadow transition"
        >
          Agregar al Calendario 📅
        </button>
      </div>
    </section>
  );
};

export default ContadorElegante;
