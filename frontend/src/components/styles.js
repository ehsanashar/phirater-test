import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    header: {
        background: '#e4ba00',
        color: '#ffffff',
        padding: '15px 15px 16px 15px',
        "& $h3": {
            fontWeight: 100,
            fontSize: '22px',
            paddingTop: '5px'
        },
    },
    header2: {
        background: '#f1c500',
        color: '#ffffff',
        padding: '20px 15px 12px 15px',
        "& $h3": {
            fontWeight: 100,
            fontSize: '22px',
        },
    },
    ficon: {
        float: 'left',
        fontSize: '30px',
        marginRight: '10px',
        marginTop: '2px'
    },
    tableHeaer: {
        color: '#1e2e44',
        "& $th": {
            fontWeight: 100
        },
    },
    label: {
        fontWeight: 100
    },
    tableTd: {
        fontWeight: 100,
        fontSize: '14px'
    },
    spinner: {
        margin: '0 auto',
        marginTop: '10%'
    },
    mr2: {
        marginRight: '2px'
    }
}));