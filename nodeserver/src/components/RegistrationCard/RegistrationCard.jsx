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
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import avatar6 from "assets/img/avatars/avatar6.png";
import { CheckIcon } from "@chakra-ui/icons";
import { FaRegCheckCircle } from "react-icons/fa";

import React, { useEffect } from "react";

function RegistrationCard(props) {
  const { courseDetailData , registerCourse } = props;

  const colorMode = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
console.log(98 , courseDetailData)

  return (
    <>
      <Card mb={"20px"}>
        <CardHeader h={"auto"} pb={"10px"}>
          <Text textAlign={"center"} fontSize={"25px"} fontFamily={"Lalezar"}>
            شما در حال ثبت نام برای دوره{" "}
            {courseDetailData.c_obj && courseDetailData.c_obj[0].name}{" "}
            هستید
          </Text>
          <Text textAlign={"center"} fontSize={"sm"}>
            جهت ثبت نام برای این دوره روی دکمه سبز رنگ "ثبت نام " کلیک کنید. قبل
            از ورود به درگاه پرداخت از خاموش بودن وی پی ان اطمینان حاصل کنید
          </Text>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }}>
            <Box>
              <Text textAlign={"center"} fontSize={"30px"}>
              {courseDetailData.c_obj && courseDetailData.c_obj[0].name}{" "}
              </Text>
              <Text py={"15px"} textAlign={"start"}>
              {courseDetailData.c_obj && courseDetailData.c_obj[0].description}{" "}
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
                      {courseDetailData.t_obj &&
                        courseDetailData.t_obj[0].full_name}
                    </Text>
                  </Box>

                  <Center flex="1" borderRadius={"2rem"}>
                    <Avatar
                      size="lg"
                      name={
                        courseDetailData.t_obj &&
                        courseDetailData.t_obj[0].full_name
                      }
                    />
                  </Center>
                </Flex>
              </Center>

              <Divider />
              <Text>هزینه دوره:</Text>

              <Text textAlign={"center"}>
              {courseDetailData.c_obj && courseDetailData.c_obj[0].price}{" "}
                ریال
              </Text>

              <Divider pt={"15px"} />

              <Center pt={"40px"}>
                <Button
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

                <Modal isCentered  isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay       backdropFilter='blur(9px)' />
                  <ModalContent>
                    <ModalHeader textAlign={'center'} >آیا مطمعن هستید؟</ModalHeader>
                    <ModalCloseButton />

 <ModalBody textAlign={'end'}>
 <Text>
                      شما در حال ثبت نام برای  {courseDetailData.c_obj && courseDetailData.c_obj[0].name}{" "}هستید 
                    </Text>

                    <Text>
                      هزینه دوره {courseDetailData.c_obj && courseDetailData.c_obj[0].price}{" "} ریال می باشد قبل از ادامه لطفا وی پی ان و پروکسی خود را خاموش کنید
                    </Text>
 </ModalBody>
        
                    <ModalFooter>
                      <Button  variant="ghost"  mr={3} onClick={onClose}>
                        لغو
                      </Button>
                      <Button onClick={registerCourse} colorScheme="blue"> ادامه</Button>
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
