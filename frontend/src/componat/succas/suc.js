import './success.scss'
import AddTaskIcon from '@mui/icons-material/AddTask';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';



const Suc = ({data})=> {
    return(
        <div className={`suc`} >
             {data?.num === 1 ? (
                <div style={{backgroundColor: data.color}} className='message'><CheckCircleIcon /></div>
            ): data?.num === 2 ? (
                <div style={{backgroundColor: data.color}} className='message'><HourglassBottomIcon /></div>
            ): data?.num === 3 ? (
                <div style={{backgroundColor: data.color}} className='message'><AutorenewIcon /></div>
            ): data?.num === 4 ? (
                <div style={{backgroundColor: data.color}} className='message'><ReportIcon /></div>
            ): data?.num === 5 ? (
            <div style={{backgroundColor: data.color}} className='message'><PriorityHighIcon /></div>
            ): data?.num === 6 ? (
                <div style={{backgroundColor: data.color}} className='message'><WarningAmberIcon /></div>
            ): data?.num === 7 ? (
                <div style={{backgroundColor: data.color}} className='message'><AddTaskIcon /></div> 
            ): data?.num === 7 ? (
                <div style={{backgroundColor: data.color}} className='message'><NotificationImportantIcon /></div>
            ): (
            <div style={{backgroundColor: data.color}} className='message'><ErrorIcon /></div> 
        )} 



            
        </div>
    )
}
export default Suc

