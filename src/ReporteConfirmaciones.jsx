import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "./firebase";

const ReporteConfirmaciones = () => {
  const [confirmaciones, setConfirmaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchConfirmaciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "confirmaciones"));
        const datos = querySnapshot.docs.map(doc => doc.data());
        setConfirmaciones(datos);
      } catch (error) {
        console.error("Error al cargar confirmaciones:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchConfirmaciones();
  }, []);

  const totalAsistentes = confirmaciones.reduce((total, item) => total + (parseInt(item.acompanantes) || 0), 0);

  return (
    <section className="py-16 px-6 text-center bg-white" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-[#FF3471] mb-8">Reporte de Confirmaciones</h2>

      {cargando ? (
        <p>Cargando confirmaciones...</p>
      ) : (
        <>
          <p className="text-lg mb-6 font-semibold">
            Total de asistentes confirmados: <span className="text-[#FEA201]">{totalAsistentes}</span>
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-[#FFD44A] text-white">
                  <th className="py-2 px-4 border-b">Invitado</th>
                  <th className="py-2 px-4 border-b">Acompañantes</th>
                  <th className="py-2 px-4 border-b">Fecha de confirmación</th>
                </tr>
              </thead>
              <tbody>
                {confirmaciones.map((conf, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="py-2 px-4 border-b">{conf.nombre}</td>
                    <td className="py-2 px-4 border-b">{conf.acompanantes}</td>
                    <td className="py-2 px-4 border-b">{conf.timestamp?.toDate?.().toLocaleString?.() || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default ReporteConfirmaciones;
