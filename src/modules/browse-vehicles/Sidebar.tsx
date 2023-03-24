import { Box, Divider, Input, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {};

function Sidebar({}: Props) {
    return (
        <VStack bg={"whiteAlpha.200"}  rounded="lg" p="4">
            <Box>
                <Input placeholder="Search Query" />
            </Box>
            <Divider />
            <Box>
                <Input placeholder="Brand" />
            </Box>
            <Box>
                <Input placeholder="Model" />
            </Box>
            <Box>
                <Input placeholder="Max Price" />
            </Box>
        </VStack>
    );
}

export default Sidebar;
