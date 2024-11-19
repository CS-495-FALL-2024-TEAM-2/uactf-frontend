'use client'

import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Stack,
  IconButton,
  Link,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import NavbarLogo from './NavbarLogo'
import NavbarThemeMenuItem from './NavbarThemeMenuItem'
import LogoutButton from './LogoutButton'

export default function TeacherNavbar() {
  return (
    <>
      <Box bg={useColorModeValue('bama_gray', 'black')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

          <NavbarLogo />

          <Box className='md:hidden'>
            <div className='inline mr-4'>
            <NavbarThemeMenuItem />
            </div>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Navbar'
                icon={<HamburgerIcon />}
                variant='outline'
              />
              <MenuList>
                <MenuItem>
                  <Link href="/teams">
                    Teams
                  </Link>
                </MenuItem>
                <MenuItem>
                  <LogoutButton />
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>


          <Box className='hidden md:block'>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={3}>
                <Link href="/teams">
                  <Button size='sm' bg={useColorModeValue('bama_gray', 'black')}>
                    Teams
                  </Button>
                </Link>
                <LogoutButton />
                <NavbarThemeMenuItem />
              </Stack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
