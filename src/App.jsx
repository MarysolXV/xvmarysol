import { db, collection, addDoc } from "./firebase"; // ¡Asegúrate de tener esto importado!
import Galeria from "./Galeria"; // Importa el componente
import RSVPForm from "./RSVPForm";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { motion } from "framer-motion";
import { Howl } from "howler";
import "./App.css";
				

const eventDate = new Date("2025-07-19T19:00:00");

const App = () => {
  const [nombreInvitado, setNombreInvitado] = useState("Invitado especial");
  const [audio, setAudio] = useState(null);
  const [sonando, setSonando] = useState(false);
  const [mensajeLibro, setMensajeLibro] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState("");

  const enviarMensajeLibro = async () => {
    if (!mensajeLibro.trim()) {
      setMensajeEnviado("Por favor escribe un mensaje antes de enviar.");
      return;
    }

    try {
      await addDoc(collection(db, "libroVisitas"), {
        mensaje: mensajeLibro,
        timestamp: new Date()
      });
      setMensajeEnviado("¡Gracias por tu mensaje!");
      setMensajeLibro(""); // Limpiar el textarea
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setMensajeEnviado("Hubo un error al enviar tu mensaje. Intenta de nuevo.");
    }
  };






  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.init({ duration: 1200 });


    const params = new URLSearchParams(window.location.search);
    const idInvitado = params.get("idInvitado");
    if (idInvitado) {
      setNombreInvitado(`Invitado #${idInvitado}`);
    }

    const musica = new Howl({
      src: ["/musica.mp3"],
      html5: true,
      volume: 0.4,
      loop: true,
    });
    setAudio(musica);
  }, []);

  const toggleMusica = () => {
    if (!audio) return;
    if (sonando) {
      audio.pause();
    } else {
      audio.play();
    }
    setSonando(!sonando);
  };

  const tiempoRestante = Math.floor((eventDate.getTime() - Date.now()) / 1000);

  return (
    <div className="bg-gradient-to-br from-[#FE9BBA] via-[#ECBEED] to-[#93D8D5] text-gray-800 font-sans scroll-smooth">
      <button
        className="fixed top-4 right-4 bg-[#FFD44A] text-white rounded-full shadow p-2 z-50 hover:bg-[#FEA201] transition"
        onClick={toggleMusica}
      >
        {sonando ? "⏸️" : "▶️"}
      </button>

      <section className="min-h-screen flex flex-col justify-center items-center text-center p-6" data-aos="fade-up">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-[#FF3471] mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ¡Mis XV Años!
Marysol
        </motion.h1>
        <p className="text-xl md:text-2xl mb-2">Querido {nombreInvitado},</p>
        <p className="max-w-xl">
          Me encantaría contar con tu presencia en un día muy especial lleno de magia, alegría y mucho amor.
        </p>
      </section>

      <section className="py-16 bg-white text-center" data-aos="zoom-in">
        <h2 className="text-3xl font-semibold text-[#FEA201] mb-4">Faltan:</h2>
        <div className="flex justify-center">
          <CountdownCircleTimer
            isPlaying
            duration={tiempoRestante}
            colors={["#FEA201", "#FFD44A"]}
            colorsTime={[600, 300]}
            size={180}
          >
            {({ remainingTime }) => {
              const dias = Math.floor(remainingTime / (3600 * 24));
              const horas = Math.floor((remainingTime % (3600 * 24)) / 3600);
              const minutos = Math.floor((remainingTime % 3600) / 60);
              return (
                <div>
                  <p className="text-lg">{dias} días</p>
                  <p className="text-lg">{horas} hrs</p>
                  <p className="text-lg">{minutos} min</p>
                </div>
              );
            }}
          </CountdownCircleTimer>
        </div>
      </section>

      <section className="py-16 px-6 text-center" data-aos="fade-right">
        <h2 className="text-3xl font-bold mb-4 text-[#FF3471]">Detalles del evento</h2>
        <p className="text-xl mb-2">📍 Jardín Magno</p>
        <p className="mb-2">📅 19 de Julio de 2025</p>
        <p className="mb-4">🕖 7:00 p.m.</p>
        <a
          href="https://maps.app.goo.gl/oaYpVVSQjtdi7qzv5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#FEA201] text-white px-4 py-2 rounded-full shadow hover:bg-[#FF3471]"
        >
          Ver ubicación en Google Maps
        </a>
      </section>

    
 <Galeria />


      <section className="py-16 px-6 text-center bg-white" data-aos="zoom-in-up">
        <h2 className="text-3xl font-bold text-[#FE9BBA] mb-4">¿Podrás acompañarme en este día tan especial?</h2>
            
 
      </section>

<section className="py-16 bg-white" data-aos="fade-up">

  <RSVPForm />

</section>

<section className="py-16 text-center bg-[#FFD44A]/20" data-aos="fade-up">
  <h2 className="text-3xl font-bold text-[#FEA201] mb-4">Libro de visitas</h2>
  <p className="mb-4">Déjame un mensajito bonito 🥰</p>
  
  <textarea
    value={mensajeLibro}
    onChange={(e) => setMensajeLibro(e.target.value)}
    className="w-3/4 md:w-1/2 h-32 p-4 rounded border-2 border-[#FE9BBA]"
    placeholder="Escribe tu mensaje aquí..."
  ></textarea>

  <br />

  <button
    onClick={enviarMensajeLibro}
    className="mt-4 bg-[#FF3471] text-white px-6 py-2 rounded-full hover:bg-[#FEA201]"
  >
    Enviar mensaje
  </button>

  {mensajeEnviado && (
    <p className="mt-4 text-green-600 font-semibold">{mensajeEnviado}</p>
  )}
</section>

    </div>
  );
};

export default App;

