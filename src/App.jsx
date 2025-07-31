import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { StrictMode, lazy, Suspense } from "react";
import PageLoader from "./pages/client/components/Loaders/PageLoader";
import CursosBiblico from "./pages/client/pages/CursosBiblicos";
import { AuthProvider } from "./context/AuthContext";
import Slider from "./Prueba";
const AboutUs = lazy(() => import("@/pages/client/pages/AboutUs"));
const Programas = lazy(() => import("@/pages/client/pages/Programs"));
const Niños = lazy(() => import("@/pages/client/pages/Programs/Niños"));
const Familia = lazy(() => import("@/pages/client/pages/Programs/Familia"));
const CreciendoEnFamilia = lazy(() => import("@/pages/client/pages/ProgramaDescripcion/CreciendoEnFamilia"));
const CreciendoEnFamiliaSecciones = lazy(() => import("@/pages/client/pages/ProgramaDescripcion/CreciendoEnFamiliaSecciones"));
const EquipandoSantos = lazy(() =>
  import("@/pages/client/pages/Programs/EquipandoSantos")
);
const Home = lazy(() => import("@/pages/client/pages/Home"));
const Ebooks = lazy(() => import("@/pages/client/pages/Ebooks"));
const Noticia = lazy(() => import("@/pages/client/pages/Noticias"));
const Oracion = lazy(() => import("@/pages/client/pages/Oracion"));
const Devocional = lazy(() => import("@/pages/client/pages/Devocional"));
const DevocionalesDiarios = lazy(() =>
  import("@/pages/client/pages/DevocionalesDiarios")
);
const Navbar = lazy(() => import("@/pages/client/components/Navbar"));
const Fotter = lazy(() => import("@/pages/client/components/Fotter"));

const Donate = lazy(() => import("@/pages/client/pages/Donate"));
const CursosBiblicos = lazy(() =>
  import("@/pages/client/pages/CursosBiblicos")
);
const CursosCompletos = lazy(() =>
  import("@/pages/client/pages/CursosCompletos")
);
const Joel = lazy(() => import("@/pages/client/pages/Program/Joel"));
const ProgramaEspecifico = lazy(() => import("@/pages/client/pages/Program"));
const ProgramaDescripcion = lazy(() => import("@/pages/client/pages/ProgramaDescripcion"));
const Pasi = lazy(() => import("@/pages/client/pages/Program/Pasi"));
const JuntosComunidad = lazy(() =>
  import("@/pages/client/pages/Program/JuntosComunidad")
);
const Contact = lazy(() => import("@/pages/client/pages/Contact"));
const NewsEvents = lazy(() => import("@/pages/client/pages/NewsEvents"));
const NotFound = lazy(() => import("@/pages/client/pages/ExtraPages/NotFound"));

// Admin const
const LoginAdmin = lazy(() => import("@/pages/admin/LoginAdmin"));
const RegisterAdmin = lazy(() => import("@/pages/admin/RegisterAdmin"));
const DevoAd = lazy(() => import("@/pages/admin/DevoAdmin"));
const NewsAdmin = lazy(() => import("@/pages/admin/NewsAdmin"))
const EventsAdmin = lazy(() => import("@/pages/admin/EventsAdmin"))
const ProgramaAdmin = lazy(() => import("@/pages/admin/ProgramaAdmin"))
// const Navbar = lazy(() => import("@/pages/client/components/Navbar"));
const Administracion = lazy(() => import("@/pages/admin/Administracion"))
const TablaEvento = lazy(() => import("@/pages/admin/TablaEvento"))
const TablaDevocional = lazy(() => import("@/pages/admin/TablaDevocional"))
const TablaNews = lazy(() => import("@/pages/admin/TablaNews"))
const TablaCategoria = lazy(() => import("@/pages/admin/TablaCategoria"))
const TablaEbooks = lazy(() => import("@/pages/admin/TablaEbooks"))
const TablaOracion = lazy(() => import("@/pages/admin/TablaOracion"))
const CategoriaAdmin = lazy(() => import("@/pages/admin/CategoriaAdmin"))
const EbooksAdmin = lazy(() => import("@/pages/admin/EbooksAdmin"))
const CursoAdmin = lazy(() => import("@/pages/admin/CursosAdmin"))
const TablaContactanos = lazy(() => import("@/pages/admin/TablaContactanos"))
const TablaProgramas = lazy(() => import("@/pages/admin/TablaProgramas"))
const TablaProgramaContenidoAdmin = lazy(() => import("@/pages/admin/TablaProgramaContenidoAdmin"))
const ProgramaContenidoAdmin = lazy(() => import("@/pages/admin/ProgramaContenidoAdmin"))
const Tablacursosbiblicos = lazy(() => import("@/pages/admin/TablaCursosBi"))
const TablaresEbooks = lazy(() => import("@/pages/admin/TablaresEbooks"))
const TablaCursos = lazy(() => import("@/pages/admin/TablaCurso"))
const CapituloCursosAdmin = lazy(() => import("@/pages/admin/CapitulosCursosAdmin"))
const TablaCapituloCurso = lazy(() => import("@/pages/admin/TablaCapituloCurso"))
const RadioAdmin = lazy(() => import('@/pages/admin/RadioAdmin'))
const TablaRadioSecciones = lazy(() => import('@/pages/admin/TablaRadioSecciones'))
const SeccionRadioAdmin = lazy(() => import('@/pages/admin/SeccionRadioAdmin'))
const TablaRadioSeccionContenidoAdmin = lazy(() => import('@/pages/admin/TablaRadioSeccionContenidoAdmin'))
const ContenidoSeccionRadioAdmin = lazy(() => import('@/pages/admin/ContenidoSeccionRadioAdmin'))
const TablaUsuario = lazy(() => import('@/pages/admin/TablaUsuairo'))

