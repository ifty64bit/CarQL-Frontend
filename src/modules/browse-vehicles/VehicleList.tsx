import { Vehicle } from "@/utils/types";
import { Flex } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

type Props = {
    vehicle_data: {
        vehicles: Vehicle[];
        count: number;
    };
};

function VehicleList({ vehicle_data }: Props) {
    return (
        <>
            {vehicle_data?.vehicles?.map((vehicle) => (
                <Card key={vehicle.id} vehicle={vehicle} />
            ))}
        </>
    );
}

export default VehicleList;
