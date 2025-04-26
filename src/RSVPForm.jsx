import { useState, useEffect } from "react";
import { db, collection, addDoc } from "./firebase";

const RSVPForm = () => {
  const [nombre, setNombre] = useState("");
  const [acompanantes, setAcompanantes] = useState(0);
  const [confirmacion, setConfirmacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [invitacionValida, setInvitacionValida] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nombreUrl = params.get("nombre");
    const acompanantesUrl = params.get("acompanantes");

    if (nombreUrl && acompanantesUrl) {
      setNombre(decodeURIComponent(nombreUrl));
      setAcompanantes(parseInt(acompanantesUrl));
    } else {
      setInvitacionValida(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "rsvp"), {
        nombre,
        acompanantes,
        confirmacion,
        timestamp: new Date()
      });
      setMensaje("¡Confirmación enviada! Gracias por tu respuesta.");
      setConfirmacion("");
    } catch (error) {
      console.error("Error al enviar la confirmación:", error);
      setMensaje("Hubo un error al enviar tu respuesta. Intenta de nuevo.");
    }
  };

  if (!invitacionValida) {
    return (
      <section id="confirmacion" className="py-16 bg-[#93D8D5]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#FE9BBA] mb-4">Invitación no válida</h2>
          <p className="text-lg text-gray-700">
            Lo sentimos, no se encontraron los datos necesarios para confirmar tu asistencia.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="confirmacion" className="py-16 bg-[#93D8D5]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#FE9BBA]">Confirma tu Asistencia</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre:</label>
            <input
              type="text"
              value={nombre}
              disabled
              className="p-2 w-full border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Número de acompañantes:</label>
            <input
              type="number"
              value={acompanantes}
              disabled
              className="p-2 w-full border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <select
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            required
            className="p-2 w-full border border-gray-300 rounded mb-4"
          >
            <option value="">¿Asistirás?</option>
            <option value="Sí">Sí, asistiré</option>
            <option value="No">No podré asistir</option>
          </select>
          <button type="submit" className="bg-[#FEA201] hover:bg-[#FF3471] p-2 w-full text-white rounded">
            Enviar Confirmación
          </button>
          {mensaje && <p className="text-center mt-4 text-lg">{mensaje}</p>}
        </form>
      </div>
    </section>
  );
};

export default RSVPForm;
