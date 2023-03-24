import React from "react";
import BrowseVehicle from "@/modules/browse-vehicles";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import apolloClient from "@/lib/apolloClient";
import { GET_ALL_VEHICLES } from "@/lib/graphql/query/Vehicles";
import { Vehicle } from "@/utils/types";

type Props = {
    vehicle_data: {
        vehicles: Vehicle[];
        count: number;
    };
};

function Browse({ vehicle_data }: Props) {
    return <BrowseVehicle vehicle_data={vehicle_data} />;
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    const { data } = await apolloClient.query({
        query: GET_ALL_VEHICLES,
    });

    return {
        props: {
            session,
            vehicle_data: {
                vehicles: data.vehicles.Vehicles,
                count: data.vehicles.count,
            },
        },
    };
}

export default Browse;