const App = () => {
  return (
    <>
        <div className="bg-[#EAE9E5]">
          <Suspense fallback={<PageLoader />}>
            {/* <Navbar color="bg-l_color_r-600"/>           */}
            <BrowserRouter>
              <AuthProvider>
                <Routes>

                  <Route path="/" element={<Navbar color="bg-l_color_r-600" />}>
                    <Route index element={<Home />} />
                    <Route path="aboutus" element={<AboutUs />} />
                    {/* <Route path="programas" element={<Programas />} /> */}
                    {/* <Route
                      path="programas/niños-adolescentes"
                      element={<Niños />}
                    />
                    <Route
                      path="programas/niños-adolescentes/joel"
                      element={<Joel />}
                    />
                    <Route
                      path="programas/niños-adolescentes/pasi"
                      element={<Pasi />}
                    />
                    <Route
                      path="programas/niños-adolescentes/juntos-en-comunidad"
                      element={<JuntosComunidad />}
                    />

                    <Route path="programas/familia" element={<Familia />} />
                    <Route
                      path="programas/creciendo-en-familia"
                      element={<CreciendoFamilia />}
                    /> */}

                    <Route
                      path="programas/"
                      element={<Programas />}
                    />
                    <Route
                      path="programas/:nombre"
                      element={<ProgramaEspecifico />}
                    />

                    <Route
                      path="programas/:categoria/programa/:programa"
                      element={<ProgramaDescripcion />}
                    />

                    <Route
                      path="programa/creciendo-en-familia"
                      element={<CreciendoEnFamilia />}
                    />
                    <Route
                      path="programa/creciendo-en-familia/:id"
                      element={<CreciendoEnFamiliaSecciones />}
                    />
                    <Route
                      path="programa/:programa"
                      element={<ProgramaDescripcion />}
                    />

                    {/* <Route path="/programas/joel" element={<Joel/>}/>
                <Route path="/programas/pasi" element={<Joel/>}/>
                <Route path="/programas/juntos-en-comunidad" element={<Joel/>}/> */}

                    <Route path="noticia/:id" element={<Noticia />} />
                    <Route path="recursos/ebooks" element={<Ebooks />} />
                    <Route
                      path="recursos/devocional-diario"
                      element={<Devocional />}
                    />

                    <Route
                      path="recursos/devocional/:id"
                      element={<Devocional />}
                    />

                    <Route
                      path="recursos/cursos-biblicos"
                      element={<CursosBiblicos />}
                    />
                    <Route
                      path="recursos/cursos-biblicos/:id"
                      element={<CursosCompletos />}
                    />
                    <Route
                      path="noticias-y-eventos"
                      element={<NewsEvents />}
                    />
                    <Route path="donate" element={<Donate />} />
                    <Route path="contactanos" element={<Contact />} />
                    <Route path="oracion" element={<Oracion />} />
                    <Route
                      path="recursos/devocionales"
                      element={<DevocionalesDiarios />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Route>


                  {/* <Route path="/admin" element={<Administracion />}>
                    <Route path="register" element={<RegisterAdmin />} />
                    <Route path="devoAd" element={<DevoAd />} />
                    <Route path="login" element={<LoginAdmin />} />
                    <Route path="newsad" element={<NewsAdmin />} />
                    <Route path="eventad" element={<EventsAdmin />} />
                    <Route path="tablaevento" element={<TablaEvento />} />
                    <Route path="tablaevento/:id" element={<EventsAdmin />} />
                    <Route
                      path="tabladevocional"
                      element={<TablaDevocional />}
                    />
                    <Route path="tabladevocional/:id" element={<DevoAd />} />
                    <Route path="tablanews" element={<TablaNews />} />
                  </Route> */}
                  <Route path="/cptln/pe/admin/login" element={<LoginAdmin />} />
                  <Route path="/admin" element={<Administracion />}>
                    <Route path="/admin/users/cptln/register" element={<RegisterAdmin />} />
                    <Route path="devoAd" element={<DevoAd />} />
                    <Route path="newsad" element={<NewsAdmin />} />
                    <Route path="eventad" element={<EventsAdmin />} />
                    <Route path="categorias" element={<CategoriaAdmin />} />
                    <Route path="ebooks" element={<EbooksAdmin />} />
                    <Route path="programas" element={<ProgramaAdmin />} />
                    <Route path="programas/contenido/:id" element={<ProgramaContenidoAdmin />} />
                    <Route path="cursos" element={<CursoAdmin />} />
                    <Route path="cursos/capitulos/:idcurso" element={<CapituloCursosAdmin />} />

                    <Route index element={<TablaEvento />} />
                    <Route path="tablaevento/:id" element={<EventsAdmin />} />
                    <Route path="tabladevocional" element={<TablaDevocional />} />
                    <Route path="tabladevocional/:id" element={<DevoAd />} />
                    <Route path="tablanews" element={<TablaNews />} />
                    <Route path="tablanews/:id" element={<NewsAdmin />} />
                    <Route path="tablaebooks" element={<TablaEbooks />} />
                    <Route path="tablaebooks/:id" element={<EbooksAdmin />} />

                    <Route path="tablausuario" element={<TablaUsuario />} />

                    <Route path="tablaoracion" element={<TablaOracion />} />
                    <Route path="tablacontactos" element={<TablaContactanos />} />


                    <Route path="tablacategoria" element={<TablaCategoria />} />
                    <Route path="tablacategoria/:id" element={<CategoriaAdmin />} />
                    <Route path="tablaprogramas" element={<TablaProgramas />} />
                    <Route path="tablaprogramas/:id" element={<ProgramaAdmin />} />
                    <Route path="tablaprogramas/:id/tablacontenido" element={<TablaProgramaContenidoAdmin />} />
                    <Route path="tablaprogramas/:idprograma/tablacontenido/:id" element={<ProgramaContenidoAdmin />} />
                    <Route path="tablacursos/" element={<TablaCursos />} />
                    <Route path="tablacursos/:idcurso" element={<CursoAdmin />} />
                    <Route path="tablacursos/:idcurso/tablacapitulos" element={<TablaCapituloCurso />} />
                    <Route path="tablacursos/:idcurso/tablacapitulos/:idcapitulo" element={<CapituloCursosAdmin />} />

                    <Route path="tablacursosbi" element={<Tablacursosbiblicos />} />
                    <Route path="tablapeticionebooks" element={<TablaresEbooks />} />
                    <Route path="radioconfig" element={<RadioAdmin />} />
                    <Route path="radioconfig/tablasecciones" element={<TablaRadioSecciones />} />
                    <Route path="radioconfig/tablasecciones/agregar" element={<SeccionRadioAdmin />} />
                    <Route path="radioconfig/tablasecciones/:idseccion" element={<SeccionRadioAdmin />} />
                    <Route path="radioconfig/tablasecciones/:idseccion/tablacontenidoseccion" element={<TablaRadioSeccionContenidoAdmin />} />
                    <Route path="radioconfig/tablasecciones/:idseccion/tablacontenidoseccion/agregar" element={<ContenidoSeccionRadioAdmin />} />
                    <Route path="radioconfig/tablasecciones/:idseccion/tablacontenidoseccion/:idcontenido" element={<ContenidoSeccionRadioAdmin />} />

                    {/* <Route path="tablaprogramas"/> */}

                    {/* <Route path="test" element={<TestView />} /> */}
                    {/* <Route path="/programas" element={<Programs/>} /> */}
                  </Route>
                  <Route path="/pruebas" element={<Slider />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
            {/* <Fotter /> */}
          </Suspense>
        </div>

    </>
  );
};

export default App;
