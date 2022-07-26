// Chakra imports
import {
    SimpleGrid,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Flex,
    Text,
    Accordion,
    AccordionItem,
    Skeleton,
    Stack,
  } from "@chakra-ui/react";
  
  // Custom components
  import CardBody from "components/Card/CardBody.js";
  import React from "react";
  import ReportMarkTableRow from "components/Tables/ReportMarkTable/ReportMarkTableRow";
  function ReportMarkTable(props) {
    const { data , handleMarkChange  } = props;
  
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
  
    return (
      <CardBody style={{ direction: "rtl" }} maxW={"100%"} overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Table style={{ direction: "rtl" }} variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th pl="0px" borderColor={borderColor} color="gray.400">
                نام دوره
              </Th>
              <Th borderColor={borderColor} color="gray.400">
                نمره نهایی{" "}
              </Th>
              <Th borderColor={borderColor} color="gray.400">
                وضعیت
              </Th>
              
              <Th borderColor={borderColor} color="gray.400">
                تاریخ{" "}
              </Th>
              <Th borderColor={borderColor} color="gray.400">
                دبیر{" "}
              </Th>
         
          
  
  
           
              <Th borderColor={borderColor}>مشاهده</Th>
            </Tr>
          </Thead>
  
          <Tbody>
            {data
              // filter((filtered) => (filter.fFullName !== "" ? filtered.full_name === filter.fFullName ||
              //   filtered.course.id === filter.fCourse : filtered
              //   )).
              .map((row, index, arr) => (
                <ReportMarkTableRow
                  course={row.course.name}
                  logo={row.image}
                  status={row.status}
                  sum={row.sum}
                  date={row.date}
                  teacher = {row.teacher.full_name}
                  isLast={index === arr.length - 1 ? true : false}
                  key={row._id}
                  handleMarkChange={handleMarkChange}
                  courseID={row.course.id}
                  
                />
              ))}
          </Tbody>
        </Table>
      </CardBody>
    );
  }
  
  export default ReportMarkTable;
  