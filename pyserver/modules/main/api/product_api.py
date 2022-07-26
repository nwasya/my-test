from ast import Return
from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.classes.product import SProduct




router = APIRouter(prefix='/products' , tags=["product"])

sn.add_router(router)

product=SProduct('sonay' , 'product')


@router.post("/createproduct")
@sn(fast=True,roles=['admin'])
def create_product(info : dict):
    ret = product.insert_product(info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.delete("/deleteproduct")
@sn(fast=True,roles=['admin'])
def delete_product(_id : str):
    ret = product.delete_product(_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.put("/getproductlist")
@sn(fast=True,roles=['admin'])
def get_product_list(filter:dict):
    ret = product.get_product_list(filter['filter'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/getproduct")
@sn(roles=['admin' , 'student'])
def get_product(product_id):
    ret = product.get_product(product_id)
    return api_return(ret[0] , ret[1] , ret[2] , ret[3])



@router.get("/getproductbycourse")
@sn(roles=['admin', 'student'])
def get_product_by_course(course_id):
    ret = product.get_product_by_course(course_id)
    return api_return(ret[0] , ret[1] , ret[2] , ret[3])