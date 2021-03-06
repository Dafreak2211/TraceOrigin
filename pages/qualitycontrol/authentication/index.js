import Layout from "@/components/dashboard/Layout";

import { Box, Alert, AlertIcon, Heading, Text, Button } from "@chakra-ui/react";

import { Table, Td, Th, Tr } from "@/components/Table";

import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import Link from "next/link";

const DashBoard = () => {
  const { data } = useSWR(
    [
      "/api/enterpriseauthentication",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const onReject = async (id, pondId) => {
    try {
      await fetch(`/api/product/harvest/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id, pond: pondId }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onApprove = async (id, pondId) => {
    let res = await fetch(`/api/product/harvest/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ id, pond: pondId }),
    });

    mutate(
      [
        "/api/product/harvest/pending",
        process.browser ? localStorage.getItem("token") : null,
      ],
      async (cachedData) => {
        let data = cachedData.filter((each) => each._id !== id);

        return data;
      },
      false
    );
  };

  return (
    <Layout>
      <Box>
        <Heading mb={5}>Danh sách doanh nghiệp chờ duyệt xác thực</Heading>

        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>#</Th>
                <Th>Tên cơ sở</Th>
                <Th>SĐT</Th>
                <Th>Thêm vào bởi</Th>

                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {data.map(({ name, phone, createdBy, _id }, i) => (
                <Tr cursor="pointer">
                  <Td>{i + 1}</Td>
                  <Td>{name}</Td>
                  <Td>{phone}</Td>
                  <Td>{createdBy}</Td>
                  <Td>
                    <Link href={`./authentication/${_id}`}>
                      <a>
                        <Button>Chi tiết</Button>
                      </a>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Tất cả đều đã được phê duyệt</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default DashBoard;
