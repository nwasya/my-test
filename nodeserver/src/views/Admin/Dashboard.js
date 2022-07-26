// Chakra imports
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoAction } from "redux/user/UserInfo/UserInfoAction";
import { getTeacherOverAll } from "services/dashboard";
import { getYearCompare } from "services/dashboard";
import { getCounts } from "services/dashboard";
import { getUserInfo } from "services/user";
// Variables
import {
  barChartData,
  barChartOptions,
  lineChartOptions,
} from "variables/charts";
import { pageVisits, socialTraffic } from "variables/general";

export default function Dashboard() {
  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const { colorMode } = useColorMode();

  const [countData, setCountData] = useState([]);
  const [compareyearData, setCompareyearData] = useState([]);
  const [teacherOverall, setTeacherOverall] = useState([]);

  const dispatch = useDispatch();

  const getUserInfo = async () => {
    await dispatch(userInfoAction());
  };

  const getCountData = async () => {
    await getCounts().then((res) => {
      setCountData(res.data.data);
    });
  };

  const getYearCompareData = async () => {
    await getYearCompare().then((res) => {
      setCompareyearData(res.data.data);
    });
  };

  const getTeachersData = async () => {
    await getTeacherOverAll().then((res) => {
      setTeacherOverall(res.data.data);
    });
  };

  const { userInfo } = useSelector((state) => state.getUserInfo);
  useEffect(() => {
    getUserInfo();
    getCountData();
    getYearCompareData();
    getTeachersData();
  }, []);

  return (
    <AuthorizeProvider roles={["admin"]}>
      <Flex flexDirection="column" pt="75px">
        <SimpleGrid columns={{ sm: 1, md: 4, xl: 4 }} spacing="24px" mb="20px">
          <Card maxH="115px">
            <Flex direction="column">
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
                mb="5px"
              >
                <Stat me="auto">
                  <StatLabel
                    textAlign={"center"}
                    fontSize="s"
                    color="gray.400"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    تعداد کل دبیران
                  </StatLabel>

                  <Text
                    textAlign={"center"}
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                  >
                    {countData.length !== 0 && countData[0].teachers.count}
                  </Text>
                </Stat>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}
                >
                  <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
              {countData.length !== 0 && countData[0].teachers.perc > 0 ? (
                <Flex>
                  <Text textAlign={"center"} color="gray.400" fontSize="sm">
                    افزایش از ماه قبل
                  </Text>
                  <Text
                    textAlign={"center"}
                    as="span"
                    color="green.400"
                    fontWeight="bold"
                  >
                    %{countData.length !== 0 && countData[0].teachers.perc}{" "}
                  </Text>
                </Flex>
              ) : (
                <Flex>
                  <Text color="gray.400" fontSize="sm">
                    کاهش از ماه قبل
                  </Text>
                  <Text as="span" color="red.400" fontWeight="bold">
                    %{countData.length !== 0 && countData[0].teachers.perc}{" "}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Card>
          <Card maxH="115px">
            <Flex direction="column">
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
                mb="5px"
              >
                <Stat me="auto">
                  <StatLabel
                    textAlign={"center"}
                    fontSize="s"
                    color="gray.400"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    تعداد کل دوره ها
                  </StatLabel>

                  <Text
                    textAlign={"center"}
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                  >
                    {countData.length !== 0 && countData[0].courses.count}
                  </Text>
                </Stat>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}
                >
                  <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
              {countData.length !== 0 && countData[0].courses.perc > 0 ? (
                <Flex>
                  <Text textAlign={"center"} color="gray.400" fontSize="sm">
                    افزایش از ماه قبل
                  </Text>
                  <Text
                    textAlign={"center"}
                    as="span"
                    color="green.400"
                    fontWeight="bold"
                  >
                    %{countData.length !== 0 && countData[0].courses.perc}{" "}
                  </Text>
                </Flex>
              ) : (
                <Flex>
                  <Text color="gray.400" fontSize="sm">
                    کاهش از ماه قبل
                  </Text>
                  <Text as="span" color="red.400" fontWeight="bold">
                    %{countData.length !== 0 && countData[0].courses.perc}{" "}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Card>

          <Card maxH="115px">
            <Flex direction="column">
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
                mb="5px"
              >
                <Stat me="auto">
                  <StatLabel
                    textAlign={"center"}
                    fontSize="s"
                    color="gray.400"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    مجموع پرداختی ماه جاری
                  </StatLabel>
                  <Center>
                    <Text textAlign={"center"} color="gray.400" fontSize="sm">
                      ریال
                    </Text>

                    <Text
                      textAlign={"center"}
                      fontSize="lg"
                      color={textColor}
                      fontWeight="bold"
                    >
                      {countData.length !== 0 && countData[0].purchases.count}
                    </Text>
                  </Center>
                </Stat>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}
                >
                  <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
              {countData.length !== 0 && countData[0].purchases.perc > 0 ? (
                <Flex>
                  <Text textAlign={"center"} color="gray.400" fontSize="sm">
                    افزایش از ماه قبل
                  </Text>
                  <Text
                    textAlign={"center"}
                    as="span"
                    color="green.400"
                    fontWeight="bold"
                  >
                    %{countData.length !== 0 && countData[0].purchases.perc}{" "}
                  </Text>
                </Flex>
              ) : (
                <Flex>
                  <Text color="gray.400" fontSize="sm">
                    کاهش از ماه قبل
                  </Text>
                  <Text as="span" color="red.400" fontWeight="bold">
                    %{countData.length !== 0 && countData[0].purchases.perc}{" "}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Card>

          <Card maxH="115px">
            <Flex direction="column">
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
                mb="5px"
              >
                <Stat me="auto">
                  <StatLabel
                    textAlign={"center"}
                    fontSize="s"
                    color="gray.400"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    تعداد کل زبان آموزان
                  </StatLabel>

                  <Text
                    textAlign={"center"}
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                  >
                    {countData.length !== 0 && countData[0].students.count}
                  </Text>
                </Stat>
                <IconBox
                  borderRadius="50%"
                  as="box"
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}
                >
                  <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
              {countData.length !== 0 && countData[0].students.perc > 0 ? (
                <Flex>
                  <Text textAlign={"center"} color="gray.400" fontSize="sm">
                    افزایش از ماه قبل
                  </Text>
                  <Text
                    textAlign={"center"}
                    as="span"
                    color="green.400"
                    fontWeight="bold"
                  >
                    %{countData.length !== 0 && countData[0].students.perc}{" "}
                  </Text>
                </Flex>
              ) : (
                <Flex>
                  <Text color="gray.400" fontSize="sm">
                    کاهش از ماه قبل
                  </Text>
                  <Text as="span" color="red.400" fontWeight="bold">
                    %{countData.length !== 0 && countData[0].students.perc}{" "}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Card>
        </SimpleGrid>
        <Grid
          templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
          templateRows={{ lg: "repeat(2, auto)" }}
          gap="20px"
        >
          <Card
            bg={
              colorMode === "dark"
                ? "navy.800"
                : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
            }
            p="0px"
            maxW="100%"
          >
            <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
              <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
                خلاصه درآمد سالیانه به تفکیک ماه
              </Text>
              {/* <Text color='#fff' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                (+5) more{" "}
              </Text>
              in 2022
            </Text> */}
            </Flex>
            <Box minH="300px">
              {compareyearData.length !== 0 && (
                <LineChart data={compareyearData} options={lineChartOptions} />
              )}
            </Box>
          </Card>
          <Card p="0px" maxW="100%">
            <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
              <Text color="gray.400" fontSize="sm" fontWeight="bold" mb="6px">
                عملکرد دبیران
              </Text>
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                میانگین نمرات
              </Text>
            </Flex>
            <Box minH="300px">
              {teacherOverall.length !== 0 && (
                <BarChart data={barChartData} options={barChartOptions} />
              )}
            </Box>
          </Card>
          <Card p="0px" maxW="100%">
            <Flex direction="column">
              <Flex align="center" justify="space-between" p="22px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Page visits
                </Text>
                <Button variant="primary" maxH="30px">
                  SEE ALL
                </Button>
              </Flex>
              <Box overflow={{ sm: "scroll", lg: "hidden" }}>
                <Table>
                  <Thead>
                    <Tr bg={tableRowColor}>
                      <Th color="gray.400" borderColor={borderColor}>
                        Page name
                      </Th>
                      <Th color="gray.400" borderColor={borderColor}>
                        Visitors
                      </Th>
                      <Th color="gray.400" borderColor={borderColor}>
                        Unique users
                      </Th>
                      <Th color="gray.400" borderColor={borderColor}>
                        Bounce rate
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pageVisits.map((el, index, arr) => {
                      return (
                        <Tr key={index}>
                          <Td
                            color={textTableColor}
                            fontSize="sm"
                            fontWeight="bold"
                            borderColor={borderColor}
                            border={index === arr.length - 1 ? "none" : null}
                          >
                            {el.pageName}
                          </Td>
                          <Td
                            color={textTableColor}
                            fontSize="sm"
                            border={index === arr.length - 1 ? "none" : null}
                            borderColor={borderColor}
                          >
                            {el.visitors}
                          </Td>
                          <Td
                            color={textTableColor}
                            fontSize="sm"
                            border={index === arr.length - 1 ? "none" : null}
                            borderColor={borderColor}
                          >
                            {el.uniqueUsers}
                          </Td>
                          <Td
                            color={textTableColor}
                            fontSize="sm"
                            border={index === arr.length - 1 ? "none" : null}
                            borderColor={borderColor}
                          >
                            {el.bounceRate}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>
            </Flex>
          </Card>
          <Card p="0px" maxW="100%">
            <Flex direction="column">
              <Flex align="center" justify="space-between" p="22px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Social traffic
                </Text>
                <Button variant="primary" maxH="30px">
                  SEE ALL
                </Button>
              </Flex>
            </Flex>
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th color="gray.400" borderColor={borderColor}>
                      Referral
                    </Th>
                    <Th color="gray.400" borderColor={borderColor}>
                      Visitors
                    </Th>
                    <Th color="gray.400" borderColor={borderColor}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {socialTraffic.map((el, index, arr) => {
                    return (
                      <Tr key={index}>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          fontWeight="bold"
                          borderColor={borderColor}
                          border={index === arr.length - 1 ? "none" : null}
                        >
                          {el.referral}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          borderColor={borderColor}
                          border={index === arr.length - 1 ? "none" : null}
                        >
                          {el.visitors}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          borderColor={borderColor}
                          border={index === arr.length - 1 ? "none" : null}
                        >
                          <Flex align="center">
                            <Text
                              color={textTableColor}
                              fontWeight="bold"
                              fontSize="sm"
                              me="12px"
                            >{`${el.percentage}%`}</Text>
                            <Progress
                              size="xs"
                              colorScheme={el.color}
                              value={el.percentage}
                              minW="120px"
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Card>
        </Grid>
      </Flex>
    </AuthorizeProvider>
  );
}
