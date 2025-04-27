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
     <div className="text-gray-800 font-sans scroll-smooth bg-animate">




      <button
        className="fixed top-4 right-4 bg-[#FFD44A] text-white rounded-full shadow p-2 z-50 hover:bg-[#FEA201] transition"
        onClick={toggleMusica}
      >
        {sonando ? "⏸️" : "▶️"}
      </button>


   
    {/* 🌟 Aquí agregas la sección portada */}
   <section
  className="min-h-screen bg-cover bg-center flex flex-col justify-between items-center text-white p-6 relative"
  style={{ backgroundImage: "url('/images/portada.jpg')" }}
>
  {/* Overlay oscuro semitransparente */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Contenido sobre el overlay */}
  <div className="relative w-full flex flex-col justify-between items-center min-h-screen py-10">

    <div className="text-center mt-10" data-aos="fade-down">
      <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg">Mis XV Años</h1>
    </div>

    <div className="text-center mb-10" data-aos="fade-up">
      <h2 className="text-5xl md:text-8xl font-bold drop-shadow-lg text-[#FFD44A]">Marysol</h2>
    </div>

  </div>
</section>







      <section className="py-16 bg-white text-center" data-aos="zoom-in">
        <h2 className="text-3xl font-semibold text-[#FEA201] mb-4" data-aos="fade-up">
  Faltan:
</h2>

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








<section className="py-16 px-6 text-center" data-aos="fade-up">
  <h2 className="text-3xl md:text-5xl font-bold text-[#FF3471] mb-8">Con mucho amor me acompañan</h2>

  <div className="max-w-2xl mx-auto text-lg md:text-xl space-y-12">

    {/* Bloque de Padres */}
    <div data-aos="fade-up" data-aos-delay="100">
      <p className="font-semibold text-[#FEA201] mb-2">Mis Padres:</p>

      {/* Línea dorada más larga y fina */}
      <div className="w-40 h-0.5 bg-[#FEA201] mx-auto my-4 rounded-full"></div>

      <p className="italic">María Elena Ruiz Paredes</p>
      <p className="italic">Salomón Cárdenas Fierro</p>
    </div>

    {/* Bloque de Padrinos */}
    <div data-aos="fade-up" data-aos-delay="200" className="mt-8">
      <p className="font-semibold text-[#FEA201] mb-2">Mis Padrinos:</p>

      {/* Línea dorada más larga y fina */}
      <div className="w-40 h-0.5 bg-[#FEA201] mx-auto my-4 rounded-full"></div>

      <p className="italic">Rocío Ruiz Paredes</p>
      <p className="italic">Lennin Hansmann Vázquez</p>
    </div>

    {/* Mensaje final */}
    <div data-aos="fade-up" data-aos-delay="300" className="mt-10">
      <p className="text-[#FF3471] font-semibold text-xl">
        ¡Acompáñame a celebrar este momento tan especial lleno de amor, alegría y sueños cumplidos!
      </p>
    </div>

  </div>
</section>









 <section className="py-16 px-6 text-center" data-aos="fade-up">
<h2 className="text-3xl md:text-5xl font-bold text-[#FF3471] mb-8">
  Detalles del Evento
