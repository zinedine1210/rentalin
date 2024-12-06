import { Icon } from "@iconify/react/dist/iconify.js";

const Pagination = ({page, pagerList, handleNext, handlePrev, handleBackward, handleForward, handleClickPage}: {
    page: number,
    pagerList: number,
    handleNext: any,
    handlePrev: any,
    handleBackward: any,
    handleForward: any,
    handleClickPage: any
}) => {
    let minPage = 1
    let maxPage = 5
    if(page > 3){
        minPage = page - 2
        maxPage = page + 2
        if(maxPage > pagerList){
            if(maxPage - pagerList < 2){
                minPage = page - 3
                maxPage = page + 1
            } else {
                let varPage = page - 4
                minPage = page - 4 === 0 ? 1:varPage
                maxPage = page
            }
        }
    } else {
        if(maxPage > pagerList){
            maxPage = pagerList
        }
    }
   
 
    let arrayPages = []

    for(var i=minPage, l=maxPage; i<=l; i++){
        arrayPages.push(i)
    }

    return (
        <div className="flex justify-between">
            <div className="flex items-center space-x-1">
                <button type="button" disabled={!(page > 1)} onClick={handleBackward} className="dark:bg-darkPrimary dark:hover:bg-darkprimary-500/50 disabled:cursor-not-allowed disabled:bg-zinc-300 py-2 2xl:py-2 xl:px-3 px-3 2xl:px-5 gap-2 bg-white hover:bg-zinc-200 duration-300 ease-in-out rounded-md text-sm xl:text-[11px] 2xl:text-sm flex items-center dark:disabled:bg-black">
                    <span title="previous" >
                        <Icon icon={'system-uicons:backward'} className="text-sm xl:text-xl 2xl:text-2xl"/>
                    </span>
                    <h1 className="hidden md:block">Backward</h1>
                </button>
                <button type="button" onClick={handlePrev} disabled={!(page > 1)} className="dark:bg-darkPrimary dark:hover:bg-darkprimary-500/50 disabled:cursor-not-allowed disabled:bg-zinc-300 py-2 2xl:py-2 xl:px-3 px-3 2xl:px-5 gap-2 bg-white hover:bg-zinc-200 duration-300 ease-in-out rounded-md text-sm xl:text-[11px] 2xl:text-sm flex items-center dark:disabled:bg-black">
                    <span title="previous">
                        <Icon icon={'fluent:arrow-previous-20-filled'} className="text-sm xl:text-xl 2xl:text-2xl"/>
                    </span>
                    <h1 className="hidden md:block">Previous</h1>
                </button>
            </div>

            <div className="flex items-center space-x-1">
                {
                    arrayPages && arrayPages.length > 0 ? arrayPages.map((e, i) => {
                            return <button key={i} onClick={() => handleClickPage(e)}><div className={`cursor-pointer flex items-center justify-center w-8 h-8 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 rounded-md dark:text-white ${page === e ? 'bg-primary-500/20 text-primary border border-primary-500/50':''}`} key={i}><span className={`page-link ${page === e ? '':''}`}>{e}</span></div></button>
                    }):''
                }
            </div>

            <div className="flex items-center space-x-1">
                <button type="button" onClick={handleNext} disabled={!(page < pagerList)} className="dark:bg-darkPrimary dark:hover:bg-darkprimary-500/50 disabled:cursor-not-allowed disabled:bg-zinc-300 py-2 2xl:py-2 xl:px-3 px-3 2xl:px-5 gap-2 bg-white hover:bg-zinc-200 duration-300 ease-in-out rounded-md text-sm xl:text-[11px] 2xl:text-sm flex items-center dark:disabled:bg-black">
                    <h1 className="hidden md:block">Next</h1>
                    <span title="next" >
                        <Icon icon={'fluent:arrow-next-20-filled'} className="text-sm xl:text-xl 2xl:text-2xl"/>
                    </span>
                </button>
                <button type="button" disabled={!(page < pagerList)} onClick={handleForward} className="dark:bg-darkPrimary dark:hover:bg-darkprimary-500/50 disabled:cursor-not-allowed disabled:bg-zinc-300 py-2 2xl:py-2 xl:px-3 px-3 2xl:px-5 gap-2 bg-white hover:bg-zinc-200 duration-300 ease-in-out rounded-md text-sm xl:text-[11px] 2xl:text-sm flex items-center dark:disabled:bg-black">
                    <h1 className="hidden md:block">Forward</h1>
                    <span title="forward">
                        <Icon icon={'system-uicons:forward'} className="text-sm xl:text-xl 2xl:text-2xl"/>
                    </span>
                </button>

            </div>
        </div>
    );
};

export default Pagination;