import Loading from '@@/app/loading';
import { useGlobalContext } from '@@/src/providers/GlobalContext';
import { StateType } from '@@/src/types/types';
import { useCallback, useEffect, useRef, useState } from 'react'

export default function DatatableMobile({
  statename
}: {
  statename: string
}) {
  const { state, setState } = useGlobalContext()
  const [items, setItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const property: StateType<any> = state[statename]
  // property 
  const display = property?.display
  const headers = property?.headers
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = property?.data
  const columns = property?.columns
  const page = property?.page
  const totalCount = property?.totalCount
  const bulk = property?.bulk
  const bulkButton: any = property?.bulkButton
  const isLoading: boolean = property?.isLoading ?? true
  const groupBy = property?.groupBy
  const showing = 0
  const showingTo = data ? display * page > totalCount ? totalCount : display * page : 0

  const handleLoad = () => {
    const batas: number = Math.ceil(totalCount / display)
    if (loading) return;
    if(page < batas){
      setLoading(true)
      setTimeout(() => {
        property.page = property.page + 1
        setState({ ...state, [statename]: property })
        setLoading(false)
      }, 1500);
    }
  }
  
  useEffect(() => {
    const checkContentHeight = () => {
      const ul = ulRef.current;
      if (ul && ul.scrollHeight <= ul.clientHeight && !loading) {
        if(data){
          handleLoad()
        }
      }
    };
    checkContentHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  
  const groupByDate = (data: {[key: string]: any}[]) => {
    if(groupBy){
      return data.reduce((acc: { [key: string]: any[] }, currentItem) => {
        // Ambil tanggal (DD MMMM YYYY) dengan memotong string
        const dateWithoutTime = currentItem[groupBy].split(' ')[0] + ' ' + currentItem[groupBy].split(' ')[1] + ' ' + currentItem[groupBy].split(' ')[2];
        
        // Jika tanggal sudah ada di accumulator, tambahkan item ke grup
        if (!acc[dateWithoutTime]) {
          acc[dateWithoutTime] = [];
        }
        acc[dateWithoutTime].push(currentItem);
        
        return acc;
      }, {});
    }else{
      return {}
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const ul = ulRef.current;
      if (!ul) return;
      if (ul.scrollTop + ul.clientHeight >= ul.scrollHeight - 10 && !loading) {
        if(data) handleLoad(); 
      } 
    };

    const ul = ulRef.current;
    if (ul) {
      ul.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ul) {
        ul.removeEventListener('scroll', handleScroll);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  const ComponentMount = () => {
    if(!isLoading && data){
      if(data.length > 0){
        const array = data.slice(showing, showingTo)
        if(groupBy){
          return (
            Object.entries(groupByDate(array)).map((item: any, index: number) => {
              return (
                <div key={index} className='pb-5'>
                  <div className='sticky top-0 w-full text-center bg-primary-500 text-white font-bold'>
                    {item[0]}
                  </div>
                  <div className='px-2 space-y-2 mt-5'>
                    {item[1].map((rec: any, index: number) => {
                      return <div key={index}>{property.componentMobile(rec, index)}</div>
                    })}
                  </div>
                </div>
              )
            })
          )
        }else{
          return (
            <div className='space-y-2 px-2'>
              {
                array.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      {property.componentMobile(item, index)}
                    </div>
                  )
                })
              }
            </div>
          )
        }
      }else{
        return (
          <div className='text-center w-full flex items-center justify-center h-full py-20'>
            <h1 className='text-zinc-500'>Sorry, data not available with your filters</h1>
          </div>
        )
      }
    }else{
      return (
        <div className='w-full text-center'>
          <Loading />
        </div>
      )
    }
  }

  return (
    <ul
      ref={ulRef}
      className='w-full overflow-y-auto h-full md:hidden pb-10 relative no-scrollbar'
    >
      {
        ComponentMount()
      }
      {
        loading && (
          <h1 className='font-bold text-center mx-auto text-zinc-500 py-10'>Load more data...</h1>
        )
      }
    </ul>
  );
}
