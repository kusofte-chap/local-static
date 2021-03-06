const {exec} = require('child_process')

const openUrl = (url)=>{
    switch(process.platform){
        case 'darwin':
            exec(`open ${url}`);
            break;
        case 'win32':
            exec(`start ${url}`);
            break;
        default:
            exec('xdg-open',[url])
    }
}
module.exports = openUrl