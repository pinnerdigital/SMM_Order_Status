import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { IoMdClose } from 'react-icons/io';
import Lottie from 'react-lottie-player'

import Menu from '../components/Menu'
import notFound from '../assets/not-found.json'

export default function Index() {
  const { locale, locales, defaultLocale } = useRouter();
  const terms = {
    'pt': {
      page_title: 'Pedido não encontrado',
      heading: 'Pedido não encontrado!',
      text: 'Esse serviço não foi encontrado em nossos servidores, o link está correto?'
    },
    'en': {
      page_title: 'Order not found',
      heading: 'Order not found!',
      text: 'This service was not found on our servers, is the link correct?'
    },
    'es': {
      page_title: 'Pedido no encontrado',
      heading: '!Pedido no encontrado!',
      text: 'Este servicio no se encontró en nuestros servidores, ¿es correcto el enlace?'
    }
  }


  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png"/>
        <title>{terms[locale].page_title}</title>
      </Head>
      <Flex textAlign="center" py={10} px={6} alignItems="center" justifyContent="center" flexDir="column" h="full">
        <Flex w="100%" justifyContent="flex-end" position="fixed" top={0} pt={4} pr={4}>
          <Menu locale={locale}/>
        </Flex>
        <Flex maxW="500px" flexDir="column" justifyContent="center" alignItems="center">
          <Box display="inline-block">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg={'red.500'}
              rounded={'50px'}
              w={'55px'}
              h={'55px'}
              textAlign="center">
                <Lottie
                  loop
                  animationData={notFound}
                  play
                  style={{ width: 180, height: 180 }}
                />
            </Flex>
          </Box>
          <Heading as="h2" size="xl" mt={8} mb={2}>
            {terms[locale].heading}
          </Heading>
          <Text color={'gray.500'}>
            {terms[locale].text}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}