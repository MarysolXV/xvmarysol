import LightGallery from 'lightgallery/react';

// Importar plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

// Importar estilos
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

const fotos = [
  { src: "/images/foto1.jpg", thumb: "/images/foto1.jpg", alt: "Marysol sonriendo" },
  { src: "/images/foto2.jpg", thumb: "/images/foto2.jpg", alt: "Familia reunida" },
  { src: "/images/foto3.jpg", thumb: "/images/foto3.jpg", alt: "Marysol en su vestido" },
];

const Galeria = () => {
  return (
    <section id="galeria" className="py-16">
      <div className="container mx-auto px-6 text-center" data-aos="fade-up">
        <h2 className="text-4xl text-center font-bold mb-10 text-[#FF3471]">Galería de Fotos</h2>

        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {fotos.map((foto, index) => (
            <a
              href={foto.src}
              key={index}
              className="block overflow-hidden rounded-lg shadow-lg"
              data-aos="zoom-in" // ✨ Aquí agregamos animación a cada imagen
              data-aos-delay={index * 100} // ✨ Pequeño retraso progresivo para un efecto de cascada
            >
              <img
                src={foto.thumb}
                alt={foto.alt}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </a>
          ))}
        </LightGallery>
      </div>
    </section>
  );
};

export default Galeria;
