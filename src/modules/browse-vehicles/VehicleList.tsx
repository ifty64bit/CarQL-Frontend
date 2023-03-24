import { Vehicle } from "@/utils/types";
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
        <div>
            {vehicle_data?.vehicles?.map((vehicle) => (
                <Card key={vehicle.id} vehicle={vehicle} />
            ))}
        </div>
    );
}

export default VehicleList;
