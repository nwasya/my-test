// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  LightMode,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { bixious } from "services/main";

function SignUp() {
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");


  const [sent,setSent] = React.useState({
    status : false,
    sending : false
  })
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
    confirm_password  :""
  });

  function createPost() {
    setSent({sending : true})
    bixious
      .post("/users/register", {
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name,
        password: formData.password,
        password_confirm: formData.confirm_password,
      })
      .then((response) => {

        {response.status === 200 ? setSent({status : true}) : setSent({sending : true}) }
        console.log(response);
      });
  }

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "100vh", md: "100vh" }}
        maxH={{ base: "100vh", md: "100vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        maxW={{ md: "calc(100vw - 50px)" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
        borderRadius={{ base: "0px", md: "20px" }}
      >
        <Box w="100vw" h="200vh" bg="blue.500" opacity="0.8"></Box>
      </Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="125px"
        mb="30px"
      >
        <Text
          fontFamily="Lalezar"
          fontSize="5xl"
          color="white"
          fontWeight="bold"
        >
          پنل مدیریتی آموزشی یکپارچه سون آی{" "}
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
        >
          پس از ثبت نام اطلاعات شما توسط مدیر سیستم تایید خواهد شد . این پروسه
          ممکن است دو الی سه روز کاری طول کشد بعد از تایید کاربری، شما می توانید
          از طریق پنل ورود به سیستم، وار ناحیه کاربری خود شوید
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(0, 0, 0, 0.05)",
            "unset"
          )}
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            : ثبت نام کاربری در سیستم با
          </Text>
          <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon as={FaFacebook} color={colorIcons} w="30px" h="30px" />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon
                  as={FaApple}
                  color={colorIcons}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon
                  as={FaGoogle}
                  color={colorIcons}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
          </HStack>
          <Text
            fontSize="lg"
            color="gray.400"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            یا
          </Text>
          <FormControl>
            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              نام کاربری
            </FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              id="username"
              value={formData.username}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="نام کاربری خود را وارد کنید"
              mb="24px"
              size="lg"
            />

            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              نام و نام خانوادگی
            </FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              id="full_name"
              value={formData.full_name}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="نام کاربری خود را وارد کنید"
              mb="24px"
              size="lg"
            />
            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              ایمیل
            </FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              id="email"
              value={formData.email}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              mb="24px"
              size="lg"
            />
            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              رمز
            </FormLabel>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              id="password"
              value={formData.password}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="رمز خود را وارد کنید"
              mb="24px"
              size="lg"
            />

            <FormLabel
              textAlign="right"
              ms="4px"
              fontSize="sm"
              fontWeight="normal"
            >
              تکرار رمز
            </FormLabel>
            <Input
            onChange={(e) =>
              setFormData({ ...formData, confirm_password: e.target.value })
            }
            id="confirm_password"
            value={formData.confirm_password}
              textAlign="right"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="تکرار رمز خود را وارد کنید"
              mb="24px"
              size="lg"
            />

            <FormControl display="flex" alignItems="center" mb="24px">
              <Switch id="remember-login" colorScheme="blue" me="10px" />
              <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                ذخیره نام کاربری و رمز
              </FormLabel>
            </FormControl>
            <Button
              onClick={createPost}
              fontSize="20px"
              fontFamily="Lalezar"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="24px"
            >

              {sent.sending ? "در حال ثبت نام" : "! ثبت نام کن"}
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              قبلا ثبت نام کرده اید؟{" "}
              <Link
                color={titleColor}
                as="span"
                ms="5px"
                href="#"
                fontWeight="bold"
              >
                ورود{" "}
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
