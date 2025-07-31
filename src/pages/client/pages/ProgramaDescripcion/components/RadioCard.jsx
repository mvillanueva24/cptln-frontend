import { useState, useRef, useEffect } from "react";
import imgjoel1 from '../../../../../assets/Joel_2.jpg'
import { MediaSlider } from "../CreciendoEnFamilia/components/MediaSlider";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

export const RadioCard = ({descripcion = "", contenido = []}) =>{
    const [isOpenDescription, setIsOpenDescription] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            const element = contentRef.current;
            if (element) {
                const isOverflowing = element.scrollHeight > element.clientHeight;
                setShowIcon(isOverflowing);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [descripcion]);

    function onClickDescription()  {
        setIsOpenDescription(!isOpenDescription);
    }
    return(
    <div className="flex flex-col max-w-[400px] sm:max-w-[600px] max-h-[800px] shadow-lg min-h-72">
        {/* <div className="transition-all hover:scale-105 duration-300">
            <MediaSlider contenido={contenido}/>
        </div> */}
        <div>
            <MediaSlider contenido={contenido}/>
        </div>
        <div
            className={`bg-white flex px-6 pb-2 pt-4 transition-all duration-500 ${
                isOpenDescription ? 'max-h-[500px] overflow-y-auto' : 'max-h-[98px] min-[1100px]:max-h-[115px] overflow-hidden'
            } min-h-[98px] min-[1100px]:min-h-[115px] border-t border-gray-300`} style={{scrollbarWidth: "none"}}
        >
            <div ref={contentRef} className="flex-grow">
            <p
                className={`flex-grow standard-paragraph transition-all duration-500 ${
                    isOpenDescription ? 'opacity-100 visibility-visible' : 'opacity-100 visibility-hidden'
                }`} dangerouslySetInnerHTML={{ __html: descripcion}}
            >
            </p>
            </div>
            

            {showIcon && isOpenDescription ? (
                <FaMinus
                    onClick={onClickDescription}
                    className="ml-2 -mr-2 flex-shrink-0 cursor-pointer transition-transform duration-1000 transform rotate-0 min-[1100px]:mt-1"
                    size={23}
                />
            ) : (
                <FaPlus
                    onClick={onClickDescription}
                    className="ml-2 -mr-2 flex-shrink-0 cursor-pointer transition-transform duration-1000 transform rotate-90 min-[1100px]:mt-1"
                    size={23}
                />
            )}
        </div>
    </div>
    )
}

export default RadioCard