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
import UserListTableRow from "components/Tables/UserListTable/UserListTableRow";
function UserListTable(props) {
  const { data, courses , userList , setUserList , handleDelete , handleEnable } = props;

  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  return (
    <CardBody  style={{ direction: "rtl" }} maxW={"100%"} overflowX={{ sm: "scroll", xl: "hidden" }}>
      <Table  variant="simple" color={textColor}>
        <Thead>
          <Tr my=".8rem" pl="0px" color="gray.400">
            <Th pl="0px" borderColor={borderColor} color="gray.400">
              کاربر
            </Th>
            <Th borderColor={borderColor} color="gray.400">
              دوره فعلی
            </Th>
            <Th borderColor={borderColor} color="gray.400">
              وضعیت
            </Th>
            <Th borderColor={borderColor} color="gray.400">
              شماره تماس
            </Th>
            <Th borderColor={borderColor}></Th>

          </Tr>
        </Thead>

        <Tbody>
          {data
            // filter((filtered) => (filter.fFullName !== "" ? filtered.full_name === filter.fFullName ||
            //   filtered.course.id === filter.fCourse : filtered
            //   )).
            .map((row, index, arr) => (
              <UserListTableRow
                name={row.full_name}
                imageId={row.image}
                email={row.email}
                username={row.username}          
                domain={row.courses}
                role={row.role} //{row.enable}
                date={row.phone}
                isLast={index === arr.length - 1 ? true : false}
                key={row._id}
                userId={row._id}
                courses={courses}
                userList={userList}
                 setUserList={setUserList}
                 handleDelete={handleDelete}
                 handleEnable={handleEnable}
                 isEnable={row.is_enable}
              />
            ))}
        </Tbody>
      </Table>
    </CardBody>
  );
}

export default UserListTable;
