import WhiteIcon from "../../../../assets/WhiteIcon.png";

export const Devocionales = ({
    title,
    fecha,
    versiculo}) => {

    const handleDateUTC = (dateString) => {
        const dateObj = new Date(dateString);
        return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate());
        };

    function convertirFechaPersonalizada(fecha) {
        const dateFormat = handleDateUTC(fecha);
        const fechaObj = new Date(dateFormat);
        const dia = fechaObj.getDate();
        const mes = fechaObj.toLocaleString('es-ES', { month: 'long' });
        const año = fechaObj.getFullYear();
    
        return `${mes.charAt(0).toUpperCase() + mes.slice(1)} ${dia}, ${año}`;
    }        

    return(
        <div className="flex flex-col rounded-md border shadow-lg bg-white min-w-[280px] min-h-[200px] max-h-[290px] ">
            <div className="flex w-full h-3 rounded-t-md bg-[#908A42]"></div>
            <span className="flex w-full px-4 mt-2 font-bold text-xl line-clamp-1 ">{title} </span>
            <p className="flex-grow px-4 py-2 italic text-gray-500 text-lg line-clamp-4">
                {versiculo}
            </p>
            <span className="flex w-full justify-end font-bold pr-4 pb-2">{convertirFechaPersonalizada(fecha)}</span>
        </div>
    );
};
export default Devocionales;