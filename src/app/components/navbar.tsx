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
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box bg={useColorModeValue('bama_gray', 'black')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box><Text as='b' color='UA_red'>UA Capture The Flag</Text></Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
              <Button size='sm' bg={useColorModeValue('bama_gray', 'black')} onClick={toggleColorMode}>
                Challenges
              </Button>
              <Button size='sm' bg={useColorModeValue('bama_gray', 'black')} onClick={toggleColorMode}>
                Teams
              </Button>
              <Button size='sm' bg={useColorModeValue('bama_gray', 'black')} onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
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
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}