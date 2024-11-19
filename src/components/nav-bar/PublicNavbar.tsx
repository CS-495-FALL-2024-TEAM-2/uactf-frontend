'use client';

import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import NavbarLogo from './NavbarLogo';
import Link from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function PublicNavbar() {
  return (
    <Flex
      direction="row"
      bg="bama_gray"
      height="64px"
      px={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <NavbarLogo />

      <Box className="md:hidden">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Navbar"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>
              <Link href="/register">Register</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/login">Login</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Box className="hidden md:block">
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={3}>
            <Link href="/register">
              <Button size="sm" bg="bama_gray">
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" bg="bama_gray">
                Login
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
}
