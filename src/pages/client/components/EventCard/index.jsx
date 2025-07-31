const EventCard = ({ date, title, description, location, hora }) => {
  // Función para convertir la fecha a UTC
  const handleDateUTC = (dateString) => {
    const dateObj = new Date(dateString);
    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate());
  };

  // Convertir la fecha usando la función handleDateUTC
  const dateFormat = handleDateUTC(date);

  // Obtener las partes individuales de la fecha
  const dia = dateFormat.getDate();
  const anio = dateFormat.getFullYear();

  // Meses abreviados en inglés
  const shortMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const mes = shortMonthNames[dateFormat.getMonth()];

  // Asignar el resultado completo a una sola variable
  const formattedDate = `${mes} ${dia} ${anio}`;

  const [day, month, year] = formattedDate.split(' ');

  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };
  return (
    <div className="flex overflow-hidden bg-white rounded-lg shadow-md h-[150px] w-full max-w-[500px] ">
      <div className="flex flex-col items-center justify-center flex-shrink-0 font-bold text-white bg-[#A25F3E] h-full w-[24%]">
        <div className="text-lg xl:text-xl">{day}</div>
        <div className="text-4xl leading-none xl:text-5xl">{month}</div>
        <div className="text-lg xl:text-xl">{year}</div>
      </div>
      <div className="relative flex items-center justify-between flex-grow min-w-0 p-4">
        <div className="flex-grow">
          <h3 className="mb-1 text-lg font-semibold line-clamp-2">{title}</h3>
          <p className="text-base text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: description }}></p>
          <div className="flex items-center mt-2 text-xs text-gray-500 pr-3">
            <span className="line-clamp-2">{location}</span>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 px-2 py-1 text-xs font-bold text-white rounded-tl-lg md:py-1 md:px-3 bg-l_color_v-600 md:text-base">
          <span>{hora}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;