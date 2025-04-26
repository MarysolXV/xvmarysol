import { useEffect, useState } from "react";
import { db, collection, addDoc } from "./firebase";

const RSVPForm = () => {
  const [nombre, setNombre] = useState("");
  const [acompanantesPermitidos, setAcompanantesPermitidos] = useState(0);
  const [acompanantesConfirmados, setAcompanantesConfirmados] = useState(0);
  const [confirmacion, setConfirmacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [invitacionValida, setInvitacionValida] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nombreUrl = params.get("nombre");
    const acompanantesUrl = params.get("acompanantes");

    if (nombreUrl && acompanantesUrl) {
      setNombre(decodeURIComponent(nombreUrl));
      setAcompanantesPermitidos(parseInt(acompanantesUrl));
    } else {
      setInvitacionValida(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "rsvp"), {
        nombre,
        acompanantesConfirmados,
        confirmacion,
        timestamp: new Date()
      });
      setMensaje("¡Gracias por confirmar tu asistencia!");
    } catch (error) {
      console.error("Error al enviar la confirmación:", error);
      setMensaje("Hubo un error al enviar tu respuesta. Intenta más tarde.");
    }
  };

  if (!invitacionValida) {
    return (
      <div className="text-center py-10">
        <h2 className="text-3xl text-red-500">Invitación no válida</h2>
        <p>Lo sentimos, no encontramos los datos necesarios.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-[#FEA201] mb-4">Confirma tu asistencia</h2>
      
      <p className="mb-4 text-lg font-semibold">Invitado: {nombre}</p>
      <p className="mb-4 text-md">Máximo acompañantes: {acompanantesPermitidos}</p>

      <div className="mb-4">
        <label className="block mb-2">¿Asistirás?</label>
        <select
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
          required
          className="p-2 w-full border border-gray-300 rounded"
        >
          <option value="">Selecciona una opción</option>
          <option value="Sí">Sí asistiré</option>
          <option value="No">No podré asistir</option>
        </select>
      </div>

      {confirmacion === "Sí" && (
        <div className="mb-4">
          <label className="block mb-2">¿Cuántos acompañantes llevarás?</label>
          <input
            type="number"
            min="0"
            max={acompanantesPermitidos}
            value={acompanantesConfirmados}
            onChange={(e) => setAcompanantesConfirmados(Number(e.target.value))}
            className="p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
      )}

      <button type="submit" className="bg-[#FEA201] hover:bg-[#FF3471] text-white p-2 rounded w-full mt-4">
        Enviar Confirmación
      </button>

      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
    </form>
  );
};

export default RSVPForm;
