import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Box, Button, Flex, Heading, Link, ListItem, Text, UnorderedList, useToast } from "@chakra-ui/react"
import moment from 'moment'
import 'moment/locale/pt'
import parse from 'html-react-parser'
import 'animate.css';

import { BsCheck } from 'react-icons/bs'
import { AiOutlineReload } from 'react-icons/ai'

import Menu from '../components/Menu'

import NewOrderIcon from "../assets/NewOrder.png"
import PendingIcon from "../assets/Pending.png"
import ProcessingIcon from "../assets/Processing.png"
import CompletedIcon from "../assets/Completed.png"
import RefundedIcon from "../assets/Refunded.png"
import CanceledIcon from "../assets/Canceled.png"
import PartialIcon from "../assets/Partial.png"

import config from "../config"
import Image from "next/image"

export default function Order({ data }) {
    const toast = useToast()
    const { locale, locales, defaultLocale } = useRouter();
    const [progressBarWidth, setProgressBarWidth] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const terms = {
        'pt': {
            order_id: 'Id do pedido',
            order_date: 'Data do pedido',
            last_update: 'Última atualização',
            link: 'Link ou nome de usuário',
            quantity: 'Quantidade',
            initial_quantity: 'Quantidade inicial',
            refill_button: 'Solicitar Reposição',
            refill_sucess_message: 'Refill solicitado com sucesso!',
            status_new_order: 'Pedido<br/>Recebido',
            status_pending: 'Estamos organizando<br/>para iniciar',
            status_processing: 'Estamos processando<br/>o seu pedido',
            status_in_progress: 'Seu pedido está <br/>em progresso',
            status_completed: 'Seu pedido <br/>foi entregue',
            status_partial: 'Entrega parcial<br/>contate o vendedor',
            status_canceled: 'Pedido cancelado<br/>contate o vendedor',
            status_refunded: 'Pedido reembolsado<br/>contate o vendedor',

        },
        'en': {
            order_id: 'Order ID',
            order_date: 'Order date',
            last_update: 'Last Update',
            link: 'Link or username',
            quantity: 'Quantity',
            initial_quantity: 'Quantity',
            refill_button: 'Request Replacement',
            refill_sucess_message: 'Refill requested successfully!',
            status_new_order: 'Order<br/>Received',
            status_pending: 'We are organizing<br/>to start',
            status_processing: 'We are processing<br/>your order',
            status_in_progress: 'Your order is <br/>in progress',
            status_completed: 'Your order has<br/> been delivered',
            status_partial: 'Partial delivery<br/>contact seller',
            status_canceled: 'Order canceled<br/>contact seller',
            status_refunded: 'Refunded order<br/>contact seller',
        },
        'es': {
            order_id: 'Solicitar ID',
            order_date: 'Fecha de solicitud',
            last_update: 'Última actualización',
            link: 'Enlace o nombre de usuario',
            quantity: 'La cantidad',
            initial_quantity: 'Monto inicial',
            refill_button: 'Solicitar reemplazo',
            refill_sucess_message: '¡Recarga solicitada con éxito!',
            status_new_order: 'Pedido<br/>Recebido',
            status_pending: 'Nos estamos organizando<br/>para empezar',
            status_processing: 'Estamos procesando<br/>su solicitud',
            status_in_progress: 'Su pedido está <br/>en proceso',
            status_completed: 'Tu pedido ha<br/> sido entregado',
            status_partial: 'Entrega parcial<br/>contactar con el vendedor',
            status_canceled: 'Pedido cancelado<br/>contactar al vendedor',
            status_refunded: 'Pedido reembolsado<br/>contactar con el vendedor',
        }
    }

    const handleRefill = async (api_provider_id, api_order_id) => {
        setIsLoading(true)
        const response = await fetch(`/api/refill?api_provider_id=${api_provider_id}&api_order_id=${api_order_id}`)
        const json = await response.json();

        setIsLoading(false)
        if(json.data.error) {
            return toast({
                title: 'Error',
                description: json.data.error,
                status: 'error',
            })
        }else{
            return toast({
                title: 'Sucess',
                description: terms[locale].refill_sucess_message,
                status: 'success',
            })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (data[0]?.status == 'completed') {
                var percent = 98

                for (let index = 0; index < percent; index++) {
                    setTimeout(() => {
                        setProgressBarWidth(index)
                    }, index * 10)
                }
            }
        }, 500)
    }, [])
    return (
        <Flex w="full" h="full" bg="gray.200" alignItems="center" justifyContent="center" p={4} flexDir="column">
            <Flex w="100%" justifyContent="flex-end" position="fixed" top={0} pt={4} pr={4}>
                <Menu locale={locale} />
            </Flex>
            <Flex w="full" maxW="800px" p={6} pb={12} borderRadius={4} border="1px solid #33333388" bg="white" boxShadow="md">
                <Flex w="full" justifyContent="flex-start" flexDir="column">
                    <Flex alignItems="center" fontSize={18} textTransform="uppercase">
                        <Heading fontSize={18}>{terms[locale].order_id}:</Heading>
                        <Text color="red" ml={2} fontWeight="bold" mt={1}>#{data[0]?.id}</Text>
                    </Flex>
                    <Flex mt={2} w="full">
                        <UnorderedList w="full" listStyleType="none" ml={0}>
                            <ListItem mt={2} display="flex" flexDir="row" alignItems="center">
                                <Text>{terms[locale].order_date}:</Text>
                                <Text ml={2} fontWeight="bold">{moment(data[0]?.created).format('LLL')}</Text>
                            </ListItem>
                            <ListItem mt={2} display="flex" flexDir="row" alignItems="center">
                                <Text>{terms[locale].last_update}:</Text>
                                <Text ml={2} fontWeight="bold">{moment(data[0]?.changed).format('LLL')}</Text>
                            </ListItem>
                            <ListItem mt={2} display="flex" flexDir="row" alignItems="center">
                                <Text>{terms[locale].link}:</Text>
                                <Text ml={2} fontWeight="bold" color="red" wordBreak="break-word">
                                    <Link href={data[0]?.link}>{data[0]?.link}</Link>
                                </Text>
                            </ListItem>
                            <ListItem mt={2} display="flex" flexDir="row" alignItems="center">
                                <Text>{terms[locale].quantity}:</Text>
                                <Text ml={2} fontWeight="bold">{data[0]?.quantity}</Text>
                            </ListItem>
                            <ListItem mt={2} display="flex" flexDir="row" alignItems="center">
                                <Text>{terms[locale].initial_quantity}:</Text>
                                <Text ml={2} fontWeight="bold">{data[0]?.start_counter}</Text>
                            </ListItem>
                            {data[0]?.refill == '1' &&
                                <ListItem mt={2} display="flex" flexDir="row" alignItems="center">
                                    <Button isLoading={isLoading} onClick={() => handleRefill(data[0]?.api_provider_id, data[0].api_order_id)} colorScheme="red" rightIcon={<AiOutlineReload />}>{terms[locale].refill_button}</Button>
                                </ListItem>
                            }
                        </UnorderedList>
                    </Flex>

                    <Flex w="full" mt={2} flexDir="column">
                        <Flex>
                            <Heading fontSize={22}>Status:</Heading>
                        </Flex>
                        <Flex w="full" justifyContent="space-between" mt={2} position="relative">
                            <Flex
                                h={2}
                                position="absolute"
                                bg="red"
                                left={0}
                                top="50%"
                                transform="translate(0px, -5px)"
                                style={{
                                    width: `${progressBarWidth}%`
                                }}
                            />

                            <Flex flexDir="column" justifyContent="center" alignItems="center" className="animate__animated animate__bounceIn">
                                <Flex justifyContent="center" alignItems="center" borderRadius="full" w={14} h={14} bg="red" zIndex="999">
                                    <Image src={NewOrderIcon} width="28px" height="28px" />
                                </Flex>
                                <Text className="status_text" position="absolute" bottom="-32px" w="160px" fontSize="14px" lineHeight="14px" textAlign="center">
                                    {parse(String(terms[locale]?.status_new_order))}
                                </Text>
                            </Flex>

                            <Flex flexDir="column" justifyContent="center" alignItems="center" opacity={0} className={progressBarWidth > 40 ? 'animate__animated animate__bounceIn' : ''}>
                                <Flex justifyContent="center" alignItems="center" borderRadius="full" w={14} h={14} bg="red" zIndex="999">
                                    <Image src={PendingIcon} width="28px" height="28px" />
                                </Flex>
                                <Text className="status_text" position="absolute" bottom="-32px" w="160px" fontSize="14px" lineHeight="14px" textAlign="center">
                                    {parse(String(terms[locale]?.status_pending))}
                                </Text>
                            </Flex>

                            <Flex flexDir="column" justifyContent="center" alignItems="center" opacity={0} className={progressBarWidth > 70 ? 'animate__animated animate__bounceIn' : ''}>
                                <Flex justifyContent="center" alignItems="center" borderRadius="full" w={14} h={14} bg="red" zIndex="999">
                                    <Image src={ProcessingIcon} width="28px" height="28px" />
                                </Flex>
                                <Text className="status_text" position="absolute" bottom="-32px" w="160px" fontSize="14px" lineHeight="14px" textAlign="center">
                                    {parse(String(terms[locale]?.status_processing))}
                                </Text>
                            </Flex>

                            <Flex flexDir="column" justifyContent="center" alignItems="center" opacity={0} className={progressBarWidth > 95 ? 'animate__animated animate__bounceIn' : ''}>
                                <Flex justifyContent="center" alignItems="center" borderRadius="full" w={14} h={14} bg={progressBarWidth > 95 ? 'red.600' : 'red'} zIndex="999">
                                    {data[0]?.status == 'canceled' &&
                                        <Image src={CanceledIcon} width="28px" height="28px" />
                                    }
                                    {data[0]?.status == 'refunded' &&
                                        <Image src={RefundedIcon} width="28px" height="28px" />
                                    }
                                    {data[0]?.status == 'partial' &&
                                        <Image src={PartialIcon} width="28px" height="28px" />
                                    }
                                    {data[0]?.status == 'completed' &&
                                        <Image src={CompletedIcon} width="28px" height="28px" />
                                    }
                                </Flex>
                                <Text className="status_text" position="absolute" bottom="-32px" w="160px" fontSize="14px" lineHeight="14px" textAlign="center">
                                    {data[0]?.status == 'canceled' &&
                                        parse(String(terms[locale]?.status_canceled))
                                    }
                                    {data[0]?.status == 'refunded' &&
                                        parse(String(terms[locale]?.status_refunded))
                                    }
                                    {data[0]?.status == 'partial' &&
                                        parse(String(terms[locale]?.status_partial))
                                    }
                                    {data[0]?.status == 'completed' &&
                                        parse(String(terms[locale]?.status_completed))
                                    }
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export const getServerSideProps = async ({ params }) => {
    const { id } = params

    if (!id) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
    try {
        const order = await fetch(`${config.baseUrl}/api/order?ids=${id}`).then(r => r.json())
        return { props: { ok: true, data: order.data } }
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }

}