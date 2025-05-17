import {ICategory} from '../models/Caegory'

export interface Categoryrepository{
    createcategory(category:ICategory):Promise<ICategory>
    findByCategoryId(categoryid:string):Promise<ICategory|null>
    findByname(name:string):Promise<ICategory|null>
    fetchcategory():Promise<ICategory[]>
    blockunblockcat(catid:string, isBlocked:boolean):Promise<ICategory>
    editcategory(catid:string,update:Partial<ICategory>):Promise<ICategory>
    fetchconecategory(catid:string):Promise<ICategory|null>
    fetchCategoryBySearch(name:string):Promise<ICategory[]|null>
}