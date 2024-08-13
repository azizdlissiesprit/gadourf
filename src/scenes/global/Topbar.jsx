import { Box, IconButton, iconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const  colorMode = useContext(ColorModeContext);
    
    return (<Box display="flex" justifyContent="space-between" p={2}>

        {/*search bar*/}
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">

            <InputBase sx={{ml: 2, flex: 1}} placeholder="Search" />
            <iconButton type="button" sx={{p: 1}}>
                <SearchIcon />
            </iconButton>
        </Box>
        {/*Icons */}
        <Box display="flex">
            <iconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (<DarkModeOutlinedIcon />):(<LightModeOutlinedIcon />)}
                
            </iconButton>
            <iconButton>
                <NotificationsOutlinedIcon />
            </iconButton>
            <iconButton>
                <SettingsOutlinedIcon />
            </iconButton>
            <iconButton>
                <PersonOutlinedIcon />
            </iconButton>

        </Box>
    </Box>);
}
export default Topbar;