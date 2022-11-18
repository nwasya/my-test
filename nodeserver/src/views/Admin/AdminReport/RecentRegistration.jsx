import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Input,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { getRecentRegistration } from "services/AdminReport";
import { getRecentRegistrationFilter } from "services/AdminReport";
import AuthorizeProvider from "helpers/authorize/AuthorizeProvider";
import { ReportPop2 } from "components/PopOvers/ReportPopOver";

const RecentRegistration = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const callData = () => {
    getRecentRegistration().then((res) => {
      setData(res.data.data);
    });
  };
  useEffect(() => {
    callData();
  }, []);

  const doSearch = async () => {
    const tmp = await getRecentRegistrationFilter(filter);

    setData(tmp.data.data);
  };

  useEffect(() => {
    setData(data);

    if (
      filter.name !== "" ||
      filter.startDate !== "" ||
      filter.endDate !== ""
    ) {
      doSearch();
    } else {
      callData();
    }
  }, [filter]);

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
  const handleFilterChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    setFilter({ ...filter, [field]: value });
  };

  return (
    <AuthorizeProvider roles={["admin"]}>
      <Card mt={"75px"}>
        <Flex direction="column">
          <Accordion allowToggle>
            <AccordionItem>
              <Flex>
                <Box>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {" "}
                        نمایش فیلتر{" "}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>{" "}
                </Box>
                <Spacer />
                <Flex>
                  <ReportPop2 />
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    textAlign={"right"}
                    my={"10px"}
                  >
              ثبت نام های اخیر {" "}
                  </Text>
                </Flex>
              </Flex>

              <AccordionPanel pb={4}>
                <SimpleGrid
                  style={{ direction: "rtl" }}
                  columns={{ sm: 1, md: 2, xl: 3 }}
                  spacing={{"sm" :"10px" ,"md" : "24px","lg" : "24px"}}
                  mb="20px"
                >
                  <Box>
                    <Text>نام دوره:</Text>
                    <Input
                      id="name"
                      onChange={handleFilterChange}
                      focusBorderColor="purple.300"
                      textAlign="right"
                      variant="outline"
                      fontSize="sm"
                      ms="4px"
                      type="text"
                      placeholder="نام کاربر را وارد کنید"
                      size="md"
                    />
                  </Box>

                  <Box>
                    <Text>از تاریخ:</Text>

                    <DatePicker
                    
                    
                      placeholder="تاریخ شروع را وارد کنید"
                      calendar={persian}
                      locale={persian_fa}
                      style={{ padding: "17px", width: "300px" , backgroundColor:"transparent" }}                      selected={filter.startDate}
                      onChange={(v) => {
                        handleStartDateChange(v);
                      }}
                    />
                  </Box>

                  <Box>
                    <Text>تا تاریخ:</Text>
                    <DatePicker
                      placeholder="تاریخ پایان را وارد کنید"
                      calendar={persian}
                      locale={persian_fa}
                      style={{ padding: "17px", width: "300px" , backgroundColor:"transparent" }}                      selected={filter.endDate}
                      onChange={(v) => {
                        handleEndDateChange(v);
                      }}
                    />
                  </Box>

                  {/* <Checkbox onChange={handleCheckBoxChange} id="isMain" size={"lg"} >
    فقط محصولات اصلی                </Checkbox> */}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Card>

      <Card mt={"30px"} style={{ direction: "rtl" }} maxW={"100%"} overflowX={{ sm: "scroll", xl: "hidden" }}>
        <TableContainer>
          <Table dir="rtl" variant="striped" colorScheme="gray">
            <TableCaption>ثبت نام های اخیر</TableCaption>
            <Thead>
              <Tr>
                <Th>نام و نام خانوادگی</Th>
                <Th>نام دوره</Th>
                <Th>قیمت کلی</Th>
                <Th>تاریخ</Th>
                <Th>کتاب سفارش داده است؟</Th>
                <Th>کد رهگیری</Th>
                <Th>کارمزد</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((itm, id) => (
                <Tr>
                  <Td>{itm.student.full_name}</Td>
                  <Td>{itm.course_name}</Td>
                  <Td>{itm.c_price}ریال</Td>
                  <Td>{itm.date}</Td>
                  <Td>{itm.products.length == 0 ? "نه" : "بله"}</Td>
                  <Td>{itm.ref_id}</Td>
                  <Td>{itm.fee}ریال</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </AuthorizeProvider>
  );
};
export default RecentRegistration;