</h2>

  <div className="max-w-3xl mx-auto space-y-10 text-lg md:text-xl">

    {/* Lugar */}
    <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
      <img src="/icons/ubicacion.png" alt="Ubicación" className="w-10 h-10 mb-4" />
      <p className="font-semibold text-[#FEA201]">Jardín Magno</p>
      <p>Ruanda Pte. Oriente 1356, Villanova, 21307 Mexicali, B.C.</p>
    </div>

    {/* Foto miniatura */}
    <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
      <img src="/images/jardin-miniatura.jpg" alt="Jardín Magno" className="rounded-lg shadow-lg w-72 h-auto object-cover" />
      <a
        href="https://maps.app.goo.gl/oaYpVVSQjtdi7qzv5"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-[#FEA201] text-white px-6 py-2 rounded-full shadow hover:bg-[#FF3471] transition"
      >
        Ver ubicación en Google Maps
      </a>
    </div>

    {/* Código de vestimenta */}
    <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
      <img src="/icons/vestimenta.png" alt="Código de Vestimenta" className="w-10 h-10 mb-4" />
      <p className="font-semibold text-[#FEA201]">Código de vestimenta:</p>
      <p className="italic">Formal, colores primaverales 🌸 (Evitar negro)</p>
    </div>

    {/* Obsequios */}
    <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="400">
      <img src="/icons/obsequio.png" alt="Obsequios" className="w-10 h-10 mb-4" />
      <p className="font-semibold text-[#FEA201]">Obsequios:</p>
      <p className="italic">Tu presencia es mi mejor regalo, pero si deseas obsequiarme algo tendremos lluvia de sobres.</p>
    </div>

  </div>
</section>

    

<section className="py-16 px-6 text-center" data-aos="fade-up">
  <h2 className="text-3xl font-bold text-[#FF3471] mb-10">Itinerario </h2>
  
  <div className="relative w-3/4 md:w-1/2 mx-auto">
    {/* Línea vertical */}
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-[#FF3471]"></div>

    {/* Eventos */}
    <div className="flex flex-col space-y-10">
      
      <div className="flex items-center" data-aos="fade-up" data-aos-delay="100">
        <div className="w-1/2 text-right pr-4 text-lg font-semibold">7:00 PM</div>
        <div className="w-1/2 text-left pl-4 text-lg">Recepción</div>
      </div>

      <div className="flex items-center" data-aos="fade-up" data-aos-delay="200">
        <div className="w-1/2 text-right pr-4 text-lg font-semibold">7:45 PM</div>
        <div className="w-1/2 text-left pl-4 text-lg">Vals</div>
      </div>

      <div className="flex items-center" data-aos="fade-up" data-aos-delay="300">
        <div className="w-1/2 text-right pr-4 text-lg font-semibold">8:15 PM</div>
        <div className="w-1/2 text-left pl-4 text-lg">Brindis</div>
      </div>

      <div className="flex items-center" data-aos="fade-up" data-aos-delay="400">
        <div className="w-1/2 text-right pr-4 text-lg font-semibold">8:30 PM</div>
        <div className="w-1/2 text-left pl-4 text-lg">Cena</div>
      </div>

      <div className="flex items-center" data-aos="fade-up" data-aos-delay="500">
        <div className="w-1/2 text-right pr-4 text-lg font-semibold">9:00 PM</div>
        <div className="w-1/2 text-left pl-4 text-lg">Fotos</div>
      </div>

      <div className="flex items-center" data-aos="fade-up" data-aos-delay="600">
        <div className="w-1/2 text-right pr-4 text-lg font-semibold">Fiesta</div>
        <div className="w-1/2 text-left pl-4 text-lg">¡A bailar y disfrutar!</div>
      </div>

    </div>
  </div>
</section>






<section className="py-16 px-6 text-center bg-white" data-aos="fade-up">
  <div className="flex flex-col items-center space-y-6">

    {/* Ícono de cámara */}
    <img src="/icons/camara.png" alt="Comparte tus fotos" className="w-16 h-16" data-aos="zoom-in" />

    {/* Hashtag grande */}
 <h2
  className="text-4xl md:text-5xl font-bold text-[#FF3471] animate-heartbeat"
  data-aos="fade-up"
  data-aos-delay="100"
>
  #XVMarysol
</h2>


    {/* Texto bonito */}
    <p className="max-w-2xl text-lg md:text-xl text-gray-700" data-aos="fade-up" data-aos-delay="200">
      Comparte con nosotros tus fotos del evento usando el hashtag <span className="font-semibold text-[#FEA201]">#XVMarysol</span> en todas tus publicaciones en redes sociales.
    </p>

  </div>
</section>








      <section className="py-16 px-6 text-center" data-aos="zoom-in-up">
        <h2 className="text-3xl font-bold text-[#FE9BBA] mb-4" data-aos="fade-up">
  ¿Podrás acompañarme en este día tan especial?
</h2>             
      </section>




<section className="py-16" data-aos="fade-up">

  <RSVPForm />

</section>





<section className="py-16 text-center" data-aos="fade-up">
  <h2 className="text-3xl font-bold text-[#FEA201] mb-4" data-aos="fade-up">
  Libro de visitas
</h2>

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




 <Galeria />

    </div>
  );
};

export default App;

