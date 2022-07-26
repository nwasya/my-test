// Chakra imports
import {
  Flex,
  Box,
  Avatar,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Accordion,
  AccordionItem,
  Select,
  Stack,
  useColorMode,
  SimpleGrid,
  Center,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import SliderWrapper from "components/SliderWrapper/SliderWrapper";
import CourseRecords from "components/CourseRecord/CourseRecords";
import React, { useEffect, useState, useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import StudentRecords from "components/StudentRecord/StudentRecords";
import MarkForm from "components/Forms/markForm";
import { courseByTeacher } from "services/course";
import useNotify from "helpers/notify/useNotify";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
import CustomSelector from "components/Selectors/CustomSelector";
import { studentByCourse } from "services/user";
import MarkListFilter from "components/Filter/MarkFilter";
import { markByTeacher } from "services/mark";
import MarkListTable from "components/Tables/MarkListTable/MarkListTable";
import { markBySearch } from "services/mark";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import { TeacherPop1 } from "components/PopOvers/TeacherPopOver";
import { getStudentMarkByCourse } from "services/mark";
import { deleteMerk } from "services/mark";
function AddMark() {
  const boxBg = useColorModeValue("gray.100", "navy.600");
  const textGreen = useColorModeValue("green.600", "green.100");


  const { colorMode } = useColorMode();

  const [selectedItems, setSelectedItems] = useState({
    course: { id: "", name: "" },
    student: { id: "", name: "" },
  });

  const [filter, setFilter] = React.useState({
    name: "",
    courses: { id: "", name: "" },
    isFailed: false,
    isPassed: false,
    startDate: "",
    endDate: "",
    startMark: "",
    endMark: "",
  });

  const [myCourses, setMyCourses] = useState([]);
  const [myStudents, setmyStudents] = useState([]);
  const [markList, setMarkList] = useState([]);
  const getCourseList = async () => {
    const coursesList = await courseByTeacher();
    if (coursesList.status === 200) {
      if (coursesList.data.data.length > 0) {
        setMyCourses(coursesList.data.data);
        setSelectedItems({
          ...selectedItems,
          course: {
            id: coursesList.data.data[0]._id,
            name: coursesList.data.data[0].name,
          },
        });
      }
    }
  };

  const handleCheckBoxChange = (event) => {
    const field = event.target.id;
    const value = event.target.checked;
    setFilter({ ...filter, [field]: value });
  };
  const handleFilterChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };

  const getStudentList = async () => {
    const studentsList = await getStudentMarkByCourse(
      selectedItems.course.id
    );

    setmyStudents(studentsList);
  };

  console.log(myStudents,778)


  useEffect(() => {
    getCourseList();

  }, []);

  useEffect(() => {
    if(selectedItems.course.id !== ""){
       getStudentList();
    }
   
  }, [selectedItems.course]);

  const handleStudentSelect = (_id, name) => {
    setSelectedItems({ ...selectedItems, student: { id: _id, name: name } });
  };

  const doSearch = async () => {
    const tmp = await markBySearch(filter);
    setMarkList(tmp);
  };

  useEffect(() => {
    setMarkList(markList);

  
    doSearch();
    
  }, [filter ]);

  const [slider, setSlider] = useState([0, 100]);

  const handleSliderChange = (v) => {
    setSlider(v);
    setFilter({ ...filter, startMark: v[0], endMark: v[1] });
  };

  const handleStartDateChange = (v) => {
    if (v) {
      setFilter({ ...filter, startDate: `${v.year}/${v.month}/${v.day}` });
    } else {
      setFilter({ ...filter, startDate: "" });
    }
  };

  const handleEndDateChange = (v) => {
    if (v) {
      setFilter({ ...filter, endDate: `${v.year}/${v.month}/${v.day}` });
    } else {
      setFilter({ ...filter, endDate: "" });
    }
  };

  const handleDelete = (_id)=>{


    deleteMerk(_id).then((res)=>{
      if(res.status===200){
        setMarkList(markList.filter((mark)=>mark._id !== _id))
      }
    })
  }
  return (
    <AuthorizeProvider roles={["teacher"]}>
      <Box mt="60px" px="55px" py="5" w="100%" dir="rtl">
        <Flex direction={'column'}>
            <TeacherPop1 />
      
          <Box pt={"15px"} w={{ sm: "200px", md: "500px", lg: "500px" }}>
            <CustomSelector
              onChange={setSelectedItems}
              data={myCourses}
              state={selectedItems}
              placeHolder={"انتخاب کنید"}
              fieldId={"course"}
              bg={colorMode === "light" ? "white" : "navy.700"}
            />
          </Box>
        </Flex>

        {/* <Select
   
          
          textAlign={"center"}
          bg={colorMode === "light" ? 'white' : "cyan.500"}
          placeholder="کلاس را انتخاب کنید"
          size="lg"
        /> */}
      </Box>

      {selectedItems.course.id === "" ? (
      
        <Card>
          <Text fontWeight={"bold"} fontSize={"20px"} textAlign={"center"}>
            دوره را انتخاب کنید
          </Text>
        </Card>
      ) : myStudents.length === 0 ? (
        <Card>
          <Text dir={"rtl"} fontWeight={"bold"} fontSize={"20px"} textAlign={"center"}>
هیچ دانش آموزی در کلاس {selectedItems && selectedItems.course.name} جهت ورود نمره یافت نشد         </Text>

<Text textColor={textGreen} fontSize={"16px"} textAlign={"center"}>
  نمرات این دوره با موفقیت ثبت شده است. جهت حذف یا ویرایش میتوانید از لیست نمرات واردشده در پایین صفحه استفاده کنید
</Text>
        </Card>
      ) : (
        <Flex flexDirection="column" mb="30 px" h="100%" align={"center"}>
          <SliderWrapper>
            <StudentRecords
              markList={markList}
              setMarkList={setMarkList}
             
              setmyStudents={setmyStudents}
              data={myStudents}
              handleStudentSelect={handleStudentSelect}
              selectedItems={selectedItems}

            />
          </SliderWrapper>
        </Flex>
      )}

      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Accordion allowToggle>
              <AccordionItem>
                <MarkListFilter
                  filter={filter}
                  onChange={handleFilterChange}
                  courses={myCourses}
                  selectChange={setFilter}
                  handleCheckBoxChange={handleCheckBoxChange}
                  handleSliderChange={handleSliderChange}
                  slider={slider}
                  handleStartDateChange={handleStartDateChange}
                  handleEndDateChange={handleEndDateChange}
                />
              </AccordionItem>
            </Accordion>
          </Flex>
        </CardHeader>

        {markList.length !== 0 ? (
          <MarkListTable
            data={markList}
            markList={markList}
            setMarkList={setMarkList}
            myStudents={myStudents}
              setmyStudents={setmyStudents}
              handleDelete={handleDelete}
          />
        ) : (
          <Box
            mb={"30px"}
            borderRadius={"3rem"}
            alignSelf={"center"}
            width={{sm : "300px",md:"500px",lg :"500px"}}
            bg={boxBg}
          >
            <Text textAlign={"center"} my={"10px"}>
              نمره ای یافت نشد
            </Text>
          </Box>
        )}

        {/* {isPending ? (
            <UserListSkleton />
          ) : (
            <ProductListTable data={productList} courses={courseList} />
          )} */}
      </Card>
    </AuthorizeProvider>
  );
}

export default AddMark;
