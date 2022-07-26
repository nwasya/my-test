from datetime import datetime
import json
from xmlrpc.client import Boolean
import pymongo
from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId
import requests
from persiantools.jdatetime import JalaliDate
from dateutil.relativedelta import relativedelta

description = "توضیحات مربوط به تراکنش را در این قسمت وارد کنید"  # Required
email = 'Ehraghi.aysan@gmail.com'  # Optional
mobile = '09337814796'  # Optional

# client = Client('https://sandbox.zarinpal.com/pg/services/WebGate/wsdl')
ZP_API_REQUEST = "https://api.zarinpal.com/pg/v4/payment/request.json"
ZP_API_VERIFY = "https://api.zarinpal.com/pg/v4/payment/verify.json"
ZP_API_STARTPAY = "https://www.zarinpal.com/pg/StartPay/{authority}"
CallbackURL = '//sahand-esteglal.ir/#/paymentverify'
# CallbackURL = 'http://sahand-esteglal.ir/verify'


class SPurchase:
    database: str = "database"
    purchase_collection: str = "purchase"
    user_collection: str = "a_user"
    course_collection = ""

    def __init__(self, database, purchase_collection, user_collection, course_collection):
        self.database = database
        self.purchase_collection = purchase_collection
        self.user_collection = user_collection
        self.course_collection = course_collection

    def get_redirect_url(self, st, user, info):
        MERCHANT = st.extra['MERCHANT']
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]
        oid = str(ObjectId())
        req_data = {
            "merchant_id": MERCHANT,
            "amount": info['total_sum'],
            "callback_url": f"{CallbackURL}/{oid}",
            "description": description,
            "metadata": {"mobile": mobile, "email": email}
        }
        req_header = {"accept": "application/json",
                      "content-type": "application/json'"}
        req = requests.post(url=ZP_API_REQUEST, data=json.dumps(
            req_data), headers=req_header)
        authority = req.json()['data']['authority']
        if len(req.json()['errors']) == 0:
            ready_to_purchase = {
                '_id': oid,
                'course_id': info['course_id'],
                'course_name': info['course_name'],
                'products': info['products'],
                'username': info['username'],
                'price': info['total_sum'],
                'authority': authority,
                'type': 'pending',
                'date': datetime.today(),
                'student': {
                    'username': user['username'],
                    'phone': user['phone'],
                    'full_name': user['full_name']
                }

            }
            col.insert_one(ready_to_purchase)
            return 200, 'ok', 'ok', ZP_API_STARTPAY.format(authority=authority)
        return 403, 'forbidden', 'authorize failed', ''

    def verify_registration(self, st, oid, authority):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]
        col1: Collection = db[self.user_collection]
        col2: Collection = db[self.course_collection]
        MERCHANT = st.extra['MERCHANT']
        order = list(col.find({"_id": oid}))
        if len(order) != 1:
            print("no order found")
        req_data = {
            "merchant_id": MERCHANT,
            "amount": int(order[0]['price']),
            "authority": authority

        }
        req_header = {"accept": "application/json",
                      "content-type": "application/json'"}
        req = requests.post(url=ZP_API_VERIFY, data=json.dumps(
            req_data), headers=req_header)

        # product_array = products.split('-') if products != '0' else ['0']

        cc = JalaliDate.today()
        date = f"{cc.year}/{cc.month}/{cc.day}"

        if req.json()['data']['code'] == 100:

            status = ""

            ref_id = req.json()['data']['ref_id']
            fee = req.json()['data']['fee']

            registered_course = list(
                col2.find({"_id": order[0]['course_id']}, {"_id": 1, "name": 1, "price": 1}))
            if len(registered_course) != 1:
                status = f"coud not find course with id {order[0]['course_id']}"
                registered_course = {"id": 0, "name": ""}
                c_price = 0
            else:
                registered_course = registered_course[0]
                c_price = int(registered_course['price'])
                del registered_course['price']
                registered_course['id'] = registered_course["_id"]
                del registered_course['_id']

            itm_ready = {

                'type': "registration",
                'ref_id': ref_id,
                'fee': fee,
                'g_date': datetime.today(),
                'date': date,
                'products': order[0]['products'],
                'course_id': order[0]['course_id'],
                'username': order[0]['username'],
                'authority': authority,
                'price': int(order[0]['price']),
                'c_price': c_price,
                'p_price': int(order[0]['price']) - c_price,
                'y' : int(cc.year),
                'm' : int(cc.month),
                'd' : int(cc.day)
            }

            col.update_one({'_id': oid}, {"$set": itm_ready})
            col1.update_one({"username": order[0]['username']}, {"$set": {'courses': [registered_course],
                                                                          'status': {'id': 'reg', 'name': 'ثبت نام شده'}}})
            return 200, 'ok', 'ok', 'ok'
        elif req.json()['data']['code'] == 101:
            return 200, 'ok', 'ok', 'already paid'
        else:
            return 403, 'error', 'error', 'error'

    def get_recent_order(self, st):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]
        current_date = datetime.today()

        # Subtract 20 months from current date
        n = st.info['ReportDefaultUpToDate']
        past_date = current_date - relativedelta(months=n)
        data = list(col.find(
            {

                    'type': 'registration',
                    'g_date': {'$gte': past_date},
                    'products': {"$ne": []}


                    }
        ).sort([
        ('g_date', pymongo.DESCENDING)
      ]))
        return 200, 'ok', 'ok', data

    def get_recent_order_filter(self, st, filter):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]

        and_li = [{'type': 'registration'},  {'products': {"$ne": []}}]

        if 'name' in filter and filter['name'] != "":
            and_li.append({'student.full_name': {'$regex': filter['name']}})

        if 'startDate' in filter and filter['startDate'] != '':
            cc = filter['startDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$gte": sg}})
        else:
            current_date = datetime.today()
            n = st.info['ReportDefaultUpToDate']
            past_date = current_date - relativedelta(months=n)
            and_li.append({'g_date': {'$gte': past_date}})

        if 'endDate' in filter and filter['endDate'] != '':
            cc = filter['endDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$lte": sg}})

        data = list(col.find({"$and": and_li}))
        return 200, 'ok', 'ok', data

    def get_recent_registration(self, st):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]
        current_date = datetime.today()

        # Subtract 20 months from current date
        n = st.info['ReportDefaultUpToDate']
        past_date = current_date - relativedelta(months=n)
        data = list(col.find(
            {

                    'type': 'registration',
                    'g_date': {'$gte': past_date},



                    }
        ).sort([
        ('g_date', pymongo.DESCENDING)
      ]))
        return 200, 'ok', 'ok', data

    def get_recent_registration_filter(self, st, filter):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]

        and_li = [{'type': 'registration'}]

        if 'name' in filter and filter['name'] != "":
            and_li.append({'student.full_name': {'$regex': filter['name']}})

        if 'startDate' in filter and filter['startDate'] != '':
            cc = filter['startDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$gte": sg}})
        else:
            current_date = datetime.today()
            n = st.info['ReportDefaultUpToDate']
            past_date = current_date - relativedelta(months=n)
            and_li.append({'g_date': {'$gte': past_date}})

        if 'endDate' in filter and filter['endDate'] != '':
            cc = filter['endDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$lte": sg}})

        data = list(col.find({"$and": and_li}))
        return 200, 'ok', 'ok', data

    def get_course_detail(self):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.course_collection]
        res = list(col.aggregate(
            [
                {
                    '$match': {
                        'status.id': 'active'
                    }
                }, {
                    '$lookup': {
                        'from': 's_user',
                        'localField': '_id',
                        'foreignField': 'courses.id',
                        'pipeline': [
                            {
                                '$match': {
                                    'role.id': 'student'
                                }
                            }, {
                                '$project': {
                                    '_id': 1,
                                    'username': 1,
                                    'full_name': 1
                                }
                            }
                        ],
                        'as': 'student'
                    }
                }, {
                    '$lookup': {
                        'from': 's_user',
                        'localField': '_id',
                        'foreignField': 'courses.id',
                        'pipeline': [
                            {
                                '$match': {
                                    'role.id': 'teacher'
                                }
                            }, {
                                '$project': {
                                    '_id': 1,
                                    'username': 1,
                                    'full_name': 1
                                }
                            }
                        ],
                        'as': 'teacher'
                    }
                }, {
                    '$set': {
                        's_length': {
                            '$size': '$student'
                        }
                    }
                }
            ]
        ))

        return 200, 'ok', 'ok', res

    def get_course_detail_filter(self, filter):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.course_collection]

        and_li = [{}]
        teacher_and_li = [{}]

        if 'name' in filter and filter['name'] != "":
            and_li.append({'name': {'$regex': filter['name']}})
        if 'deActive' in filter and filter['deActive']["id"] != "" :
            and_li.append({'status.id': filter['deActive']["id"]})
        
        if 'teacher' in filter and filter['teacher']['id'] != "":
            teacher_and_li.append({'teacher.full_name': {'$regex': filter['teacher']['name']}})



        data = list(col.aggregate(
            [
                {
                    '$match': {
                        '$and': and_li
                    }
                }, {
                    '$lookup': {
                        'from': 's_user',
                        'localField': '_id',
                        'foreignField': 'courses.id',
                        'pipeline': [
                            {
                                '$match': {
                                    'role.id': 'student'
                                }
                            }, {
                                '$project': {
                                    '_id': 1,
                                    'username': 1,
                                    'full_name': 1
                                }
                            }
                        ],
                        'as': 'student'
                    }
                }, {
                    '$lookup': {
                        'from': 's_user',
                        'localField': '_id',
                        'foreignField': 'courses.id',
                        'pipeline': [
                            {
                                '$match': 
                                    {'role.id': 'teacher'}
                                
                            }, {
                                '$project': {
                                    '_id': 1,
                                    'username': 1,
                                    'full_name': 1
                                }
                            }
                        ],
                        'as': 'teacher'
                    }
                }, {
                    '$set': {
                        's_length': {
                            '$size': '$student'
                        }
                    }
                },
                {
                    '$match' : {
                        '$and' : teacher_and_li
                    }
                }
            ]
        ))
        return 200, 'ok', 'ok', data
    
    def get_my_recent_order(self,st , user):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]
        current_date = datetime.today()
        n = st.info['ReportDefaultUpToDate']
        past_date = current_date - relativedelta(months=n)
        data = list(col.find(
            {

                    'type': 'registration',
                    'g_date': {'$gte': past_date},
                    'products': {"$ne": []},
                    'username' : user['username']


                    }
        ).sort([
        ('g_date', pymongo.DESCENDING)
      ]))
        return 200, 'ok', 'ok', data
    
    def get_my_recent_order_filter(self, user , st,filter):
        
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]

        and_li = [{'username' : user['username']},{'type': 'registration'},  {'products': {"$ne": []}}]

        if 'name' in filter and filter['name'] != "":
            and_li.append({'products.name': {'$regex': filter['name']}})

        if 'startDate' in filter and filter['startDate'] != '':
            cc = filter['startDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$gte": sg}})
        else:
            current_date = datetime.today()
            n = st.info['ReportDefaultUpToDate']
            past_date = current_date - relativedelta(months=n)
            and_li.append({'g_date': {'$gte': past_date}})

        if 'endDate' in filter and filter['endDate'] != '':
            cc = filter['endDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$lte": sg}})

        data = list(col.find({"$and": and_li}))
        return 200, 'ok', 'ok', data
    
    
    
    
    def get_my_recent_registration(self , st , user):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]
        current_date = datetime.today()

        # Subtract 20 months from current date
        n = st.info['ReportDefaultUpToDate']
        past_date = current_date - relativedelta(months=n)
        data = list(col.find(
            {

                    'type': 'registration',
                    'g_date': {'$gte': past_date},
                    'username' : user['username']



                    }
        ).sort([
        ('g_date', pymongo.DESCENDING)
      ]))
        return 200, 'ok', 'ok', data
    
    
    def get_my_recent_registration_filter(self , st , user , filter):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.purchase_collection]

        and_li = [{'type': 'registration'}, {'username' : user['username']}]

        if 'name' in filter and filter['name'] != "":
            and_li.append({'course_name': {'$regex': filter['name']}})

        if 'startDate' in filter and filter['startDate'] != '':
            cc = filter['startDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$gte": sg}})
        else:
            current_date = datetime.today()
            n = st.info['ReportDefaultUpToDate']
            past_date = current_date - relativedelta(months=n)
            and_li.append({'g_date': {'$gte': past_date}})

        if 'endDate' in filter and filter['endDate'] != '':
            cc = filter['endDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$lte": sg}})

        data = list(col.find({"$and": and_li}))
        return 200, 'ok', 'ok', data
        