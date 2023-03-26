import { CreateVehicleMutation } from "@/lib/graphql/mutation/CreateVehicle";
import { GET_BRANDS } from "@/lib/graphql/query/Vehicles";
import { useMutation, useQuery } from "@apollo/client";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Image,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
    Stack,
    Switch,
    Textarea,
} from "@chakra-ui/react";
import { Brands } from "@prisma/client";
import { Formik, Field } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import * as Yup from "yup";
import ImageUploadButton from "./ImageUploadButton";
import { useRouter } from "next/router";

type Props = {};

const addCarSchema = Yup.object().shape({
    brand: Yup.string().required("Brand is required"),
    model: Yup.string().required("Model is required"),
    mileage: Yup.number().required("Mileage is required"),
    year: Yup.number().required("Year is required"),
    color: Yup.string().required("Color is required"),
    hourly_rate: Yup.number().required("Hourly rate is required"),
    transmission: Yup.string().required("Transmission is required"),
    engine: Yup.string().required("Engine is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Type is required"),
    image: Yup.mixed().required("Image is required"),
    registration_number: Yup.string().required(
        "Registration number is required"
    ),
    availability: Yup.boolean().default(true),
    tags: Yup.array().required("Tags are required"),
});

function AddVehicle({}: Props) {
    const { data: session } = useSession();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const { loading, error, data } = useQuery(GET_BRANDS);
    const [
        createVehicle,
        {
            data: createCarData,
            loading: createCarLoading,
            error: createCarError,
        },
    ] = useMutation(CreateVehicleMutation);

    return (
        <Flex
            width={"100vw"}
            height="100vh"
            pt={20}
            justifyContent="center"
            alignItems={"center"}
        >
            <Formik
                initialValues={{
                    brand: "",
                    model: "",
                    mileage: 0,
                    year: 0,
                    color: "",
                    hourly_rate: 0,
                    transmission: "",
                    engine: "",
                    description: "",
                    type: "",
                    image: [],
                    registration_number: "",
                    availability: true,
                    tags: [],
                }}
                validationSchema={addCarSchema}
                onSubmit={async (values) => {
                    let imgData: any = [];
                    if (values.image.length) {
                        setIsLoading(true);
                        const formData = new FormData();
                        values.image.forEach((image) => {
                            formData.append("photos", image);
                        });
                        try {
                            const res = await fetch(
                                process.env
                                    .NEXT_PUBLIC_IMG_UPLOAD_URL as string,
                                {
                                    method: "POST",
                                    body: formData,
                                }
                            );
                            const data = await res.json();
                            imgData = [...data.fileNames];
                        } catch (error) {
                            setIsLoading(false);
                            console.error(error);
                            return;
                        }
                    } else {
                        return;
                    }

                    const vehicle = {
                        brand: values.brand,
                        model: values.model,
                        mileage: values.mileage,
                        year: values.year,
                        color: values.color,
                        hourly_rate: values.hourly_rate,
                        transmission: values.transmission,
                        engine: values.engine,
                        description: values.description,
                        type: values.type,
                        images: imgData,
                        registration_number: values.registration_number,
                        availability: values.availability,
                        tags: values.tags,
                        userId: session?.user.id,
                    };

                    try {
                        await createVehicle({
                            variables: {
                                vehicle,
                            },
                        });
                        router.push("/browse-vehicle");
                    } catch (error) {
                        console.error(error);
                    }

                    setIsLoading(false);
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Stack gap={4}>
                            <HStack>
                                <FormControl isInvalid={!!errors.brand}>
                                    <FormLabel htmlFor="brand">Brand</FormLabel>
                                    <Select
                                        placeholder="Select option"
                                        name="brand"
                                        onChange={handleChange}
                                    >
                                        {loading && !data ? (
                                            <option>Loading...</option>
                                        ) : (
                                            data.brands.map(
                                                (brand: Brands, i: number) => (
                                                    <option
                                                        key={i}
                                                        value={brand.name}
                                                    >
                                                        {brand.name}
                                                    </option>
                                                )
                                            )
                                        )}
                                    </Select>
                                    <FormErrorMessage>
                                        {errors.brand}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isInvalid={
                                        !!errors.model && !!touched.model
                                    }
                                >
                                    <FormLabel htmlFor="model">Model</FormLabel>
                                    <Field
                                        as={Input}
                                        name="model"
                                        type="text"
                                        variant="filled"
                                        value={values.model}
                                    />
                                    <FormErrorMessage>
                                        {errors.model}
                                    </FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl
                                    isInvalid={!!errors.year && !!touched.year}
                                >
                                    <FormLabel htmlFor="year">Year</FormLabel>
                                    <Field
                                        as={Input}
                                        name="year"
                                        type="number"
                                        variant="filled"
                                        value={values.year}
                                    />
                                    <FormErrorMessage>
                                        {errors.year}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors.color && !!touched.color
                                    }
                                >
                                    <FormLabel htmlFor="color">Color</FormLabel>
                                    <Field
                                        as={Input}
                                        name="color"
                                        type="text"
                                        variant="filled"
                                        value={values.color}
                                    />
                                    <FormErrorMessage>
                                        {errors.color}
                                    </FormErrorMessage>
                                </FormControl>
                            </HStack>

                            <HStack>
                                <FormControl
                                    isInvalid={
                                        !!errors.hourly_rate &&
                                        !!touched.hourly_rate
                                    }
                                >
                                    <FormLabel htmlFor="hourly_rate">
                                        Hourly Rate
                                    </FormLabel>
                                    <InputGroup>
                                        <Field
                                            as={Input}
                                            name="hourly_rate"
                                            type="number"
                                            variant="filled"
                                            value={values.hourly_rate}
                                        />
                                        <InputRightAddon>
                                            BDT/Hour
                                        </InputRightAddon>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors.hourly_rate}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors.mileage && !!touched.mileage
                                    }
                                >
                                    <FormLabel htmlFor="mileage">
                                        Mileage
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        name="mileage"
                                        type="number"
                                        variant="filled"
                                        value={values.mileage}
                                    />
                                    <FormErrorMessage>
                                        {errors.mileage}
                                    </FormErrorMessage>
                                </FormControl>
                            </HStack>

                            <HStack>
                                <FormControl
                                    isInvalid={
                                        !!errors.transmission &&
                                        !!touched.transmission
                                    }
                                >
                                    <FormLabel htmlFor="transmission">
                                        Transmission
                                    </FormLabel>
                                    <Select
                                        placeholder="Select option"
                                        name="transmission"
                                        onChange={handleChange}
                                    >
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">
                                            Automatic
                                        </option>
                                    </Select>
                                    <FormErrorMessage>
                                        {errors.transmission}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors.engine && !!touched.engine
                                    }
                                >
                                    <FormLabel htmlFor="engine">
                                        Engine
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        name="engine"
                                        type="text"
                                        variant="filled"
                                        value={values.engine}
                                    />
                                    <FormErrorMessage>
                                        {errors.engine}
                                    </FormErrorMessage>
                                </FormControl>
                            </HStack>

                            <HStack>
                                <FormControl
                                    isInvalid={!!errors.type && !!touched.type}
                                >
                                    <FormLabel htmlFor="type">Type</FormLabel>
                                    <Field
                                        as={Input}
                                        name="type"
                                        type="text"
                                        variant="filled"
                                        value={values.type}
                                    />
                                    <FormErrorMessage>
                                        {errors.type}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors.registration_number &&
                                        !!touched.registration_number
                                    }
                                >
                                    <FormLabel htmlFor="registration_number">
                                        Registration Number
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        name="registration_number"
                                        type="text"
                                        variant="filled"
                                        value={values.registration_number}
                                    />
                                    <FormErrorMessage>
                                        {errors.registration_number}
                                    </FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <FormControl
                                isInvalid={
                                    !!errors.description &&
                                    !!touched.description
                                }
                            >
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <Field
                                    as={Textarea}
                                    name="description"
                                    type="text"
                                    variant="filled"
                                    value={values.description}
                                />
                                <FormErrorMessage>
                                    {errors.description}
                                </FormErrorMessage>
                            </FormControl>
                            <Box>
                                <Stack>
                                    <ImageUploadButton
                                        onImageSelect={(files) =>
                                            setFieldValue("image", files)
                                        }
                                    />
                                    <Box
                                        width={"100%"}
                                        bg="whiteAlpha.100"
                                        display={"flex"}
                                        gap="2"
                                        p="2"
                                        hidden={values.image.length == 0}
                                        border={"black"}
                                        rounded="md"
                                        flexWrap={"wrap"}
                                    >
                                        {values.image.length != 0
                                            ? values.image.map((image: any) => (
                                                  <Image
                                                      key={image.name}
                                                      src={URL.createObjectURL(
                                                          image
                                                      )}
                                                      alt={image.name}
                                                      width={100}
                                                      height={100}
                                                  />
                                              ))
                                            : null}
                                    </Box>
                                </Stack>
                            </Box>
                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="availability" mb="0">
                                    Avalible?
                                </FormLabel>
                                <Switch
                                    id="availability"
                                    isChecked={values.availability}
                                    onChange={() =>
                                        setFieldValue(
                                            "availability",
                                            !values.availability
                                        )
                                    }
                                />
                            </FormControl>
                            <Button type="submit" isLoading={isLoading}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </Flex>
    );
}

export default AddVehicle;
