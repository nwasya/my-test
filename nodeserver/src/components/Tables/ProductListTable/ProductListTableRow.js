import {
  Avatar,
  Badge,
  Button,
  Flex,
  IconButton,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { CheckIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import ProductEditModal from "components/Modal/productEdit";
import DeleteConfirmModal from "components/Modal/deleteConfirmModal";
import UploadModal from "components/Modal/uploadModal";
import { useState } from "react";
import { FaImage, FaPencilAlt } from "react-icons/fa";

function UserListTableRow(props) {
  const {
    logo,
    name,
    price,
    isMain,
    isActive,
    productCourse,
    isLast,
    key,
    imageId,
    productId,
    courses,
    productList,
    setProductList,
    handleDelete,
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [state, setState] = useState({
    remove: false,
    edit: false,
    image: false,
  });
  const handleShowUploadModal = (st) => {
    setState({...state , image : st});
  };
  const handleShowRemoveModal = (st) => {
    setState({...state , remove : st});
  };
  const handleShowEditModal = (st) => {
    setState({...state , edit : st});
  };
  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : null}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
          <Flex direction="column">
            <Text
              fontSize="md"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {price} ریال
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Badge
          bg={isActive ? "green.400" : bgStatus}
          color={"white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {isActive ? "فعال" : "غیرفعال"}
        </Badge>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Badge
          color={isMain ? "green.400" : "red.400"}
          fontSize="24px"
          p="3px 10px"
          borderRadius="8px"
          bg={"no"}
        >
          {isMain ? <CheckIcon /> : <SmallCloseIcon />}
        </Badge>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        {productCourse.map((c) => (
          <Flex
            minW={"200px"}
            maxH={"100px"}
            overflowY={"scroll"}
            direction="column"
          >
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {c.name}
            </Text>
          </Flex>
        ))}
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction={"row"} justifyContent={"space-between"}>
        <IconButton  background={'none'} icon={<FaPencilAlt />} onClick={() => handleShowEditModal(true)}></IconButton>

          {state.edit && <ProductEditModal
            productList={productList}
            setProductList={setProductList}
            productId={productId}
            courses={courses}
            handleShowModal={handleShowEditModal}
            show={state.edit}
          />}



          <IconButton
          fontSize={'24px'}
            background={"none"}
            color="yellow"
            icon={<FaImage />}
            onClick={() => handleShowUploadModal(true)}
          />
          {state.image && (
            <UploadModal
              handleShowModal={handleShowUploadModal}
              show={state.image}
              imageId={imageId}
              _id={productId}
              category={'product'}
            />
          )}{" "}


          <IconButton
            background={"none"}
            color="red"
            onClick={() => handleShowRemoveModal(true)}
            icon={<CloseIcon />}
          ></IconButton>
          {state.remove && (
            <DeleteConfirmModal
              show={state.remove}
              handleShowModal={handleShowRemoveModal}
              handleDelete={handleDelete}
              _id={productId}
            />
          )}{" "}
        </Flex>
      </Td>
    </Tr>
  );
}

export default UserListTableRow;
