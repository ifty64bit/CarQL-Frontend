import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import client from "@/lib/apolloClient";
import Header from "@/components/Header";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider>
                <ApolloProvider client={client}>
                    <Header />
                    <Component {...pageProps} />
                </ApolloProvider>
            </ChakraProvider>
        </SessionProvider>
    );
}
