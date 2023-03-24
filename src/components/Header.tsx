import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import React from "react";

type Props = {};

function Header({}: Props) {
    const { data: session } = useSession();
    return (
        <Flex
            as={"header"}
            w={"full"}
            px="10"
            h={"20"}
            justifyContent={"space-between"}
            alignItems="center"
            bg={"slateblue"}
            position="fixed"
            top="0"
        >
            <Box>
                <Link as={NextLink} href="/">
                    <Text fontSize={"2xl"}>CarQL</Text>
                </Link>
            </Box>
            <Box>
                <Flex gap="5" alignItems={"center"}>
                    <Link as={NextLink} href="/">
                        Home
                    </Link>
                    <Link as={NextLink} href="/browse-vehicle">
                        Browse Vehicle
                    </Link>
                    {session && (
                        <>
                            <Link as={NextLink} href="/profile">
                                Profile
                            </Link>
                            <Button colorScheme={"blackAlpha"}>
                                <Link as={NextLink} href="/add-vehicle">
                                    Submit Vehicle
                                </Link>
                            </Button>
                        </>
                    )}
                </Flex>
            </Box>
            <Box>
                {session ? (
                    <Button
                        bg="#E53E3E"
                        color="white"
                        _hover={{ bg: "#C53030" }}
                        onClick={() => signOut()}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button onClick={() => signIn("google")}>Login</Button>
                )}
            </Box>
        </Flex>
    );
}

export default Header;
