from xmlrpc.client import Boolean
from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId


class SProduct:
    database: str = "database"
    product_collection: str = ""

    def __init__(self, database, product_collection):
        self.database = database
        self.product_collection = product_collection

    def validate_product(self, product, col):
        required = {"name", "_id", "price", "is_main", "is_active"}
        if len(required.difference(set(product.keys()))) != 0:
            return 422, "missing_field", "some fields are missing", None
        if not (product["name"] and product["price"] and type(product["is_main"] == Boolean) and type(product["is_active"] == Boolean)):
            return 422, "empty_field", "can not accept empty fiels", None
        if "_id" in product and product["_id"] == "" and len(list(col.find({"name": product["name"]}))) != 0:
            return 422, "not_unique", "user already exists", None

        return 200, "ok", "is valid", None

    def insert_product(self, info):

        db: Database = sn.databases[self.database].db
        col: Collection = db[self.product_collection]
        valid = self.validate_product(info, col)
        if valid[0] != 200:
            return valid
        if "_id" in info and info["_id"] != "":
            res = self.edit_product(info, col)
            return res

        info['price'] = int(info['price'])

        itm_ready = {**info, "_id": str(ObjectId())}
        col.insert_one(itm_ready)
        return 200, "ok", "product is inserted", itm_ready

    def edit_product(self, info, col: Collection):
        idd = info["_id"]
        del info["_id"]
        col.update_one({"_id": idd}, {"$set": info})
        return 200, "ok", "ok",{**info, "_id": idd}

    def get_product(self, product_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.product_collection]
        product = list(col.find({"_id": product_id}))
        if len(product) == 0:
            return 404, "not_found", "could not find the product", []
        else:
            return 200, "ok", "ok", product

    def get_product_list(self, filter):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.product_collection]
        filters = {}
        if 'name' in filter and filter['name'] != "":
            # this will be text search
            filters["name"] = {'$regex': filter['name']}
        if 'course' in filter and filter['course'] != "":
            filters["courses.id"] = filter['course']
        if 'is_active' in filter and filter['is_active']:
            filters["is_active"] = filter['is_active']
        if 'is_main' in filter and filter['is_main']:
            filters["is_main"] = filter['is_main']
        cl = list(col.find(filters))
        return 200, "ok", "ok", cl

    def get_product_by_course(self, course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.product_collection]
        ret = list(col.find({'courses.id': course_id},
                            {"id": "$_id",
                            '_id': 0,
                             "name": 1,
                             "description": 1,
                             "price": 1,
                             "isMain": 1}))
        return 200, "ok", "ok", ret
