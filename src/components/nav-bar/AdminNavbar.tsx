'use client';

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
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import NavbarLogo from './NavbarLogo';
import NavbarThemeMenuItem from './NavbarThemeMenuItem';
import LogoutButton from './LogoutButton';
import LogoutMenuItem from './LogoutMenuItem';

export default function AdminNavbar() {
  return (
    <>
      <Box bg={useColorModeValue('bama_gray', 'black')} px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <NavbarLogo />

          <Box className="md:hidden">
            <div className="inline mr-4">
              <NavbarThemeMenuItem />
            </div>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Navbar"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem>
                  <Link href="/competitions">Competitions</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/challenges">Challenges</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/teachers">Teachers</Link>
                </MenuItem>
              
                <MenuItem>
                  <Link href="/approve-liability-release-form">
                    Approve forms
                  </Link>
                </MenuItem>
                <MenuItem>
                  <LogoutMenuItem />
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box className="hidden md:block">
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={3}>
                <Link href="/competitions">
                  <Button
                    size="sm"
                    bg={useColorModeValue('bama_gray', 'black')}
                  >
                    Competitions
                  </Button>
                </Link>
                <Link href="/challenges">
                  <Button
                    size="sm"
                    bg={useColorModeValue('bama_gray', 'black')}
                  >
                    Challenges
                  </Button>
                </Link>
                <Link href="/teachers">
                  <Button
                    size="sm"
                    bg={useColorModeValue('bama_gray', 'black')}
                  >
                    Teachers
                  </Button>
                </Link>
                <Link href="/approve-liability-release-form">
                  <Button size='sm' bg={useColorModeValue('bama_gray', 'black')}>
                    Approve forms
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
  );
}
