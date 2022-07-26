import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomSelector from "components/Selectors/CustomSelector";
import StudentStatusSelector from "components/Selectors/StudentStatusSelector";
import UserNameInput from "components/Selectors/UserNameInput";
import React, { useEffect } from "react";
import { userListAction } from "redux/user/UserList/UserListAction";
import { connect, useDispatch, useSelector } from "react-redux";
import { UserPop2 } from "components/PopOvers/UserPopOver";

const UserListFilter = (props) => {
  const { filter, onChange, courses ,selectChange , studentStatus ,handleChckBoxChange } = props;








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
            <Flex >
            <UserPop2 />
              <Text
                fontSize="xl"
                color={textColor}
                fontWeight="bold"
                textAlign={"right"}
                my={"10px"}
              >
                لیست کاربران{" "}
              </Text>
           
            </Flex>
          </Flex>

          <AccordionPanel pb={4}>
            <SimpleGrid
              style={{ direction: "rtl" }}
              columns={{ sm: 1, md: 4, xl: 4 }}
              spacing="24px"
              mb="20px"
            >
              <UserNameInput onChange={onChange} filter={filter} />
              <CustomSelector
                onChange={selectChange}
                data={courses}
                state={filter}
                placeHolder={"دوره کاربر را انتخاب کنید"}
                fieldId={"fCourse"}
              />
              <CustomSelector
                onChange={selectChange}
                data={studentStatus}
                state={filter}
                placeHolder={"نقش کاربر را انتخاب کنید"}
                fieldId={"fStatus"}
              />
              <Checkbox onChange={handleChckBoxChange} defaultChecked={false}>فقط کاربران غیرفعال</Checkbox>
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default UserListFilter;
