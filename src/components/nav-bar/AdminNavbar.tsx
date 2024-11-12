'use client'

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
  IconButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import NavbarLogo from './NavbarLogo'
import NavbarThemeMenuItem from './NavbarThemeMenuItem'

export default function AdminNavbar() {
  const profileMenu = <Menu>
  <MenuButton
    as={Button}
    rounded={'full'}
    cursor={'pointer'}
    minW={0}
    size={'sm'}>
    {/* TODO: Log In/Register when we have auth setup */}
    My Profile
  </MenuButton>
  <MenuList alignItems={'center'}>
    <br />
    <Center>
      <Avatar
        size={'2xl'}
        src={'https://avatars.dicebear.com/api/male/username.svg'}
      />
    </Center>
    <br />
    <Center>
      <p>Username</p>
    </Center>
    <br />
    <MenuDivider />
    <MenuItem>Your Servers</MenuItem>
    <MenuItem>Account Settings</MenuItem>
    <MenuItem>Logout</MenuItem>
  </MenuList>
</Menu>;



  return (
    <>
      <Box bg={useColorModeValue('bama_gray', 'black')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

          <NavbarLogo />

          <Box className='md:hidden'>
            <div className='inline mr-4'>
              {profileMenu}
            </div>
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
                  <Link href="/competitions">
                    Challenges
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/challenges">
                    Challenges
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/teachers">
                    Teachers
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>


          <Box className='hidden md:block'>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={3}>
                <Link href="/competitions">
                  <Button size='sm' bg={useColorModeValue('bama_gray', 'black')}>
                    Competitions
                  </Button>
                </Link>
                <Link href="/challenges">
                  <Button size='sm' bg={useColorModeValue('bama_gray', 'black')}>
                    Challenges
                  </Button>
                </Link>
                <Link href="/teachers">
                  <Button size='sm' bg={useColorModeValue('bama_gray', 'black')}>
                    Teachers
                  </Button>
                </Link>
                <NavbarThemeMenuItem />

                {profileMenu}
              </Stack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
