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
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
} from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

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

const themeMenuItem = <Button size='sm' bg={useColorModeValue('bama_gray', 'black')} onClick={toggleColorMode}>
{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
</Button>


  return (
    <>
      <Box bg={useColorModeValue('bama_gray', 'black')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

          <Box>
            <Text className='md:hidden' as='b' color='UA_red'>UACTF</Text>
            <Text className='hidden md:block' as='b' color='UA_red'>UA Capture The Flag</Text>
          </Box>

          <Box className='md:hidden'>
            <div className='inline mr-4'>
              {profileMenu}
            </div>
            <div className='inline mr-4'>
            {themeMenuItem}
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
                  Challenges
                </MenuItem>
                <MenuItem>
                  Teams
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>


          <Box className='hidden md:block'>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={3}>
                <Link href="/challenges">
                  <Button size='sm' bg={useColorModeValue('bama_gray', 'black')}>
                    Challenges
                  </Button>
                </Link>
                <Button size='sm' bg={useColorModeValue('bama_gray', 'black')} onClick={toggleColorMode}>
                  Teams
                </Button>
                {themeMenuItem}

                {profileMenu}
              </Stack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
