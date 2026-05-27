import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { auth, provider, db } from "./firebase";
export default function App() {
  const [user, setUser] = useState(null);
 const loginGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    setUser(result.user);

  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  await auth.signOut();

  setUser(null);
};
const guardarProducto = async () => {
  try {
    await addDoc(collection(db, "productos"), {
      nombre: "Cacao Premium",
      productor: "Juan Pérez",
      distrito: "Tarapoto",
      precio: "S/ 8.00 kg",
      creado: new Date()
    });

    alert("Producto guardado 🚀");

  } catch (error) {
    console.log(error);
  }
};
  const [productos, setProductos] = useState([]);

useEffect(() => {
  obtenerProductos();
}, []);

const obtenerProductos = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));

  const lista = [];

  querySnapshot.forEach((doc) => {
    lista.push(doc.data());
  });

  setProductos(lista);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021b12] via-[#03351f] to-[#0a7d38] text-gray-800 overflow-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌱</div>

            <div>
              <h1 className="text-2xl font-extrabold text-green-800">
                AgroConecta
              </h1>

              <p className="text-xs text-gray-500">
                Conectando el campo con oportunidades
              </p>
            </div>
          </div>

          <nav className="hidden md:flex gap-10 font-medium text-gray-700">
            <button
  onClick={() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  className="hover:text-green-700 transition"
>
  Inicio
</button>

            <button
  onClick={() => {
    document.getElementById("productos")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="hover:text-green-700 transition"
>
  Productos
</button>

            <a href="#" className="hover:text-green-700 transition">
              Beneficios
            </a>

            <a href="#" className="hover:text-green-700 transition">
              Nosotros
            </a>

            <a href="#" className="hover:text-green-700 transition">
              Contacto
            </a>
          </nav>
{
  user ? (
    <div className="flex items-center gap-3">
      <img
        src={user.photoURL}
        alt=""
        className="w-10 h-10 rounded-full border-2 border-white"
      />

      <span className="text-white font-semibold">
        {user.displayName}
      </span>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl text-sm"
      >
        Salir
      </button>
    </div>
  ) : (
    <button
      onClick={loginGoogle}
      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 text-sm rounded-2xl"
    >
      Iniciar sesión
    </button>
  )
}
        </div>
      </header>
{user && (
<button
  onClick={guardarProducto}

  className="fixed top-24 right-6 z-50 bg-yellow-500 text-black px-4 py-2 rounded-2xl"
>
  Guardar producto
</button>
)}
      {/* HERO */}
      
      <section className="relative pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900 to-green-700"></div>

         <div className="absolute inset-0 opacity-20 text-[300px] flex items-center justify-center">
          🌿
        </div>

        <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.18)] mb-8">
              Transformamos la agricultura de{" "}
              <span className="text-green-300">San Martín</span>
            </h2>

            <p className="text-xl text-green-100 leading-relaxed mb-10">
              Plataforma digital que conecta agricultores con compradores,
              eliminando intermediarios y generando más oportunidades para el
              desarrollo agrícola regional.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
  onClick={() => {
    document.getElementById("productos")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="bg-green-400 hover:bg-green-300 text-green-950 px-8 py-4 rounded-2xl font-bold shadow-2xl transition"
>
  Explorar productos
</button>

              <button
  onClick={() => {
    document.getElementById("solucion")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="border border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-green-900 transition"
>
  Conocer más
</button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-10 shadow-2xl hover:scale-[1.02] transition duration-500">
            <h3 className="text-3xl font-bold text-white mb-8">
              ¿Qué ofrece AgroConecta?
            </h3>

            <div className="space-y-6 text-lg text-green-100">
              <div className="flex gap-4">
                <div className="text-2xl">🤝</div>
                <p>Conexión directa entre agricultores y compradores.</p>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">📱</div>
                <p>Digitalización del comercio agrícola regional.</p>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">📍</div>
                <p>Ubicación y contacto rápido de productores.</p>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">🌎</div>
                <p>Impulso económico para San Martín.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESTADISTICAS */}
      <section className="max-w-7xl mx-auto px-8 -mt-12 relative z-20">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["+120", "Agricultores"],
            ["+500", "Ventas realizadas"],
            ["+15", "Distritos"],
            ["100%", "Productos naturales"],
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center transform hover:-translate-y-3 transition duration-500"
            >
              <h3 className="text-5xl font-extrabold text-green-700 mb-3">
                {item[0]}
              </h3>

              <p className="text-lg text-gray-600">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMA Y SOLUCION */}
      <section className="max-w-7xl mx-auto px-8 py-28">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-red-50 rounded-[35px] p-10 shadow-lg border border-red-100">
            <div className="text-6xl mb-6">⚠️</div>

            <h2 className="text-4xl font-extrabold text-red-700 mb-6">
              Problema actual
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Muchos agricultores dependen de intermediarios que compran a
              precios bajos y reducen las ganancias del productor.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li>❌ Bajos precios para agricultores</li>
              <li>❌ Poca digitalización agrícola</li>
              <li>❌ Difícil acceso a nuevos compradores</li>
              <li>❌ Menores oportunidades de crecimiento</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-[35px] p-10 shadow-lg border border-green-100">
            <div className="text-6xl mb-6">🌱</div>

            <h2 className="text-4xl font-extrabold text-green-700 mb-6">
              Nuestra solución
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              AgroConecta digitaliza el comercio agrícola y conecta directamente
              agricultores y compradores mediante tecnología accesible.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li>✅ Venta directa sin intermediarios</li>
              <li>✅ Mejores precios para productores</li>
              <li>✅ Más alcance y visibilidad</li>
              <li>✅ Impulso económico regional</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section
  id="productos"
  className="max-w-7xl mx-auto px-8 pb-28"
>
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Productos destacados
          </h2>

          <p className="text-xl text-gray-600">
            Calidad que nace de nuestra tierra
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {productos.map((producto, index) => (
            <div
              key={index}
              className="bg-white rounded-[35px] overflow-hidden shadow-xl hover:shadow-[0_25px_80px_rgba(0,0,0,0.18)] hover:-translate-y-4 transition duration-500 border border-gray-100 group"
            >
              <div className="h-56 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-8xl">
                {producto.emoji}
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-extrabold mb-4">
                  {producto.nombre}
                </h3>

                <div className="space-y-3 text-gray-600 text-lg">
                  <p>👨‍🌾 {producto.productor}</p>

                  <p>📍 {producto.distrito}</p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-green-700">
                    {producto.precio}
                  </span>

                  <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-semibold transition">
                    Contactar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-white py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-4 gap-10">
          {[
            [
              "🌿",
              "Apoyamos al agricultor",
              "Promovemos el crecimiento sostenible.",
            ],
            [
              "🛡️",
              "Seguridad y confianza",
              "Información protegida y segura.",
            ],
            [
              "🚚",
              "Conexión directa",
              "Comunicación rápida entre usuarios.",
            ],
            [
              "📈",
              "Impulsamos la región",
              "Más oportunidades económicas.",
            ],
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl mb-5">{item[0]}</div>

              <h3 className="text-2xl font-bold mb-4">{item[1]}</h3>

              <p className="text-gray-600 leading-relaxed">{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-green-950 to-green-700 rounded-[40px] p-16 text-white text-center shadow-2xl">
          <h2 className="text-5xl font-extrabold mb-6">
            ¿Eres agricultor?
          </h2>

          <p className="text-xl text-green-100 mb-10">
            Únete a AgroConecta y lleva tus productos a más personas.
          </p>

          <button className="bg-white text-green-900 px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition">
            Regístrate gratis
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-3xl font-extrabold mb-4">
              🌱 AgroConecta
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Conectando el campo tocachino con oportunidades laborales.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-5">Enlaces</h4>

            <ul className="space-y-3 text-gray-400">
              <li>Inicio</li>
              <li>Productos</li>
              <li>Beneficios</li>
              <li>Contacto</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-5">Información</h4>

            <ul className="space-y-3 text-gray-400">
              <li>📍 TOCACHE, PERU</li>
              <li>📧 contacto@agroconecta.pe</li>
              <li>📱 +51 902 611 359</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-5">
              Nuestro compromiso
            </h4>

            <p className="text-gray-400 leading-relaxed">
              Trabajamos por una agricultura moderna, sostenible y con mayores
              oportunidades para todos.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">
          © 2026 AgroConecta — Proyecto CREA Y EMPRENDE
        </div>
      </footer>
        </div>
  );
}