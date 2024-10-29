import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

export default function NavbarThemeMenuItem(){
    const { colorMode, toggleColorMode } = useColorMode();
    
    return (
        <Button size='sm' bg={useColorModeValue('bama_gray', 'black')} onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
    );
}