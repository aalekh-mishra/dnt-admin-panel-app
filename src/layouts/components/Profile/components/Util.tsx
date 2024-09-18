// tab panel wrapper
export function TabPanel({ children, value, index, ...other }:any) {
    return (
        <div 
            role="tabpanel" 
            hidden={value !== index} 
            id={`profile-tabpanel-${index}`} 
            aria-labelledby={`profile-tab-${index}`} 
            {...other}
        >
            {value === index && children}
        </div>
    );
}