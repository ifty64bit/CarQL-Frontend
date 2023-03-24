import { Button, Flex, HStack, Input } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
    const [searchText, setSearchText] = useState<string>("");
    const { data: session } = useSession();
    return (
        <>
            <Head>
                <title>CarQL</title>
                <meta
                    name="description"
                    content="Car Rent Application with Next.js and GraphQL"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex pt={"20"} h="100vh" justifyContent={"center"}>
                <HStack>
                    <Input
                        size={"lg"}
                        placeholder="Type Vehicle Name"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button size={"lg"}>Search</Button>
                </HStack>
            </Flex>
        </>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    return {
        props: {
            session,
        },
    };
}
