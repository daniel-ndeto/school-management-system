import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

const drawerWidth = 240; // Standard width for the drawer

// Custom styles for table cells
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black, // Black background for header cells
        color: theme.palette.common.white, // White text for header cells
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14, // Font size for body cells
    },
}));

// Custom styles for table rows
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Alternate background for odd rows
    },
    '&:last-child td, &:last-child th': {
        border: 0, // Remove border for the last row
    },
}));

// Custom AppBar with conditional styles based on the `open` prop
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open', // Prevent forwarding the `open` prop
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1, // Ensure AppBar is above the drawer
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth, // Adjust margin when the drawer is open
        width: `calc(100% - ${drawerWidth}px)`, // Adjust width when the drawer is open
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Custom Drawer with conditional styles based on the `open` prop
export const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open', // Prevent forwarding the `open` prop
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth, // Full width when open
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden', // Hide overflow when collapsed
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7), // Collapsed width
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9), // Collapsed width for larger screens
            },
        }),
    },
}));