'use server'

import { MenusList } from "@@/lib/menus/data/MenusModel";
import { PagesModel, PagesType } from "@@/lib/pages/data/PagesModel";
import { ApiResponse, fetchClient } from "@@/src/hooks/CollectionAPI";

// pathname contoh /admin/menus => admin,menus
export const getPageMetadata = async (pathname: string) => {
  const response: ApiResponse<MenusList> = await fetchClient(
    "GET", 
    `/data/menus/url/${pathname}`
  );
  
  if(!response.success){
    return {
      title: 'Not Found URL',
      meta_description: 'Menus not found'
    }
  }

  const responseData: MenusList = response.data
  const responsePages: ApiResponse<PagesType> = await fetchClient(
    "GET", 
    `/data/pages/${responseData.pages_id}`
  );

  if(!responsePages.success){
    return {
        title: 'Not found pages',
        meta_description: 'Pages of menus not found'
    }
  }

  const responsePageData: PagesModel = new PagesModel(responsePages.data)
    
  return responsePageData
}