import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  Skeleton,
  AlertIcon,
  Alert,
} from "@chakra-ui/core";
import { useState } from "react";
import useSWR from "swr";

import FarmInfoModify from "@/components/dashboard/FarmInfoModify";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import { AiFillEdit } from "react-icons/ai";
import EnterpriseAuthenticationModal from "@/components/dashboard/EntepriseAuthenticationModal";

const Info = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { data, error } = useSWR(
    ["/api/farm", process.browser ? localStorage.getItem("token") : null, ,],
    fetcher
  );

  // First fetch usually returns undefined
  if (!data) {
    return (
      <Layout>
        <Box px={12} py={16}>
          <Skeleton height="20px" my="10px" w="40%" />
          <Skeleton height="20px" my="10px" />
          <Skeleton height="20px" my="10px" />
          <Skeleton height="20px" my="10px" w="55%" />
        </Box>
      </Layout>
    );
  }

  if (data && data.message === "Empty") {
    // No Farm Info yet
    return (
      <Layout>
        <FarmInfoModify />
      </Layout>
    );
  }

  if (isEdit) {
    return (
      <Layout>
        <FarmInfoModify isEdit={isEdit} setIsEdit={setIsEdit} data={data} />
      </Layout>
    );
  }

  return (
    <Layout>
      {data && <Content data={data} isEdit={isEdit} setIsEdit={setIsEdit} />}
    </Layout>
  );
};

const Iframe = (props) => {
  return (
    <div
      style={{ boxShadow: "0 10px 20px rgba(0,0,0,.1)", height: "min-content" }}
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
};

// const iframe = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.785577468377!2d105.69452631525809!3d10.11662997378989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0869bb424d2f7%3A0x1b4ec7478c19ba31!2zQ8O0bmcgdHkgVE5ISCBDw7RuZyBuZ2hp4buHcCBUaOG7p3kgc-G6o24gTWnhu4FuIE5hbQ!5e0!3m2!1svi!2s!4v1612017259330!5m2!1svi!2s" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe>`;

const enterpriseAuthentication = (
  isAuthenticated,
  rejectMessage,
  visible,
  setVisible
) => {
  if (isAuthenticated === "") {
    return (
      <Alert status="error" mt="2rem" w="max-content">
        <AlertIcon />
        Chưa chứng thực doanh nghiệp.{" "}
        <Box
          as="span"
          ml="3px"
          textDecoration="underline"
          cursor="pointer"
          onClick={() => setVisible(true)}
        >
          {" "}
          Chứng thực ngay bây giờ.
        </Box>
      </Alert>
    );
  } else if (isAuthenticated === "pending") {
    return (
      <Alert status="warning" mt="2rem" w="max-content">
        <AlertIcon />
        Đang chờ xác thực doanh nghiệp
      </Alert>
    );
  } else if (isAuthenticated === "false" && rejectMessage) {
    return (
      <Alert status="error" mt="2rem" w="max-content">
        <AlertIcon />
        <Box>
          <Box>
            Không được duyệt chứng thực.{" "}
            <Box
              cursor="pointer"
              textDecoration="underline"
              as="span"
              onClick={() => setVisible(true)}
            >
              Chứng thực lại
            </Box>{" "}
          </Box>
          <Box>Lý do: {rejectMessage.message}</Box>
        </Box>
      </Alert>
    );
  } else {
    return (
      <Alert status="success" mt="2rem" w="max-content">
        <AlertIcon />
        Đã chứng thực doanh nghiệp
      </Alert>
    );
  }
};

const Content = ({
  data: {
    name,
    owner,
    images,
    address,
    area,
    phone,
    createdBy,
    coordinate,
    fax,
    email,
    website,
    map,
    authentication,
    isAuthenticated,
  },

  isEdit,
  setIsEdit,
}) => {
  const [visible, setVisible] = useState(false);

  // Get Reject Message from Enterprise Authentication
  const { data: message, error } = useSWR(
    isAuthenticated === "false"
      ? [
          "/api/rejectmessage",
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher
  );

  return (
    <Box px={16} py={12}>
      <Flex justifyContent="space-between">
        <Heading color="gray.700">Thông Tin Cơ Sở Của Bạn</Heading>
        <Button
          background="linear-gradient(90deg, rgba(35,144,246,1) 0%, rgba(11,90,191,1) 100%)"
          color="#fff"
          textTransform="uppercase"
          onClick={() => setIsEdit(!isEdit)}
        >
          <Box as={AiFillEdit} mr="0.5rem" />
          <span>Chỉnh sửa thông tin</span>
        </Button>
      </Flex>

      {enterpriseAuthentication(isAuthenticated, message, visible, setVisible)}
      <EnterpriseAuthenticationModal
        visible={visible}
        setVisible={setVisible}
      />
      <Flex paddingTop={12}>
        <List
          spacing={2}
          px={16}
          py={12}
          boxShadow="0 4px 10px rgba(0,0,0,.1)"
          w="max-content"
          h="max-content"
          marginRight="2rem"
          background="#fff"
        >
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              {name}
            </Text>
          </ListItem>
          <ListItem>
            <Image
              src={images[0]}
              height="10rem"
              width="15rem"
              objectFit="contain"
              borderRadius="3px"
              mt="2rem"
              mb="1rem"
            />
          </ListItem>

          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Họ và tên chủ cơ sở:{" "}
              <Box as="span" fontWeight="normal">
                {owner}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Loại tài khoản:{" "}
              <Box as="span" fontWeight="normal">
                Nông dân
              </Box>
            </Text>
          </ListItem>

          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Diện tích trang trại:{" "}
              <Box as="span" fontWeight="normal">
                {area}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Địa chỉ trang trại:{" "}
              <Box as="span" fontWeight="normal">
                {address}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              SĐT liên hệ:{" "}
              <Box as="span" fontWeight="normal">
                {phone}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Fax:{" "}
              <Box as="span" fontWeight="normal">
                {fax}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Website:{" "}
              <Box as="span" fontWeight="normal">
                {website}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Email:{" "}
              <Box as="span" fontWeight="normal">
                {email}
              </Box>
            </Text>
          </ListItem>
        </List>
        <Iframe iframe={map} />
      </Flex>

      {/* <Box mt={12}>
        <Heading mb={8} color="gray.700" fontSize="xl">
          Hình ảnh trang trại của bạn
        </Heading>
        <Flex>
          {images.map((image, i) => (
            <Image
              key={i}
              src={image}
              height="20rem"
              width="30rem"
              objectFit="contain"
              border="3px solid #f2eded"
              borderRadius="3px"
              mr={4}
            />
          ))}
        </Flex>
      </Box> */}
    </Box>
  );
};

export default Info;