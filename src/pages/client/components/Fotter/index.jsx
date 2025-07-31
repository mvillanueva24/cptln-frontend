import WhiteIcon from "../../../../assets/WhiteIcon.png";

export const Fotter = () => {
    return(
        <div className="flex md:flex-col bg-[#222126] text-white justify-center py-10">
            <div className="items-center flex flex-col gap-4">
                <img src={WhiteIcon} alt="qhite-icon" className="w-12 xl:w-16"/>
                <span className="font-light text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.2em]">Cristo para Todas las Naciones - Perú</span>
            </div>
            

        </div>
    );
};
export default Fotter;