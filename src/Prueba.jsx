import { useEffect, useState } from "react"

const Slider = () => {

    const noticias = [
        {
            titulo: 'Noticia 1',
            categoria: 'Categoria 1',
        },
        {
            titulo: 'Noticia 2',
            categoria: 'Categoria 2',
        },
        {
            titulo: 'Noticia 3',
            categoria: 'Categoria 3',
        },
    ]

    const [indiceCarousel, setIndiceCarousel] = useState(0)
    const handleIndiceCarousel = (value) =>{
        setIndiceCarousel(value)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (indiceCarousel+1 > noticias.length) {
                setIndiceCarousel(0)
            }
            else{
                setIndiceCarousel(indiceCarousel+1)
            }
        }, 1000);
    }, []);

    return (
        <>
            <div className="w-full border-green-500 overflow-hidden">
                <div className="flex transition-all duration-300" 
                    style={{}}>

                        {noticias.map((noticia, index) => (
                            <div className="flex flex-shrink-0 w-1/2">
                                {noticia.titulo}
                                {noticia.categoria}
                            </div>
                        ))}
                    
                </div>
            </div>
        </>
    )
}

export default Slider