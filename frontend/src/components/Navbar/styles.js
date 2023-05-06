import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
    },
    image: {
        marginLeft: '15px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '65%',
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    menuFont: {
        fontFamily: '"Open Sans",sans-serif',
        color: '#6883ad',
        marginRight: '5%',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '14px',
        "&:hover": {
            color: '#2a4f70'
        }
    },
    dropdownContent: {
        display: 'none',
        position: 'absolute',
        backgroundColor: '#32373e',
        minWidth: '160px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: '1',
        border: '1px solid #32373e',
        borderRadius: '5px',
        opacity: '1',
    },
    dropdownPR: {
        "&:hover": {
            "& $dropdownContent": {
                display: "block"
            },
            "& $menuFont": {
                
            }
        }
    },
    subMenuFont: {
        fontFamily: '"Open Sans",sans-serif',
        color: '#cbc6a6',
        marginRight: '5%',
        cursor: 'pointer',
    },
    subMenu: {
        marginTop: '5px',
        marginBottom: '5px',
        padding: '5px 5px 5px 10px',
        display: 'block',
        textDecoration: 'none',
        "&:hover": {
            color: "#ffebeb"
        }
    },
    marginTopZero: {
        marginTop: 0
    },
    dropbtn: {
        fontSize: '14px'
    }

}));