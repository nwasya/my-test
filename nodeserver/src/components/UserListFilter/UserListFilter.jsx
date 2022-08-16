import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CourseSelector from "components/Selectors/CourseSelector";
import StudentStatusSelector from "components/Selectors/StudentStatusSelector";
import UserNameInput from "components/Selectors/UserNameInput";
import React, { useEffect } from "react";
import { userListAction } from "redux/user/UserList/UserListAction";
import { useDispatch, useSelector } from "react-redux";

const UserListFilter = () => {
  const dispatch = useDispatch();


  const [filter, setFilter] = React.useState({
    fFullName: "",
    fCourse: "",
    fStatus: ""
  })

  const handleFilterChange = (f) => {
    setFilter(f);
  };

  const getUSerList = async () => {
    
    const filters = {

    full_name: filter.fFullName,
    course: filter.fCourse,
    status: filter.fStatus
    }
    await dispatch(userListAction(filters)); 
  };


useEffect(() => {
  getUSerList()
} , [])



  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column">
      <Accordion allowToggle>
        <AccordionItem>
          <Flex>
            <Box>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {" "}
                    نمایش فیلتر ها{" "}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>{" "}
            </Box>
            <Spacer />
            <Box>
              <Text
                fontSize="xl"
                color={textColor}
                fontWeight="bold"
                textAlign={"right"}
                my={"10px"}
              >
                لیست کاربران{" "}
              </Text>
            </Box>
          </Flex>

          <AccordionPanel pb={4}>
            <SimpleGrid
              style={{ direction: "rtl" }}
              columns={{ sm: 1, md: 3, xl: 3 }}
              spacing="24px"
              mb="20px"
            >
              <UserNameInput
                onChange={handleFilterChange}
                filter={filter}
              />
              <CourseSelector
                onChange={handleFilterChange}
                filter={filter}
              />
              <StudentStatusSelector
                onChange={handleFilterChange}
                filter={filter}
              />
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default UserListFilter;