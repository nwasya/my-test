from ast import Return
from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.classes.mark import SMark
from modules.main.s_settings import SSettings
from modules.main.classes.user import SUser




router = APIRouter(prefix='/marks' , tags=["mark"])

sn.add_router(router)

mark=SMark('sonay' , 'mark' , 's_user')


@router.post("/createmark")
@sn(fast=True,roles=['teacher' ])
def create_mark(st:SSettings,user: SUser , info : dict):
    ret = mark.insert_mark(user ,info , st)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])

@router.delete("/deletemark")
@sn(fast=True,roles=['teacher' ])
def delete_mark(_id:str):
    ret = mark.delete_mark(_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getmarkbyteacher")
@sn(fast=True,roles=['teacher' ])
def get_mark_by_teacher(user : SUser , st : SSettings):
    ret = mark.get_mark_by_teacher(user , st)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getmark")
@sn(fast=True,roles=['admin','teacher' ])
def get_mark(mark_id : str):
    ret = mark.get_mark(mark_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.put("/getmarkbysearch")
@sn(fast=True,roles=['student','teacher','admin' ])
def get_mark_by_search(user : SUser ,filter : dict):
    ret = mark.get_mark_by_search(user ,filter['filter'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getselectedmark")
@sn(fast=True,roles=['admin','teacher' , 'student'])
def get_selected_mark(username : str , course_id : str):
    ret = mark.get_selected_mark(username=username , course_id=course_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])







@router.get("/getfinalstatus")
@sn(fast=True,roles=['admin','teacher' , 'student'])
def get_final_status(student_id : str , course_id : str):
    ret = mark.get_final_status(student_id=student_id , course_id=course_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getcomparechartdata")
@sn(fast=True,roles=[ 'student'])
def get_compare_chart_data(username : str , course_id : str):
    ret = mark.get_compare_chart_data(username=username , course_id=course_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getmarkhistory")
@sn(fast=True,roles=[ 'student'])
def get_mark_history(user : SUser):
    ret = mark.get_mark_history(user['username'] , user['courses'][0]['id'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getstudentmarkbycourse")
@sn(roles=[ 'teacher'])
def get_student_mark_by_course(say: SAY, course_id):
    ret = mark.get_student_mark_by_course(course_id)
    return api_return(ret[0], ret[1], ret[2], data=ret[3])




