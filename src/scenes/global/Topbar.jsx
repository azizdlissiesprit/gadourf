import { Box, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const  colorMode = useContext(ColorModeContext);
    return (<Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
            
        </Box>
        <Box display="flex">
            <iconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (<DarkModeOutlinedIcon />):(<LightModeOutlinedIcon />)}
            </iconButton>
        </Box>
    </Box>);
}
export default Topbar;