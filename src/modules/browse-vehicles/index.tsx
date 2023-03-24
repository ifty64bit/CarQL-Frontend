import { Vehicle } from "@/utils/types";
import { Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import VehicleList from "./VehicleList";

type Props = {
    vehicle_data: {
        vehicles: Vehicle[];
        count: number;
    };
};

function index({ vehicle_data }: Props) {
    return (
        <Container maxW={"container.xl"} pt="20">
            <Grid gridTemplateColumns={"repeat(2, max-content)"} pt="2" gap={5}>
                <GridItem w={"2xs"}>
                    <Sidebar />
                </GridItem>
                <GridItem>
                    <VehicleList vehicle_data={vehicle_data} />
                </GridItem>
            </Grid>
        </Container>
    );
}

export default index;
