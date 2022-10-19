import { useRouter } from 'next/router';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Flex,
    Text
} from '@chakra-ui/react'
import "/node_modules/flag-icons/css/flag-icons.min.css";

const MenuComponent = ({ locale }) => {
    const router = useRouter()
    return (
        <Menu>
            <MenuButton as={Button} bg="white" borderRadius={4} border="1px solid #33333388">
                <span className={`fi fi-${locale == 'pt' ? 'br' : locale == 'en' ? 'us' : 'es'}`}></span>
            </MenuButton>
            <MenuList>
                {locale == 'pt' &&
                    <>
                        <MenuItem onClick={() => router.push(router.asPath, router.asPath, { locale: 'en' })}>
                            <Flex flexDir="row">
                                <span className="fi fi-us"></span>
                                <Text ml={4}>English</Text>
                            </Flex>
                        </MenuItem>
                        <MenuItem onClick={() => router.push(router.asPath, router.asPath, { locale: 'es' })}>
                            <Flex flexDir="row">
                                <span className="fi fi-es"></span>
                                <Text ml={4}>Español</Text>
                            </Flex>
                        </MenuItem>
                    </>
                }
                {locale == 'en' &&
                    <>
                        <MenuItem onClick={() => router.push(router.asPath, router.asPath, { locale: 'pt' })}>
                            <Flex flexDir="row">
                                <span className="fi fi-br"></span>
                                <Text ml={4}>Português</Text>
                            </Flex>
                        </MenuItem>
                        <MenuItem onClick={() => router.push(router.asPath, router.asPath, { locale: 'es' })}>
                            <Flex flexDir="row">
                                <span className="fi fi-es"></span>
                                <Text ml={4}>Español</Text>
                            </Flex>
                        </MenuItem>
                    </>
                }
                {locale == 'es' &&
                    <>
                        <MenuItem onClick={() => router.push(router.asPath, router.asPath, { locale: 'en' })}>
                            <Flex flexDir="row">
                                <span className="fi fi-us"></span>
                                <Text ml={4}>English</Text>
                            </Flex>
                        </MenuItem>
                        <MenuItem onClick={() => router.push(router.asPath, router.asPath, { locale: 'pt' })}>
                            <Flex flexDir="row">
                                <span className="fi fi-br"></span>
                                <Text ml={4}>Português</Text>
                            </Flex>
                        </MenuItem>
                    </>
                }
            </MenuList>
        </Menu>
    )
}

export default MenuComponent