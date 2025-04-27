import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti"; // 🎉 Agregamos confetti

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

  const descargarICS = () => {
  const contenidoICS = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//XV Marysol//EN
BEGIN:VEVENT
DTSTART:20250719T190000
DTEND:20250719T230000
SUMMARY:XV Años de Marysol
DESCRIPTION:Acompáñame a celebrar mis XV años en el Jardín Magno.
LOCATION:Jardín Magno, Mexicali, B.C.
END:VEVENT
END:VCALENDAR
  `.trim();

  const blob = new Blob([contenidoICS], { type: "text/calendar;charset=utf-8" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "XVMarysol.ics";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);

  // 🎊 Confeti personalizado con colores de la invitación
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#93D8D5", "#AEE1F9", "#FFD44A", "#ECBEED"],
  });
};


  return (
    <section className="py-16 px-6 text-center" data-aos="fade-up">
      <h2 className="text-3xl md:text-5xl font-bold text-[#FF3471] mb-8">¡Faltan!</h2>
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

      {/* Botones de calendario */}
      <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={crearEnlaceGoogleCalendar}
          className="bg-[#FFD44A] hover:bg-[#FF3471] text-white font-bold py-3 px-6 rounded-full shadow transition"
        >
          Agregar a Google Calendar 📅
        </button>

        <button
          onClick={descargarICS}
          className="bg-[#93D8D5] hover:bg-[#AEE1F9] text-white font-bold py-3 px-6 rounded-full shadow transition"
        >
          Descargar evento (.ics) 📥
        </button>
      </div>
    </section>
  );
};

export default ContadorElegante;
