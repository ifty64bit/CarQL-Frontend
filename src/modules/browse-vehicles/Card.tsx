import { Vehicle } from "@/utils/types";
import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {
    vehicle: Vehicle;
};

function Card({ vehicle }: Props) {

    return (
        <Box rounded={"lg"} overflow="hidden" w={"80"} bg="whiteAlpha.100">
            <Stack>
                <Image
                    src="https://bit.ly/sage-adebayo"
                    alt="Segun Adebayo"
                    width={"xs"}
                    height={"40"}
                    objectFit="cover"
                />
                <Stack px={"4"} py="2">
                    <Text fontSize={"xl"} color="gray.500">
                        {vehicle.brand}
                    </Text>
                    <Heading size={"lg"}>{vehicle.model}</Heading>
                    <Text>
                        {vehicle.type} | {vehicle.transmission}
                    </Text>
                    <Text>{vehicle.hourly_rate} /hour</Text>
                    <Text>Owner: {vehicle.user.name}</Text>
                    <Link
                        href={`/vehicle/${vehicle.id}`}
                        style={{ width: "100%" }}
                    >
                        <Button colorScheme={"teal"} w="full">
                            View Details
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Card;
