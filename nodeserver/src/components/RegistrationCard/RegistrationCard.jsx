import {
  useDisclosure,
  Button,
  Box,
  Center,
  Flex,
  SimpleGrid,
  Text,
  Image,
  Divider,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Spacer,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import avatar6 from "assets/img/registrationCard.png";
import { FaRegCheckCircle } from "react-icons/fa";

import React, { useEffect } from "react";
import ProductSubOrder from "components/ProductSubOrder/ProductSubOrder";
import { useState } from "react";
import { getProductListByCourse } from "services/product";
import { CoursePop3 } from "components/PopOvers/CoursePopOver";

function RegistrationCard(props) {
  const { courseDetailData, registerCourse , cartItems , getSum , isRedirecting } = props;


  const colorMode = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [books , setBooks] = useState([])
  const getBooks = async () => {
    
    const products = await getProductListByCourse(courseDetailData.c_obj[0]['_id'])

    setBooks(products.data.data)
  }


  useEffect(()=>{

    if( courseDetailData.c_obj.length > 0){
      getBooks()
    }

  },[courseDetailData])


  return (
    <>
      <CardBody h={"auto"} pb={"10px"} mb={"20px"}>
         
          <Text  textAlign={"center"} fontSize={"25px"} fontFamily={"Lalezar"}>
            شما در حال ثبت نام برای دوره{" "}
            {courseDetailData.c_obj.length > 0 && courseDetailData.c_obj[0].name} هستید
          </Text>
          

        
          <Text textAlign={"center"} fontSize={"sm"}>
            جهت ثبت نام برای این دوره روی دکمه سبز رنگ "ثبت نام " کلیک کنید. قبل
            از ورود به درگاه پرداخت از خاموش بودن وی پی ان اطمینان حاصل کنید
          </Text>
      </CardBody>

      <Card>
        <CardBody>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }}>
            <Box >
              <Flex>
                
            <Spacer />

<Text textAlign={"center"} fontSize={"30px"}>
  {courseDetailData.c_obj.length > 0 && courseDetailData.c_obj[0].name}{" "}
</Text>
<Spacer />
<CoursePop3 />



              </Flex>
              <Text py={"15px"} textAlign={"start"}>
                {courseDetailData.c_obj.length > 0 &&
                  courseDetailData.c_obj[0].description}{" "}
              </Text>
              <Divider />
              <Text>دبیر:</Text>
              <Center pb={"15px"}>
                <Flex
                  alignSelf={"center"}
                  borderRadius={"2rem"}
                  h={"85px"}
                  w={"300px"}
                  bg={colorMode.colorMode === "light" ? "gray.100" : "navy.700"}
                >
                  <Box flex="2" borderRadius={"2rem"}>
                    <Text
                      pr={"10px"}
                      pt={"15px"}
                      textAlign={"center"}
                      fontFamily={"Lalezar"}
                      fontSize={"25px"}
                    >
                      {" "}
                      {courseDetailData.t_obj.length > 0  ?
                        courseDetailData.t_obj[0].full_name :
                        "هنوز تعریف نشده"}
                    </Text>
                  </Box>

                  <Center flex="1" borderRadius={"2rem"}>
                    <Avatar
                      size="lg"
                      name=   { courseDetailData.t_obj.length > 0 ?
                        courseDetailData.t_obj[0].full_name :
                        ""}
                    />
                  </Center>
                </Flex>
              </Center>

              <Divider />
              <Text>هزینه دوره:</Text>

              <Text textAlign={"center"}>
                {courseDetailData.c_obj.length > 0 && courseDetailData.c_obj[0].price} ریال
              </Text>

              <Divider pt={"15px"} />

              <ProductSubOrder books={books} cartItems={cartItems} />

              <Center pt={"40px"}>
                <Button
                  mb={"20px"}
                  onClick={onOpen}
                  size={"lg"}
                  fontSize={"30px"}
                  fontFamily={"Lalezar"}
                  bg={"green.400"}
                  aria-label="Search database"
                >
                  <FaRegCheckCircle />
                  ثبت نام
                </Button>

                <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay backdropFilter="blur(9px)" />
                  <ModalContent>
                    <ModalHeader textAlign={"center"}>تایید نهایی</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody textAlign={"end"}>
                      <TableContainer dir="rtl">
                        <Table variant="simple">
                          <Thead>
                            <Tr>
                              <Th>عنوان</Th>
                              <Th>قیمت</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>
                                ثبت نام برای{" "}
                                {courseDetailData.c_obj.length > 0 &&
                                  courseDetailData.c_obj[0].name}{" "}
                              </Td>
                              <Td>
                                {" "}
                                {courseDetailData.c_obj.length > 0 &&
                                  <>{courseDetailData.c_obj[0].price}ریال</> }
                              </Td>
                            </Tr>

                            {cartItems.map((o, key) => (
                              <Tr>
                                <Td>کتاب{o.name} </Td>
                                <Td>{o.price}ریال</Td>
                              </Tr>
                            ))}



<Tfoot>
      <Tr >
       
        <Td>جمع کل</Td>
        <Td isNumeric>  {getSum()} ریال</Td>
      
      </Tr>
    </Tfoot>
                               
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </ModalBody>

                    <ModalFooter>
                      <Button variant="ghost" mr={3} onClick={onClose}>
                        لغو
                      </Button>
                      <Button onClick={registerCourse} colorScheme="blue">
                        {" "}
{isRedirecting ? "در حال هدایت به صفحه پرداخت" : "تایید می کنم"}                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Center>
            </Box>

            <Center>
              <Image
                h={{ sm: "400px", md: "300px", lg: "500px" }}
                w={{ sm: "400px", md: "300px", lg: "500px" }}
                src={avatar6}
                alt="Dan Abramov"
                borderRadius={"2rem"}
              />
            </Center>
          </SimpleGrid>

        </CardBody>
      </Card>
    </>
  );
}

export default RegistrationCard;
