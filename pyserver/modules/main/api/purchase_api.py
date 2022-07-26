from ast import Return
from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.classes.product import SProduct
from modules.main.classes.purchase import SPurchase
from modules.main.s_settings import SSettings
from modules.main.classes.user import SUser




router = APIRouter(prefix='/purchase' , tags=["purchase"])

sn.add_router(router)

purchase=SPurchase('sonay' , 'purchase' , 's_user' , 'course')


@router.post("/getredirecturl")
@sn(fast=True,roles=['student'])
def get_redirect_url(st : SSettings,user:SUser,info : dict):
    ret = purchase.get_redirect_url(st,user ,info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/verifyregistration")
@sn(fast=True,roles=['student'])
def verify_registration(st : SSettings, oid , authority):
    ret = purchase.verify_registration( st ,oid , authority)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getrecentorder")
@sn(fast=True,roles=['admin'])
def get_recent_order(st:SSettings):
    ret = purchase.get_recent_order(st)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.put("/getrecentorderfilter")
@sn(fast=True,roles=['admin'])
def get_recent_order_filter(st:SSettings,filter : dict):
    ret = purchase.get_recent_order_filter(st,filter['filter'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getrecentregistration")
@sn(fast=True,roles=['admin'])
def get_recent_registration(st:SSettings):
    ret = purchase.get_recent_registration(st)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.put("/getrecentregistrationfilter")
@sn(fast=True,roles=['admin'])
def get_recent_registration_filter(st:SSettings , filter : dict):
    ret = purchase.get_recent_registration_filter(st , filter['filter'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getcoursedetail")
@sn(fast=True,roles=['admin'])
def get_course_detail(st:SSettings):
    ret = purchase.get_course_detail()
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.put("/getcoursedetailfilter")
@sn(fast=True,roles=['admin'])
def get_course_detail_filter( filter : dict):
    ret = purchase.get_course_detail_filter( filter['filter'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getmyrecentorder")
@sn(fast=True,roles=['student'])
def get_my_recent_order(st:SSettings , user : SUser):
    ret = purchase.get_my_recent_order(st , user)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.put("/getmyrecentorderfilter")
@sn(fast=True,roles=['student'])
def get_my_recent_order_filter(user:SUser,st : SSettings , filter : dict):
    ret = purchase.get_my_recent_order_filter(user,st,filter['filter'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getmyrecentregistration")
@sn(fast=True,roles=['student'])
def get_my_recent_registration(st:SSettings ,  user :SUser):
    ret = purchase.get_my_recent_registration(st , user)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.put("/getmyrecentregistrationfilter")
@sn(fast=True,roles=['student'])
def get_my_recent_registration_filter(st:SSettings , user :SUser , filter : dict):
    ret = purchase.get_my_recent_registration_filter(st , user , filter['filter'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])

