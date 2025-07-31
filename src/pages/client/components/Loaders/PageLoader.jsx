import logo from '../../../../assets/OriginalLogo.png'
const PageLoader = () => {

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                <img src={logo} alt="" className='animate-spin' />
                <span className='flex ml-2 text-5xl font-bold'>CPTLN</span>
            </div>
        </>
    )
}

export default PageLoader